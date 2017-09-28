const fs = require('fs');
var async = require('async');  
const sequelize = require('sequelize');
const _ = sequelize.Utils._;
Date.prototype.format = function(format){ 
  var o = { 
    "M+" : this.getMonth()+1, //month 
    "d+" : this.getDate(), //day 
    "h+" : this.getHours(), //hour 
    "m+" : this.getMinutes(), //minute 
    "s+" : this.getSeconds(), //second 
    "q+" : Math.floor((this.getMonth()+3)/3), //quarter 
    "S" : this.getMilliseconds() //millisecond 
  } 
  
  if(/(y+)/.test(format)) { 
    format = format.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
  } 
  
  for(var k in o) { 
    if(new RegExp("("+ k +")").test(format)) { 
      format = format.replace(RegExp.$1, RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length)); 
    } 
  } 
  return format; 
} 
async function mergeStudentClasses(cls, studentClassInstances,orders, users, database, transaction){
  let erpInstitution = {};
  let erpClass = cls.erpClass;
  for(let index = 0 ; index < studentClassInstances.length; index++){
    let sci = studentClassInstances[index];
    let student = users.find(u=>u._id == sci.studentId);
    let order = orders.find(o=>o.studentId==sci.studentId);

    sci.order = order;
    const {id, course_id} = erpClass.dataValues;
    
    //创建student_class
    let sc = await database.student_class.findOrCreate({
      where:{class_id: id, course_id, student_id: student.studentId},
      transaction
    });

    //创建订单purchase_info
    if(sc.dataValues.purchase_id == 0){
      let paytimeInt = parseInt(order.tradeTime.$numberLong);
      let payTime = new Date(paytimeInt);
      let erpPurchaseInfo = await database.purchase_info.create({
        student_id: student.studentId,
        trade_no: order ? order.inTradeNo : '',
        status: 1,
        pay_channel: 4,
        total_price:  order ? Math.round(order.price)*100 : 0,
        pay_time: payTime,
      },{transaction});
      erpPurchaseInfo.dataValues.purchase_number = "1"+payTime.format("yyyyMMddhhmm")+erpPurchaseInfo.dataValues.id%1000000;
      erpPurchaseInfo.save();
      sc.dataValues.purchase_id = erpPurchaseInfo.dataValues.id;
    }
    sc.dataValues.is_del = 0;
    sc.save({transaction});

    //创建puchase_class
    let puchaseClass = await database.purchase_class.findOrCreate({
      where:{class_id: id, course_id, student_id: student.studentId},
      transaction
    });
    puchaseClass.dataValues.purchase_id = sc.dataValues.purchase_id;
    puchaseClass.dataValues.is_del = 0;
    puchaseClass.save({transaction});

    //创建class_lesson
    for(let i = 0; i < cls.classLessons; i++){
      let lesson = cls.classLessons[i];
      let sl = await database.student_lesson.findOrCreate({
        where:{class_id: id, course_id, student_id: student.studentId, lesson_id:lesson.dataValues.id},
        transaction
      });
      sl.dataValues.is_del = 0;
      sl.dataValues.purchase_id = sc.dataValues.purchase_id;
      sl.save({transaction});
    }
  }
}

module.exports = mergeStudentClasses;

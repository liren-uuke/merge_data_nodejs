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
  const {id, course_id} = erpClass.dataValues;
  await database.class_student.update(
    {
      is_del: 1,
    },
    {where:{class_id: id},transaction}
  );
  await database.student_lesson.update(
    { is_del : 1},
    {where:{class_id: id},transaction}
    
  );
  await database.purchase_class.update(
    { is_del : 1},
    {where:{class_id: id},transaction}    
  );
  for(let index = 0 ; index < studentClassInstances.length; index++){
    let sci = studentClassInstances[index];
    let student = users.find(u=>u._id == sci.studentId);
    if(!student){
      continue;
    }
    let order = orders.find(o=>o.studentId==sci.studentId);

    sci.order = order;
    let signUpTime = new Date(parseInt(sci.joinTime.$numberLong));
    
  
    //创建student_class
    let erpClassStudent = await database.class_student.findCreateFind({
      where:{class_id: id, course_id, student_id: student.studentId},
      defaults:{class_id: id, course_id, student_id: student.studentId},
      transaction
    });

    erpClassStudent = erpClassStudent[0];
    
    let purchaseId = erpClassStudent.dataValues.purchase_id;
    
    //创建订单purchase_info
    let paytimeInt = order?parseInt(order.tradeTime.$numberLong):0;
    let payTime = order?new Date(paytimeInt):signUpTime;
    let erpPurchas;eInfo = null
    if(purchaseId == 0){
      erpPurchaseInfo = await database.purchase_info.findCreateFind({
        where:{
          teach_point_id:0,
          pay_time: payTime,
          trade_no: order ? order.inTradeNo : '', 
          student_id: student.studentId, 
        },
        defaults:{
          student_id: student.studentId,
          trade_no: order ? order.inTradeNo : '',
          status: 1,
          pay_channel: 4,
          total_price:  order ? Math.round(order.price)*100 : 0,
          pay_time: payTime,
        },
        transaction
      });
      erpPurchaseInfo = erpPurchaseInfo[0];
      erpPurchaseInfo.dataValues.purchase_number = "1"+payTime.format("yyyyMMddhhmm")+erpPurchaseInfo.dataValues.id%1000000;
      purchaseId = erpPurchaseInfo.dataValues.id;
      if(order){
        order.erpPurchaseInfo = erpPurchaseInfo;
      }
    }
    else{
      erpPurchaseInfo = await database.purchase_info.findCreateFind({
        where:{
          id: purchaseId,
        },
        defaults:{
          student_id: student.studentId,
          trade_no: order ? order.inTradeNo : '',
          status: 1,
          pay_channel: 4,
          total_price:  order ? Math.round(order.price)*100 : 0,
          pay_time: payTime,
        },
        transaction
      });
      erpPurchaseInfo = erpPurchaseInfo[0];
      erpPurchaseInfo.dataValues.purchase_number = "1"+payTime.format("yyyyMMddhhmm")+erpPurchaseInfo.dataValues.id%1000000;
      
      
    }
    await database.class_student.update(
      {
        is_del: 0,      
        create_time:signUpTime,
        purchase_id:purchaseId
      },
      {where: {id: erpClassStudent.dataValues.id}, transaction}
    );
    await database.purchase_info.update(
      { 
        is_del : 0, 
        purchase_number: erpPurchaseInfo.dataValues.purchase_number,
        pay_time: payTime,        
        status: 1,
      },
      {
        where:{id: erpPurchaseInfo.dataValues.id},
        transaction
      }
    );
   
    //创建puchase_class
    let puchaseClass = await database.purchase_class.findCreateFind({
      where:{class_id: id, course_id, student_id: student.studentId},
      defaults:{class_id: id, course_id, student_id: student.studentId},
      transaction
    });
    await database.purchase_class.update(
      { 
        is_del : 0, 
        purchase_id:purchaseId,
        status:1
      },
      {
        where:{id: puchaseClass[0].dataValues.id},
        transaction
      }
    );

    
    //创建class_lesson
    for(let i = 0; i < cls.classLessons.length; i++){
      let lesson = cls.classLessons[i];
      let sl = await database.student_lesson.findCreateFind({
        where:{class_id: id, course_id, student_id: student.studentId, lesson_id:lesson.dataValues.id},
        defaults:{class_id: id, course_id, student_id: student.studentId, lesson_id:lesson.dataValues.id},
        
        transaction
      });      
      await database.student_lesson.update(
        { is_del : 0, purchase_id: purchaseId},
        {
          where:{id: sl[0].dataValues.id},
          transaction
        }
      );
    }
  }
}

module.exports = mergeStudentClasses;

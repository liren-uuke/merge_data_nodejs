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
  let processDel = studentClassInstances.length==1 && studentClassInstances[0].isDel;
  if(!processDel){

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
  }
 
  for(let index = 0 ; index < studentClassInstances.length; index++){
    let sci = studentClassInstances[index];
    let student = users.find(u=>u._id == sci.studentId);
    if(!student){
      console.log(sci);
      continue;
    }
    let order = processDel
    ?orders[0]
    :orders.find(o=>o.studentId==sci.studentId&&o.inTradeNo!='4005862001201707232235131821');

    sci.order = order;
    let signUpTime = new Date(parseInt(sci.joinTime.$numberLong));
    
    //创建student_class
    let erpClassStudent = await database.class_student.findCreateFind({
      where:{class_id: id, student_id: student.studentId},
      defaults:{class_id: id, student_id: student.studentId},
      transaction
    });

    erpClassStudent = erpClassStudent[0];
    
    let purchaseId = erpClassStudent.dataValues.purchase_id;
    
    //创建订单purchase_info
    
    let paytimeInt = order?parseInt(order.tradeTime.$numberLong):0;
    
    let payTime = order?new Date(paytimeInt):signUpTime;
    
    let erpPurchaseInfo = null
    let purchaseNumber =  order ? order.outTradeNo : 'noorder_'+sci._id.$oid;
    erpPurchaseInfo = await database.purchase_info.findCreateFind({
      where:{
        purchase_number: purchaseNumber,
      },
      defaults:{
        student_id: student.studentId,
        trade_no: order ? order.inTradeNo : '',
        status: 1,
        online_type:1
      },
      transaction
    });
    erpPurchaseInfo = erpPurchaseInfo[0];
    purchaseId = erpPurchaseInfo.dataValues.id;
    
    if(order){
      order.erpPurchaseInfo = erpPurchaseInfo;
    }
    await database.class_student.update(
      {
        is_del: sci.isDel?1:0,      
        create_time:signUpTime,
        purchase_id:purchaseId,
        course_id
      },
      {where: {id: erpClassStudent.dataValues.id}, transaction}
    );
    await database.purchase_info.update(
      { 
        is_del : 0, 
        purchase_number: purchaseNumber,
        pay_time: payTime,    
        trade_no: order ? order.inTradeNo : '',    
        total_price:  order ? Math.round(order.price)*100 : 0,    
        online_type:1,    
        status: 1,
        pay_channel: order?4:1,
        
        student_id: student.studentId,
        
      },
      {
        where:{id: purchaseId},
        transaction
      }
    );
   
    //创建puchase_class
    let puchaseClass = await database.purchase_class.findCreateFind({
      where:{purchase_id: purchaseId},
      defaults:{class_id: id, course_id, student_id: student.studentId, purchase_id:purchaseId},
      transaction
    });
    await database.purchase_class.update(
      { 
        is_del : sci.isDel?1:0, 
        purchase_id:purchaseId,
        status:1,
        class_id: id, 
        course_id, 
        student_id: student.studentId,
        purchase_number: purchaseNumber
      },
      {
        where:{id: puchaseClass[0].dataValues.id},
        transaction
      }
    );
      
    if(sci.isDel){
      /*let ref = await database.student_refund.findCreateFind({
        where:{purchase_id: purchaseId, student_id: student.studentId},
        defaults:{
          purchase_id: purchaseId, 
          purchase_number:erpPurchaseInfo.dataValues.purchase_number, 
          student_id: student.studentId,
          money:  Math.round(order.price)*100
        },
        transaction
      });
      await database.student_refund.update(
        { 
          purchase_id: purchaseId, 
          purchase_number:erpPurchaseInfo.dataValues.purchase_number, 
          student_id: student.studentId,
          money:  Math.round(order.price)*100,
          status:3

        },
        {
          where:{id: ref[0].dataValues.id},
          transaction
        }
      );*/
    }
   
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
      console.log(lesson);
    }
  }
}

module.exports = mergeStudentClasses;

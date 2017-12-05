const fs = require('fs');
var async = require('async');  
const sequelize = require('sequelize');
const mergeStudentClasses = require('./mergeStudentClasses')

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
async function mergeOrders(classes, institutions, orders, students, database, transaction){
  let stream = fs.createWriteStream('orders.log');
  
  for(let index = 0 ; index < orders.length; index++){
    let order = orders[index];
    if(order.erpPurchaseInfo || order.institutionId==''){
      
      if(order.erpPurchaseInfo &&order.erpPurchaseInfo.dataValues && order.erpPurchaseInfo.dataValues.id == 218838){
        stream.write(JSON.stringify(order));
        stream.end("\n");
      }
      continue;
    }

    
    let institution = institutions.find(inst=>inst._id==order.institutionId);
    if(!institution.erpInstitution){
      continue;
    }
    let cls = classes.find(c=>c._id==order.classId);
    if(!cls){
        let erpClass= await database.class_info.findCreateFind({
            where: {                 
                live_channel_id:order.classId
            },
            defaults: {
                name: order.className,
                grade_id:17,
                lesson_count: 0,
                online_type: 1,
                institution_id: institution.erpInstitution.dataValues.id,
                status: 0,
                course_id: 0,
                open_code: '',
                price: 0,
                max_students: 0,
                lesson_count: 0,
                live_channel_id : order.classId,
                live_password: order.classId,
                introduction: '',
                cover: '',
                is_del:1,
            },
            transaction
        });    
        cls = {
          _id:order.classId, 
          className:order.className,
          classLessons:[]
        }
        cls.erpClass = erpClass[0];
    }

    await mergeStudentClasses(cls,[{
      studentId: order.studentId,
      joinTime: order.tradeTime,
      isDel:true
    }],[order]
    ,students,database, transaction);
    if(order.erpPurchaseInfo && order.erpPurchaseInfo.dataValues.id == 218838){
      stream.write(JSON.stringify(order));
      stream.end("\n");
    }
  }
  let refunds = [
    '4009012001201707232231041667',
    '4003542001201708186890838629',
    '4004852001201708176798882657',
    '4002402001201707232233388731',
    '4002402001201707232232051915',
    '4005862001201707232237366279',
    '4005862001201707232235131821',
    '4001882001201708197169253832',
    '4000692001201708207200661603',
    '4200000013201709203280830347',
    '4007862001201709172574906691',
    '4200000011201709305087860484',
    '4200000019201709305087673349',
    '4200000011201709213381571432',
    '4200000021201711021963263817',
    '4200000013201711032196532133',
    '4200000016201710260516132797',
    '4200000021201711032209423423',
    '4200000005201711073055920921',
    '4200000022201711113930860322',
    '4200000017201711113968212655',
    '4200000022201711113919250425',
    '4200000010201711113947477656',
    '4200000024201711083262478061',
    '4200000002201711226268020976'
  ];
  let moneys = [
    1920
    ,1970
    ,1920
    ,1920
    ,4320
    ,2160
    ,2400
    ,1970
    ,1970
    ,600
    ,2354
    ,1920
    ,1920
    ,600
    ,10
    ,10
    ,1050
    ,880
    ,720
    ,399
    ,399
    ,399
    ,399
    ,720
    ,188
  ];
  for(let i = 0; i < refunds[i]; i++){

    let refund = refunds[i];
    let money = moneys[i] *100;
    let purchaseInfo = await database.purchase_info.findOne({
      where:{trade_no: refund},
      transaction
    });
    let purchaseClass = await database.purchase_class.findOne({
      where:{purchase_id: purchaseInfo.dataValues.id},
      transaction
    });
    await database.student_refund.findCreateFind({
      where:{purchase_id: purchaseInfo.dataValues.id, student_id: purchaseInfo.dataValues.student_id},
      defaults:{
        purchase_id: purchaseInfo.dataValues.id, 
        purchase_number:purchaseInfo.dataValues.purchase_number, 
        student_id: purchaseInfo.dataValues.student_id,
        money:  money,
        class_id: purchaseClass.dataValues.class_id,
        
        status: 3
      },
      transaction
    });
  }
}

module.exports = mergeOrders;

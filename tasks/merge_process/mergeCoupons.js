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
async function mergeCoupons(classes, institutions, orders, students,                shareCouponInstances, shareCouponInstanceObtains, coupons, database, transaction){
  await database.student_coupon_obtained.update(
    { is_del : 1},
    {where:{used_purchase_id: 0},transaction}
    
  );
  for(let index = 0 ; index < coupons.length; index++){
    let coupon = coupons[index];
    let institution = institutions.find(ins=>ins._id==coupon.institutionId);
    let erpInstitution = institution.erpInstitution;
    if(!erpInstitution){
      continue;
    }
    
    erpCoupon = await database.coupon.findCreateFind({
      where: {institution_id: erpInstitution.dataValues.id},
      defaults: {institution_id: erpInstitution.dataValues.id}.
      transaction
    });
    erpCoupon = erpCoupon[0];
    let classId = 0;
    if(coupon.classId != "all"){
      let cls = classes.find(c=>c._id===coupon.classId);
      classId = cls.erpClass.dataValues?cls.erpClass.dataValues.id:cls.erpClass.id;
    }
    await database.coupon.update(
      {
        institution_id: erpInstitution.dataValues.id,
        class_id: classId,
        type: 0,
        valid_days: coupon.validDays,
        money: coupon.money*100,
        share_title: coupon.shareTitle,
        share_description: coupon.shareDescription,
        title: coupon.title,
        status: institution.shareCoupon&&institution.shareCoupon.enabled?1:0
      },
      {
        where:{id: erpCoupon.dataValues.id},
        transaction
      }
    );
    coupon.couponId = erpCoupon.dataValues.id;
  }



  for(let index = 0 ; index < shareCouponInstances.length; index++){
    let sharedCoupon = shareCouponInstances[index];
    let coupon = coupons.find(c=>c._id==sharedCoupon.couponId);
    let order = orders.find(o=>o.outTradeNo===sharedCoupon.orderOutTradeNo);
    let institution = institutions.find(ins=>ins._id==coupon.institutionId);
    let erpInstitution = institution.erpInstitution;
    
    if(!erpInstitution){
      continue;
    }
    let erpPurchaseInfo = order.erpPurchaseInfo;
    if(!erpPurchaseInfo){
      continue;
    }
    if(erpPurchaseInfo.dataValues){
      erpPurchaseInfo = erpPurchaseInfo.dataValues;
    }
    erpSharedCoupon = await database.student_coupon_shared.findCreateFind({
      where: {purchase_id: erpPurchaseInfo.id,coupon_id: coupon.couponId},
      defaults: {coupon_id: coupon.couponId, purchase_id:erpPurchaseInfo.id},
      transaction
    });
    erpSharedCoupon = erpSharedCoupon[0];

    await database.student_coupon_shared.update(
      {
        coupon_id: coupon.couponId, 
        purchase_id: erpPurchaseInfo.id,
        create_time: new Date(parseInt(sharedCoupon.shareTime.$numberLong)),
      },
      {
        where:{id: erpSharedCoupon.dataValues.id},
        transaction
      }
    );    
  }

  for(let index = 0 ; index < shareCouponInstanceObtains.length; index++){
    let obtainedCoupon = shareCouponInstanceObtains[index];
    let coupon = coupons.find(c=>c._id==obtainedCoupon.couponId);
    let order = orders.find(o=>o.outTradeNo===obtainedCoupon.orderOutTradeNo);
    let useForOrder = orders.find(o=>o.outTradeNo===obtainedCoupon.useForOrderOutTradeNo);
    
    let institution = institutions.find(ins=>ins._id==coupon.institutionId);
    let erpInstitution = institution.erpInstitution;
    
    if(!erpInstitution){
      continue;
    }
    let classId = 0;
    if(coupon.classId != "all"){
      let cls = classes.find(c=>c._id===obtainedCoupon.classId);
      classId = cls.erpClass.dataValues?cls.erpClass.dataValues.id:cls.erpClass.id;
    }
    let erpPurchaseInfo = order.erpPurchaseInfo;
    if(!erpPurchaseInfo){
      continue;
    }
    if(erpPurchaseInfo.dataValues){
      erpPurchaseInfo = erpPurchaseInfo.dataValues;
    }

    let usedErpPurchaseInfo = useForOrder?useForOrder.erpPurchaseInfo:null;
    if(usedErpPurchaseInfo&&usedErpPurchaseInfo.dataValues){
      usedErpPurchaseInfo = usedErpPurchaseInfo.dataValues;
    }

    
    let obtainedStudent = students.find(s=> s._id === obtainedCoupon.obtainerUserId);
    if(!obtainedStudent.unionid){
      continue;
    }    
    let data=  {
      purchase_id: erpPurchaseInfo.id,
      coupon_id: coupon.couponId,
      student_union_id: obtainedStudent.unionid,
    }
    let erpObtainedCoupon = await database.student_coupon_obtained.findCreateFind({
      where: data,
      defaults: data,
      transaction
    });
    erpObtainedCoupon = erpObtainedCoupon[0];
    
    await database.student_coupon_obtained.update(
      {
        obtain_time: new Date(parseInt(obtainedCoupon.obtainTime.$numberLong)),
        expire_time: new Date(parseInt(obtainedCoupon.expireTime.$numberLong)),
        use_time: obtainedCoupon.useTime?new Date(parseInt(obtainedCoupon.useTime.$numberLong)):null,
        used_purchase_id: usedErpPurchaseInfo?usedErpPurchaseInfo.id : 0,
        money: obtainedCoupon.money * 100,
        title: obtainedCoupon.title,
        institution_id: erpInstitution.dataValues.id,
        class_id: classId,
        is_del: 0
      },
      {
        where:{id: erpObtainedCoupon.dataValues.id},
        transaction
      }
    );    
  }
}

module.exports = mergeCoupons;

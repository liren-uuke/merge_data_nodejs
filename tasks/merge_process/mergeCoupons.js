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
      console.log(cls);
      classId = cls.erpClass.dataValues.id;
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
    erpSharedCoupon = await database.student_coupon_shared.findCreateFind({
      where: {purchase_id: erpPurchaseInfo.dataValues.id,coupon_id: coupon.couponId},
      defaults: {coupon_id: coupon.couponId, purchase_id:erpPurchaseInfo.dataValues.id},
      transaction
    });
    erpSharedCoupon = erpSharedCoupon[0];

    await database.erpSharedCoupon.update(
      {
        coupon_id: coupon.couponId, 
        purchase_id: erpPurchaseInfo.dataValues.id,
        create_time: new Date(parseInt(coupon.shareTime.$numberLong)),
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
    if(!erpInstitution){
      continue;
    }
    let erpInstitution = institution.erpInstitution;
    let erpPurchaseInfo = order.erpPurchaseInfo;
    let obtainedStudent = students.find(s=>s._id == coupon.obtainerUserId);
    let data=  {
      purchase_id: erpPurchaseInfo.dataValues.id,
      coupon_id: coupon.couponId,
      student_union_id: students.account.unionid,
    }
    erpObtainedCoupon = await database.student_coupon_obtained.findCreateFind({
      where: data,
      defaults: data,
      transaction
    });
    erpObtainedCoupon = erpObtainedCoupon[0];

    await database.student_coupon_obtained.update(
      {
        obtain_time: new Date(parseInt(obtainedCoupon.shareTime.$numberLong)),
        expire_time: new Date(parseInt(obtainedCoupon.expireTime.$numberLong)),
        use_time: coupon.useTime?new Date(parseInt(coupon.useTime.$numberLong)):null,
        used_purchase_id: useForOrder.erpPurchaseInfo.dataValues.id,
      },
      {
        where:{id: erpObtainedCoupon.dataValues.id},
        transaction
      }
    );    
  }
}

module.exports = mergeCoupons;

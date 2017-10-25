const fs = require('fs');
const sequelize = require('sequelize');
const _ = sequelize.Utils._;
const createOnlineClasses = require('./merge_process/createOnlineClasses')
const createStudents = require('./merge_process/createStudents')
const mergeInstitutions = require('./merge_process/mergeInstitutions')
const mergeStudentClasses = require('./merge_process/mergeStudentClasses')
const mergeCoupons = require('./merge_process/mergeCoupons')
const createOfflineClasses = require('./merge_process/createOfflineClasses')
const mapMobile = require('./merge_process/mapMobile')




const exec = require('child_process').exec; 
function getCollection(name){
  var file=`./mongo_backups/${name}.json`;
  return JSON.parse(fs.readFileSync(file, 'utf-8'));
}


function processData(database){
  var f = async function () {
    let stream = fs.createWriteStream('all.log');
    
    let institutions = getCollection('institutions');
    let allUsers = getCollection('users');
    //allUsers = allUsers.filter(u=>u.account.phone&&u.account.phone.length>0);
    allUsers.forEach(u=>u.account.phone = u.account.phone?mapMobile(u.account.phone):null);
    let allClasses = getCollection('classes');
    let allcourses = getCollection('courses');
    let allStudentClassInstances = getCollection('studentClassInstances');
    let allOrders = getCollection('orders');
    let coupons = getCollection('coupons');
    let shareCouponInstanceObtains = getCollection('shareCouponInstanceObtains');
    let shareCouponInstances = getCollection('shareCouponInstances');
    let offlineCourses = getCollection('offlineCourses');
    
    for(let index = 0 ; index < institutions.length; index++){
      let institution = institutions[index];
      stream.write(`=========机构${institution.name}===============\n`);
      institution.memberIds.forEach(id=>{
        let user = allUsers.find(u=>u._id==id);
        stream.write(`    姓名：${user.realname} 电话:${user.account.phone}\n`);
      })
      stream.write(`\n`);
      
    }
  };
  return f();
}
module.exports = processData;

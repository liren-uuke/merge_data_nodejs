const fs = require('fs');
const sequelize = require('sequelize');
const _ = sequelize.Utils._;
const createOnlineClasses = require('./merge_process/createOnlineClasses')
const createStudents = require('./merge_process/createStudents')
const mergeInstitutions = require('./merge_process/mergeInstitutions')
const mergeStudentClasses = require('./merge_process/mergeStudentClasses')
const mergeCoupons = require('./merge_process/mergeCoupons')

const useCache= true;
const useClassCache= true;

const exec = require('child_process').exec; 
function getCollection(name){
  var file=`./mongo_backups/${name}.json`;
  return JSON.parse(fs.readFileSync(file, 'utf-8'));
}
function mobileMap(mobile){
  if('15000000001' == mobile){
    return '13524476369';
  }
  if('15000000006' == mobile){
    return '18918138572';
  }
  if('18930998393' == mobile){
    return '13774378722';
  }
    
  return mobile;
}
function processData(database){
  var f = async function () {
    let stream = fs.createWriteStream('process.log');
    
    let institutions = getCollection(!useClassCache?'institutions':'institutions2');
    let allUsers = getCollection(!useCache?'users':'students2');
    allUsers = allUsers.filter(u=>u.account.phone&&u.account.phone.length>0);
    allUsers.forEach(u=>u.account.phone = mobileMap(u.account.phone ));
    let allClasses = getCollection(!useClassCache?'classes':'classes2');
    let allcourses = getCollection('courses');
    let allStudentClassInstances = getCollection('studentClassInstances');
    let allOrders = getCollection(!useClassCache?'orders':'orders2');
    let coupons = getCollection('coupons');
    let shareCouponInstanceObtains = getCollection('shareCouponInstanceObtains');
    let shareCouponInstances = getCollection('shareCouponInstances');
    
    await database.sequelize.transaction(async function (transaction) {  
      await mergeInstitutions(institutions,allUsers,database,transaction );
    });

    if(!useCache){
      await database.sequelize.transaction(async function (t) {  
        await createStudents(allUsers, database, t);
      });
      let studentSteam = fs.createWriteStream('mongo_backups/students2.json');
      studentSteam.write(JSON.stringify(allUsers));
      studentSteam.end("\n");
    }


    await database.sequelize.transaction(async function (t) {  
      if(!useClassCache){
        for(let index = 0 ; index < institutions.length; index++){
          let institution = institutions[index];
          let noticeText = institution.erpInstitution?'处理机构':'无此机构';
          stream.write(`${noticeText} ${institution.name}\t==========================${index+1}/${institutions.length} \n`);
          if(!institution.erpInstitution){
            continue;
          }
          let erpInstitution = institution.erpInstitution;
          let users = institution.users;
          let classes = allClasses.filter(cls=>cls.institutionId==institution._id);
          let courses = allcourses.filter(course=>course.institutionId==institution._id);
          await createOnlineClasses(erpInstitution.dataValues.id,erpInstitution.dataValues.open_code, users, classes, courses, database, t);
          for(let indexCls = 0 ; indexCls < classes.length; indexCls++){
            let cls = classes[indexCls];
            let studentClassInstances = allStudentClassInstances.filter(sci=>sci.classId == cls._id);
            let orders = allOrders.filter(o=>o.classId == cls._id);
            stream.write(`    班级报名 ${cls.className}=======${indexCls+1}/${classes.length} \n`);
            await mergeStudentClasses(cls, studentClassInstances, orders, allUsers, database, t);            
          }
        }
  
        let classesStream = fs.createWriteStream('mongo_backups/classes2.json');
        classesStream.write(JSON.stringify(allClasses));
        classesStream.end("\n");
        let orderStream = fs.createWriteStream('mongo_backups/orders2.json');
        orderStream.write(JSON.stringify(allOrders));
        orderStream.end("\n");
  
        let institutionsStream = fs.createWriteStream('mongo_backups/institutions2.json');
        institutionsStream.write(JSON.stringify(institutions));
        institutionsStream.end("\n");
      }
     

      await mergeCoupons(allClasses,institutions, allOrders, allUsers,
        shareCouponInstances, shareCouponInstanceObtains, coupons, database, t);
    });
  

  };
  return f();
}
module.exports = processData;

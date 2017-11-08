const fs = require('fs');
const sequelize = require('sequelize');
const _ = sequelize.Utils._;
const createOnlineClasses = require('./merge_process/createOnlineClasses')
const createStudents = require('./merge_process/createStudents')
const mergeInstitutions = require('./merge_process/mergeInstitutions')
const mergeStudentClasses = require('./merge_process/mergeStudentClasses')
const mergeCoupons = require('./merge_process/mergeCoupons')
const mergeOrders = require('./merge_process/mergeOrders')
const createOfflineClasses = require('./merge_process/createOfflineClasses')
const mergeWechatInfo = require('./merge_process/mergeWechatInfo')
const mapMobile = require('./merge_process/mapMobile')


const useCache=false;
const useClassCache=false;

const exec = require('child_process').exec; 
function getCollection(name){
  var file=`./mongo_backups/${name}.json`;
  return JSON.parse(fs.readFileSync(file, 'utf-8'));
}

function processData(database){
  var f = async function () {
    let stream = fs.createWriteStream('process.log');
    
    let institutions = getCollection(!useClassCache?'institutions':'institutions2');
    let allUsers = getCollection(!useCache?'users':'students2');
    //allUsers = allUsers.filter(u=>u.account.phone&&u.account.phone.length>0);
    allUsers.forEach(u=>u.account.phone = u.account.phone?mapMobile(u.account.phone):null);
    let allClasses = getCollection(!useClassCache?'classes':'classes2');
    let allcourses = getCollection('courses');
    let allStudentClassInstances = getCollection('studentClassInstances');
    let allOrders = getCollection(!useClassCache?'orders':'orders2');
    let coupons = getCollection('coupons');
    let shareCouponInstanceObtains = getCollection('shareCouponInstanceObtains');
    let shareCouponInstances = getCollection('shareCouponInstances');
    let offlineCourses = getCollection('offlineCourses');
    
    await database.sequelize.transaction(async function (t) {  

      let nginxString = await mergeInstitutions(institutions,allUsers,database,t);
    
      for(let index = 0 ; index < institutions.length; index++){
        let institution = institutions[index];
        if(!institution.erpInstitution){
          continue;
        }
        let offlines = offlineCourses.filter(o=>o.institutionId==institution._id);
        await createOfflineClasses(institution.erpInstitution.dataValues.id, offlines,database, t);
      }
  
  
    //创建学生
      if(!useCache){
        await createStudents(allUsers, database, t);
        let studentSteam = fs.createWriteStream('mongo_backups/students2.json');
        studentSteam.write(JSON.stringify(allUsers));
        studentSteam.end("\n");
      }

    //创建在线课程
      if(!useClassCache){
        for(let index = 0 ; index < institutions.length; index++){
          let institution = institutions[index];
          let noticeText = institution.erpInstitution?'处理机构':'无此机构';
          stream.write(`${noticeText} ${institution.name}\t==========================${index+1}/${institutions.length} \n`);
          if(!institution.erpInstitution){
            continue;
          }
          nginxString += `    location ~* ^/wechat/institution/${institution._id}/class/(?<class_id>.+?)$ {\n`;

          let erpInstitution = institution.erpInstitution;
          let users = institution.users;
          let classes = allClasses.filter(cls=>cls.institutionId==institution._id);
          let courses = allcourses.filter(course=>course.institutionId==institution._id);
          nginxString += await createOnlineClasses(erpInstitution.dataValues.id,erpInstitution.dataValues.open_code, users, classes, courses, database, t);
          for(let indexCls = 0 ; indexCls < classes.length; indexCls++){
            let cls = classes[indexCls];
            let studentClassInstances = allStudentClassInstances.filter(sci=>sci.classId == cls._id);
            let orders = allOrders.filter(o=>o.classId == cls._id);
            stream.write(`    班级报名 ${cls.className}=======${indexCls+1}/${classes.length} \n`);
            await mergeStudentClasses(cls, studentClassInstances, orders, allUsers, database, t);            
          }
          nginxString += `        root /mnt/deploy/wx-client-react/client;
        try_files $uri /wechat/index.html;
    }\n`
        }
        

        let classNginxStream = fs.createWriteStream('nginx.log');
        classNginxStream.write(nginxString);
        classNginxStream.end("\n");
          
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
      await mergeOrders(allClasses,institutions, allOrders, allUsers, database, t);
      await mergeCoupons(allClasses,institutions, allOrders, allUsers,
        shareCouponInstances, shareCouponInstanceObtains, coupons, database, t);
      await mergeWechatInfo(allUsers, database, t);
    });
  };
  return f();
}
module.exports = processData;

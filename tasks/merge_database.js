const fs = require('fs');
const sequelize = require('sequelize');
const _ = sequelize.Utils._;
const createOnlineClasses = require('./merge_process/createOnlineClasses')
const createStudents = require('./merge_process/createStudents')

const exec = require('child_process').exec; 
const WXROLE = 1007;
function getCollection(name){
  var file=`./mongo_backups/${name}.json`;
  return JSON.parse(fs.readFileSync(file, "utf-8"));
}
function mobileMap(mobile){
  if('15000000001' == mobile){
    return '13524476369';
  }
  return mobile;
}

async function createInstitution(institution, user, erpUser, database, transaction){
  let erpInstitution = {};
  let erpInstObject = {
    open_code: `WXTMP${erpUser.id}`,
    name: institution.name,
    member_count: 1,
    research_revenue_proportion: 500,
    platform_revenue_proportion: 2850,
    institution_revenue_proportion: 6650,
    course_count: 0,
    class_count: 0,
    share_image: institution.shareSettings&&institution.shareSettings.image?institution.shareSettings.image:null,
    share_description: institution.shareSettings&&institution.shareSettings.description?institution.shareSettings.description:null,
    share_title: institution.shareSettings&&institution.shareSettings.title?institution.shareSettings.title:null,
    introduction: institution.introduction,
    banner: institution.channelBanner,
    is_del: 0,
  }
  erpInstitution = await database.institution.create(erpInstObject);
  
  let  institutionId = erpInstitution.dataValues.id;
  let  userId = erpUser.dataValues.id;
  await database.user_role.create({
    user_id: userId,
    role_id: WXROLE,
    instituion_id: institutionId
  }, {transaction});
  let instituonMember = await database.institution_member.create({
    institution_id: institutionId,
    user_id: userId
  }, {transaction});
  return erpInstitution;
  
}
async function createInstitutionMember(erpInstitution, erpUser, database, transaction){
  let instituonMember = await database.institution_member.create({
    institution_id: erpInstitution.dataValues.id,
    user_id: erpUser.dataValues.id
  }, {transaction});
  return erpInstitution;
  
}


function processData(database){
  var f = async function () {
    let stream = fs.createWriteStream('cannotFindUsers.csv');
    let streamInst = fs.createWriteStream('instituionConflict.csv');
    let streamMulti = fs.createWriteStream('streamMulti.csv');
    
    let institutions = getCollection("institutions");
    let allUsers = getCollection("users");
    allUsers = allUsers.filter(u=>u.account.phone&&u.account.phone.length>0);
    allUsers.forEach(u=>u.account.phone = mobileMap(u.account.phone ));
    
    await database.sequelize.transaction(async function (transaction) {  
      
      for(let index = 0 ; index < institutions.length; index++){
        let institution = institutions[index];
        institution.erpUsers = [];
        let users = allUsers.filter(user=>institution.memberIds.find(id=>id==user._id));
        institution.users = users;
        let erpInstitution = null;
        for(let i = 0 ; i < institution.memberIds.length; i++){
          let user = users.find(user=>user._id==institution.memberIds[i]);
          if(institution.memberIds.length>1){
            streamMulti.write(`${institution.name},${user.name},${user.account.phone}\n`);
          }
          let mobile = user.account.phone;
          let erpUser = await database.user.findOne({
            where: {mobile},
            transaction
          });
          if(!erpUser){
            stream.write(`${user.name},${user.account.phone},${institution.name}\n`)
            console.log(`${user.account.phone}erp中无用户${JSON.stringify(user)}${JSON.stringify(institution)}`);
            continue;
          }
          institution.erpUsers.push(erpUser);
          const {id} = erpUser.dataValues;
          let institutionMember = await database.institution_member.findOne({
            where: {user_id: id} ,
            transaction
          });
          if(!institutionMember){
            if(!erpInstitution){
              erpInstitution = await createInstitution(institution, user, erpUser, database, transaction); 
            }else{
              await createInstitutionMember(erpInstitution, erpUser, database, transaction); 
            }
          }else{
            let erpInstitutionTmp = await database.institution.findOne({
              where: {id: institutionMember.dataValues.institution_id},
              transaction 
            });
            if(erpInstitution && erpInstitution.dataValues.id != erpInstitutionTmp.dataValues.id){
              streamInst.write(`${user.name},${mobile},${institution.name},${erpInstitutionTmp.dataValues.name},${erpInstitution.dataValues.name}\n`);
              continue;
              //throw  `机构不一致${JSON.stringify(erpInstitution)}，${JSON.stringify(erpInstitutionTmp)}`;
            }
            erpInstitution = erpInstitutionTmp;
          }
          institution.erpInstitution = erpInstitution;
        }
      }
    });
    
    stream.end('\n'); 
    streamInst.end('\n'); 
    streamMulti.end('\n'); 

    
  
    
    let classes = getCollection("classes").filter(cls=>cls.institutionId==institution._id);
    let courses = getCollection("courses").filter(course=>course.institutionId==institution._id);
    await database.sequelize.transaction(async function (t) {  
      //await createOnlineClasses(erpInstitution.dataValues.id,erpInstitution.dataValues.open_code, users, classes, courses, database, t);
    });
    await database.sequelize.transaction(async function (t) {  
      await createStudents(allUsers, database, t);
    });
  };
  return f();
}
module.exports = processData;

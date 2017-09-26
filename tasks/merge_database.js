const fs = require('fs');
const sequelize = require('sequelize');
const _ = sequelize.Utils._;
const createOnlineClasses = require('./merge_process/createOnlineClasses')

const exec = require('child_process').exec; 
const WXROLE = 1007;
function getCollection(name){
  var file=`./mongo_backups/${name}.json`;
  return JSON.parse(fs.readFileSync(file, "utf-8"));
}


async function createInstitution(institution, user, erpUser, database){
  let erpInstitution = {};
  await database.sequelize.transaction(async function (t) {
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
    });
    let instituonMember = await database.institution_member.create({
      institution_id: institutionId,
      user_id: userId
    });
  })
  return erpInstitution;
  
}



function processData(database){
  var f = async function () {
    let institutions = getCollection("institutions");

    let institution = institutions.find(inst=>inst.name == "黄思达老师网校");
    let users = getCollection("users").filter(user=>institution.memberIds.find(id=>id==user._id));

    let user = users.find(user=>user._id==institution.memberIds[0]);
    let mobile = user.account.phone;
    let erpUser = await database.user.findOne({
      where: {mobile}  
    });
    if(!erpUser){
      console.log(`erp中无用户，手机号${mobile}`);
      return;
    }

    const {id} = erpUser.dataValues;
    let institutionMember = await database.institution_member.findOne({
      where: {user_id: id}  
    });
    let erpInstitution = {};
    if(!institutionMember){
      erpInstitution = await createInstitution(institution, user, erpUser, database);
    }else{
      erpInstitution = await database.institution.findOne({
        where: {id: institutionMember.dataValues.institution_id}  
      });
    }
    
    let classes = getCollection("classes").filter(cls=>cls.institutionId==institution._id);
    let courses = getCollection("courses").filter(course=>course.institutionId==institution._id);
    await database.sequelize.transaction(async function (t) {  
      await createOnlineClasses(erpInstitution.dataValues.id,erpInstitution.dataValues.open_code, users, classes, courses, database, t);
    });
      
  };
  return f();
}
module.exports = processData;

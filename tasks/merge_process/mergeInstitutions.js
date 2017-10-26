const fs = require('fs');
var async = require('async');  
const sequelize = require('sequelize');
const _ = sequelize.Utils._;
const WXROLE = 1007;
async function creatRole(institutionId, userId, database, transaction){
  let data = {/*institution_id: institutionId, */user_id: userId, role_id: WXROLE};
  let instituonMember = await database.user_role.findCreateFind({
    where: data,
    defaults: data,
    transaction
  });
}  
async function createInstitution(institution, user, erpUser, database, transaction){
  let erpInstitution = {};
  let erpInstObject = {
    open_code: `WX${erpUser.id}`,
    name: '网校_'+institution.name,
    name_wx: institution.name,
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
  erpInstitution = await database.institution.create(erpInstObject,{transaction});
  
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
  await database.institution.increment('member_count', { where: { id: erpInstitution.dataValues.id }, transaction});
  return erpInstitution;
  
}
  
async function mergeInstitutions(institutions, allUsers, database, transaction){
  let stream = fs.createWriteStream('cannotFindUsers.csv');
  let streamInst = fs.createWriteStream('instituionConflict.csv');
  let streamMulti = fs.createWriteStream('streamMulti.csv');
  
  let homeNginx = '    location ~* ^/wechat/institution/(?<institution_id>.+?)/home {\n';
  

  for(let index = 0 ; index < institutions.length; index++){
    let institution = institutions[index];
    institution.erpUsers = [];
    let users = allUsers.filter(user=>institution.memberIds.find(id=>id==user._id));
    institution.users = users;
    let erpInstitution = null;
    for(let i = 0 ; i < institution.memberIds.length; i++){
      let user = users.find(user=>user._id==institution.memberIds[i]);
      if(institution.memberIds.length>1){
        streamMulti.write(`${institution.name},${user.name}(${user.realname}),${user.account.phone}\n`);
      }
      let mobile = user.account.phone;
      let erpUser = await database.user.findOne({
        where: {mobile},
        transaction
      });
      if(!erpUser){
        let name = user.realname || user.name;
        erpUser = await database.user.create({
            mobile, 
            name, 
            password:'14e1b600b1fd579f47433b88e8d85291'
        },{transaction});
        
        await database.teacher.create({
          user_id: erpUser.dataValues.id, 
          nick_name:name, 
          open_code: 'wx' + erpUser.dataValues.id,
        },{transaction});

        await database.teacher_grade.create({
          user_id: erpUser.dataValues.id, 
          grade_id:1, 
        },{transaction});

        await database.teacher_subject.create({
          user_id: erpUser.dataValues.id, 
          subject_id: 1, 
        },{transaction});
        stream.write(`${user.name}(${user.realname}),${user.account.phone},${institution.name}\n`)
        console.log(`${user.account.phone}erp中无用户${JSON.stringify(user)}${JSON.stringify(institution)}`);
      }
      await database.teacher_qualification.findCreateFind({
        where: {user_id: erpUser.dataValues.id},
        defaults: {
          user_id: erpUser.dataValues.id, 
          description_wx:user.intro,
        },
        transaction
      });
      await database.teacher_qualification.update(
        {
          user_id: erpUser.dataValues.id, 
          description_wx:user.intro,
        },
        {where: {user_id: erpUser.dataValues.id}, transaction}
      );
      institution.erpUsers.push(erpUser);
      const {id} = erpUser.dataValues;
      let institutionMember = await database.institution_member.findOne({
        where: {user_id: id} ,
        transaction
      });
      if(!institutionMember){
        if(!erpInstitution){
          erpInstitution = await createInstitution(institution, user, erpUser, database, transaction); 
          institution.erpInstitution = erpInstitution;
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
          institution.erpInstitution = null;
          continue;
          //throw  `机构不一致${JSON.stringify(erpInstitution)}，${JSON.stringify(erpInstitutionTmp)}`;
        }
        if(!erpInstitution){
          erpInstitution = erpInstitutionTmp;
          institution.erpInstitution = erpInstitution;
        }
        await creatRole(erpInstitution.dataValues.id, id, database, transaction);
        
      }
      await database.institution.update( 
        {
          name_wx: institution.name,
          share_image: institution.shareSettings&&institution.shareSettings.image?institution.shareSettings.image:null,
          share_description: institution.shareSettings&&institution.shareSettings.description?institution.shareSettings.description:null,
          share_title: institution.shareSettings&&institution.shareSettings.title?institution.shareSettings.title:null,
          introduction: institution.introduction,
          banner: institution.channelBanner,
          is_del: 0
        }, 
        {
          where:{id: erpInstitution.dataValues.id},
          transaction
        }
      );
    }
    homeNginx = homeNginx  + 
    `        if ($institution_id = ${institution._id}) {
            return 301 /wechat/institution/${erpInstitution.dataValues.id}/home;
        }\n`;
  }
  homeNginx = homeNginx+ `root /mnt/deploy/wx-client-react/client;
        try_files $uri /wechat/index.html;
    }\n`

  
  stream.end('\n'); 
  streamInst.end('\n'); 
  streamMulti.end('\n');
  return homeNginx;
}

module.exports = mergeInstitutions;

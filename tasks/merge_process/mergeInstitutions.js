const fs = require('fs');
var async = require('async');  
const sequelize = require('sequelize');
const _ = sequelize.Utils._;
const WXROLE = 1007;

  async function createInstitution(institution, user, erpUser, database, transaction){
    let erpInstitution = {};
    let erpInstObject = {
      open_code: `WX${erpUser.id}`,
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
          stream.write(`${user.name}(${user.realname}),${user.account.phone},${institution.name}\n`)
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
        }
      }
    }
    stream.end('\n'); 
    streamInst.end('\n'); 
    streamMulti.end('\n');
  }

module.exports = mergeInstitutions;

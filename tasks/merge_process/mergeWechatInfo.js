var async = require('async');  
const sequelize = require('sequelize');
const _ = sequelize.Utils._;

async function mergeWechatInfo(users, database, transaction){
  for(let index = 0 ; index < users.length; index++){
    let user = users[index];

    if(!user.unionid){
      continue;
    }
  
    await database.wechat_user_info.findCreateFind({
      where: {union_id: user.unionid},
      defaults: {nick_name: user.name, union_id: user.unionid},
      transaction
    });;
  }


}

module.exports = mergeWechatInfo;

const fs = require('fs');
const sequelize = require('sequelize');
const md5 = require('md5');
var request = require('request');
var Promise = require('Promise');

const _ = sequelize.Utils._;
const host = `http://api.csslcloud.net`;
const userId = "A2820EAC309CA7FD";
const apiKey = "KlfiBHYyMNAGIktBXV4Y0SKBE1kk8Nfh";

function doRequest(url) {
  return new Promise(function (resolve, reject) {
    request(url, function (error, res, body) {      
      if (!error && res.statusCode == 200) {
        resolve(body);
      } else {
        console.log(error);
        
        reject(error);
      }
    });
  });
}

async function roomInfo(roomId){
  let params={
    userid: userId,
    roomid: roomId
  }
  let query = createHashedQueryString(params, apiKey);
  let url = `${host}/api/room/search?${query}`;
  let result =  await doRequest(url);  
  result = JSON.parse(result);
  if(result.result=="OK"){
  }else{
    return;
  }
  let room = result.room;
  let modifyParams = {
    userid: userId,
    roomid: roomId,
    name: room.name,
    desc: room.desc,
    authtype: room.authType.toString(),
    publisherpass: room.publisherPass.toString(),
    assistantpass: room.assistantPass.toString(),
    playpass: room.playPass.toString(),
    barrage: room.barrage.toString(),
    openlowdelaymode: room.openLowDelayMode.toString(),
    showusercount: room.showUserCount.toString(),
    checkurl: 'https://wx.review.zhimo.co/wxserver/live/logincheck.do'
  }
  query = createHashedQueryString(modifyParams, apiKey);
  
  url = `${host}/api/room/update?${query}`;
  result =  await doRequest(url);  
  
  console.log(result); 
  
}
function createHashedQueryString(queryMap,salt) {
  let time = (new Date()).getTime();
  let queryString = "";
  var newkey = Object.keys(queryMap).sort();　
  for(var i = 0; i < newkey.length; i++) {

    if(queryString.length != 0){
        queryString += "&";
    }
    let key = newkey[i];
    let value = queryMap[key];
    queryString = queryString + key + "=" + encodeURIComponent(value);

  }

  if (queryString == null) {
      return null;
  }
  let second = time / 1000;
  second = Math.floor(second);
  let hash = md5(`${queryString}&time=${second}&salt=${salt}`);
  hash = hash.toUpperCase();
  return `${queryString}&time=${second}&hash=${hash}`;

}


function getCollection(name){
  var file=`./mongo_backups/${name}.json`;
  return JSON.parse(fs.readFileSync(file, 'utf-8'));
}

function processData(database){
  var f = async function () {
    let allClasses = getCollection('classes').filter(cls=>cls.institutionId=='933161b305ec4599be1c5e1988e512df');
    for(let i = 0 ; i < allClasses.length; i++){
      let cls = allClasses[i];
      console.log(`班级:${cls.className}`); 
      
      await roomInfo(cls.liveChannelId); 
    }
  };
  return f();

  
}
module.exports = processData;

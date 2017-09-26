const fs = require('fs');
const sequelize = require('sequelize');
const _ = sequelize.Utils._;

const exec = require('child_process').exec; 
const WXROLE = 1007;
function getCollection(name){
  var file=`./mongo_backups/${name}.json`;
  return JSON.parse(fs.readFileSync(file, "utf-8"));
}
function read() {

  var cmdStr = "ssh liren@zhimo.co -i ~/zhimo_liren_key.pem -p 23315 '\
  cd mongo_backups;\
  mongoexport -d wx -c classes --jsonArray -o classes.json;\
  mongoexport -d wx -c consults --jsonArray -o consults.json;\
  mongoexport -d wx -c coupons --jsonArray -o coupons.json;\
  mongoexport -d wx -c courses --jsonArray -o courses.json;\
  mongoexport -d wx -c institutions --jsonArray -o institutions.json;\
  mongoexport -d wx -c offlineCourses --jsonArray -o offlineCourses.json;\
  mongoexport -d wx -c orders --jsonArray -o orders.json;\
  mongoexport -d wx -c scores --jsonArray -o scores.json;\
  mongoexport -d wx -c shareCouponInstanceObtains --jsonArray -o shareCouponInstanceObtains.json;\
  mongoexport -d wx -c shareCouponInstances --jsonArray -o shareCouponInstances.json;\
  mongoexport -d wx -c studentClassInstances --jsonArray -o studentClassInstances.json;\
  mongoexport -d wx -c users --jsonArray -o users.json;\
  exit;';\
  scp  -P 23315  -i ~/zhimo_liren_key.pem liren@zhimo.co:~/mongo_backups/* ./mongo_backups/;\
  ";

  exec(cmdStr, function(err,stdout,stderr){
    if(err) {
        console.log('export mongodb error:'+stderr);
    } else {
        console.log(stderr);
        console.log(stdout);        
    }
  });
}

module.exports = read;

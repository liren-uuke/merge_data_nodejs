var async = require('async');  
const sequelize = require('sequelize');
const _ = sequelize.Utils._;

async function createStudents(users, database, transaction){
    for(let i = 0 ; i < users.length; i++){
        let user = users[i];
        if(!user.account.phone){
            console.log("跳过未注册用户");
            console.log(user);
            continue;
        }
        let erpStudentAccount = await database.student_account.findOne({
            where: {mobile :  user.account.phone} ,
            transaction
        });
        if(!erpStudentAccount){
            erpStudentAccount = await database.student_account.create({
                mobile: user.account.phone,
                password: user.account.passwd,
            }, {transaction});
        }
        user.studentId = erpStudentAccount.dataValues.id;
        
        let erpStudent = await database.student.findOne({
            where: {mobile: user.account.phone, system: 1} ,
            transaction 
        });
        if(!erpStudent){
            let studentNum = i.toString(10);
            let str0 = "000000";
            studentNum = str0.substr(0, 6-studentNum.length) + studentNum;
            console.log(user.portrait);
            erpStudent = await database.student.create({
                mobile:user.account.phone,
                name:user.realname?user.realname:user.name,
                status:0,
                avatar: user.portrait?user.portrait:'',
                number: 'WX1709' + studentNum,
                system: 1,
            }, {transaction});
        }
        user.studentId = erpStudentAccount.dataValues.id;

        let erpstudentWeixin =  await database.student_weixin.findOne({
            where: {mobile: user.account.phone, wechat_key: 'ZHIMO'} ,
            transaction,
        });
        if(!erpstudentWeixin){
            erpStudent = await database.student_weixin.create({
                mobile: user.account.phone,
                open_id: user.wechatopenId,
                union_id:user.unionid,
                wechat_key: 'ZHIMO',
            }, {transaction});
        }else{ 
            await database.student_weixin.update(
                {
                    open_id: user.wechatopenId, 
                    union_id: user.unionid
                },
                {
                    where: {mobile: user.account.phone, wechat_key: 'ZHIMO'} ,
                    transaction
                }
            )
        }
        
    };
   
}

module.exports = createStudents;

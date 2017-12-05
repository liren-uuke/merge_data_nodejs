const fs = require('fs');
const sequelize = require('sequelize');
const _ = sequelize.Utils._;



function processData(database){
  var f = async function () {
   
    
    await database.sequelize.transaction(async function (transaction) {  

      while(true){
        let sl = await database.student_lesson.findOne({
          where: {'lesson_id':0,'is_del':0},
          transaction,
        });
        if(!sl || !sl.dataValues){
          break;
        }
        let lessons = await database.class_lesson.findAll({
          where: {'class_id':sl.dataValues.class_id, is_del:0},
          transaction,
        });
        await database.student_lesson.update(
          { is_del : 1},
          {
            where:{student_id: sl.dataValues.student_id, class_id: sl.dataValues.class_id},
            transaction
          }
        );
        for(let i=0; i < lessons.length; i++){
          let lesson = lessons[i];
          await database.student_lesson.findCreateFind({
            where:{
              student_id: sl.dataValues.student_id, 
              class_id: sl.dataValues.class_id,
              lesson_id: lesson.dataValues.id,
            },
            defaults:{
              student_id: sl.dataValues.student_id, 
              class_id: sl.dataValues.class_id,
              lesson_id: lesson.dataValues.id,
              purchase_id: sl.dataValues.purchase_id,
            },
            transaction
          });
        }
      }
      
    });
  };
  return f();
}
module.exports = processData;

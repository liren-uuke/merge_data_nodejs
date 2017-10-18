var async = require('async');  
const sequelize = require('sequelize');
const _ = sequelize.Utils._;

async function createOfflineClasses(institutionId, offlineCourses, database,transaction){

    for(let i = 0 ; i < offlineCourses.length; i++){
        let cls = offlineCourses[i];
        strOpenCode = '';
        //class_info
        let erpClass= await database.class_info.findCreateFind({
            where: {            
                name: cls.name,
                institution_id: institutionId              
            },
            default:{
                name: cls.name,
                grade_id:17,
                lesson_count: 0,
                online_type: 2,
                institution_id: institutionId,
                status: cls.status == 0 ? 1 : cls.status == 1 ? 0 : 2 ,
                course_id: 0,
                description : cls.introduction,
                introduction: cls.description,
                cover: cls.cover,
                link: cls.link,
                on_shelves_time: new Date(parseInt(cls.onShelvesDate.$numberLong)),
            },
            transaction
        });
    };
}

module.exports = createOfflineClasses;

var async = require('async');  
const sequelize = require('sequelize');
const _ = sequelize.Utils._;

async function createOnlineClasses(institutionId, openCode, teachers, classes, courses, database,transaction){
    let mobiles = teachers.map(te=>te.account.phone);    
    let erpUsers = await database.user.findAll({
        where: {mobile : { in : mobiles }}  
    });
    erpUsers.forEach(u=>{
        let teacher = teachers.find(te=>te.account.phone == u.dataValues.mobile);
        u.dataValues.mongoId = teacher._id;
    });
    let erpCourses = [];
    for(let i = 0 ; i < courses.length; i++){
        let course = courses[i];
        //course
        let erpCourse= await database.course.create({
            name: course.name,
            grade_id:17,
            lesson_count: course.steps.length,
            online_type: 1,
            institution_id:institutionId,
            status: course.state == 0 ? 1 : course.state == 1 ? 0 : 2,
        },{transaction});
        //course_lesson
        for(let index = 0 ; index < course.steps.length; index++){
            let step = course.steps[index];
            await database.course_lesson.create({
                name: step.title,
                number: index + 1,
                type: 0,
                course_id: erpCourse.id
            },{transaction});
        }
        erpCourses.push({...erpCourse.dataValues, mongoId:course._id});
    } 
    for(let i = 0 ; i < classes.length; i++){
        let cls = classes[i];
        
        let erpCourse = erpCourses.find(c=>c.mongoId == cls.courseId);
        let strOpenCode = i.toString(10);
        let str0 = "000000";
        strOpenCode = openCode + str0.substr(0, 6-strOpenCode.length) + strOpenCode;
        //class_info
        let erpClass= await database.class_info.create({
            name: cls.className,
            grade_id:17,
            lesson_count: cls.steps.length,
            online_type: 1,
            institution_id: institutionId,
            status: cls.status == 0 ? 1 : cls.status == 1 ? 0 : 2 ,
            course_id: erpCourse.id,
            open_code: strOpenCode,
            price: cls.classTuition * 100,
            max_students: cls.upperLimit,
            lesson_count: cls.steps.length,
            live_channel_id : cls.liveChannelId,
            introduction: cls.classIntro,
            cover: cls.classCover,
            valid_date: new Date(cls.validDate * 1000),
            begin_date: new Date(cls.beginDate * 1000),
            on_shelves_time: new Date(parseInt(cls.onShelvesDate.$numberLong)),
        },{transaction});
        let erpClassTeachers = erpUsers.filter(u=>cls.teacherIds.find(id=>id==u.dataValues.mongoId));
        
        //class_teacher
        await async.map(erpClassTeachers, t=>{
            database.class_teacher.create({
                class_id: erpClass.dataValues.id,
                course_id: erpCourse.id,
                teacher_usr_id: t.dataValues.id,
            },{transaction});
        });

        //class_lesson
        for(let index = 0 ; index < cls.steps.length; index++){
            let step = cls.steps[index];
            let lessonTeacher = erpUsers.find(u=>u.dataValues.mongoId == step.teacherId);
            let erpLesson = await database.class_lesson.create({
                number:index + 1,
                class_id: erpClass.dataValues.id,
                course_id: erpCourse.id,
                teacher_id: lessonTeacher.dataValues.id,
                start_time: new Date(step.startTime * 1000), 
                end_time: new Date(step.endTime * 1000), 
                time_range_id: -1,
                playback_count: step.playbacks?step.playbacks.length:-1,
                instituion_id: institutionId
            },{transaction});
            if(step.playbacks){
                //selected_playback
                await async.each(step.playbacks,function(playback){
                    database.selected_playback.create({
                        start_time: new Date(playback.startTime * 1000), 
                        end_time: new Date(playback.endTime * 1000), 
                        class_lesson_id: erpLesson.dataValues.id,
                        playback_id: playback.id
                    },{transaction});     
                });     
            }
        };
    };
}

module.exports = function(institutionId, openCode, teachers, classes, courses, database, t){
    return createOnlineClasses(institutionId, openCode, teachers, classes, courses, database, t);
}
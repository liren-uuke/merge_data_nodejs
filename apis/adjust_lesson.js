const moment = require('moment');

/**
 * @Description 学员调课节
 * @Description 条件：1，调课节次数未达到上限;2，互为平行班;3，课节未结束,对应的课节顺序相同;4，所调的班级学生数量未达到上限；
 * @Description 操作：1，删除原课节学生关联；2，删除原课节学生签到信息；3，添加新班级和学生的关联信息（标记为调课); 4，添加新课节和学生的关联信息（标记为调课）;5，添加调课记录
 * @param studentId 学员id
 * @param fromClassId 原班级id
 * @param fromLessonId 原课节id
 * @param toClassId 新班级id
 */
module.exports = function(database) {
  return async function (ctx, next) {
    const {studentId, fromClassId, fromLessonId, toClassId} = ctx.request.body;
    const fromClass = await database.class_info.findById(fromClassId);
    if (fromClass == null) {
      ctx.throw(400, '原班级不存在');
    }

    const toClass = await database.class_info.findById(toClassId);
    if (toClass == null) {
      ctx.throw(400, '目标班级不存在');
    }

    // 是否是平行班
    if (fromClass.course_id != toClass.course_id || fromClass.price != toClass.price) {
      ctx.throw(400, '非平行班，不能相互调转');
    }

    const course = await database.course.findById(fromClass.course_id);

    // 检查调课次数限制
    const used = await getAdjustTimes(database, studentId, fromClass.course_id, fromClassId, toClassId);
    if (used >= course.adjust_limit) {
      ctx.throw(400, '调课次数超出限制');
    }

    const fromLesson = await database.class_lesson.findById(fromLessonId);
    if (fromLesson == null) {
      ctx.throw(400, '原课节不存在');
    } else if (fromLesson.class_id != fromClassId) {
      ctx.throw(400, '原课节不属于原班级');
    }

    const toLesson = await getClassLessonByNumber(database, toClassId, fromLesson.number);
    if (toLesson == null) {
      ctx.throw(400, '目标课节不存在');
    }

    if (moment(toLesson.end_time).isBefore(Date.now())) {
      ctx.throw(400, '目标课节已结束，不能调课');
    }

    const adjusted_students = await database.student_lesson.count({
      col: 'student_id',
      where: { class_id: toClassId, lesson_id: toLesson.id, status: 3 },
    });

    if (adjusted_students >= toClass.adjust_limit) {
      ctx.throw(400, `转入课节学生数:${adjusted_students} 已经超过调班限额:${toClass.adjust_limit}`);
    }

    await database.sequelize.transaction(async function (t) {
      // 删除原有的课节关联
      await database.student_lesson.destroy({
        where: {student_id: studentId, lesson_id: fromLessonId},
      });

      // 删除课节签到信息
      await database.student_lesson_sign.destroy({
        where: {student_id: studentId, lesson_id: fromLessonId},
      });

      // 添加新班级学生关联
      const purchaseId = await getLastPurchaseId(database, fromClassId, studentId);
      const classStudent = await database.class_student.findOne({
        where: {class_id: toClassId, student_id: studentId},
      });
      if (classStudent == null) {
        await database.class_student.upsert({
          class_id: toClassId,
          course_id: course.id,
          student_id: studentId,
          purchase_id: purchaseId,
          status: 3,
        });
      } else if (classStudent.status != 3){
        await database.class_student.update({
          status: 3,
        }, {
          where: {class_id: toClassId, student_id: studentId},
        });
      }

      // 添加新课节学生关联
      await database.student_lesson.upsert({
        class_id: toClassId,
        course_id: course.id,
        student_id: studentId,
        lesson_id: toLesson.id,
        purchase_id: purchaseId,
        status: 3,
        makeup_class_id: 0,
        makeup_lesson_id: 0,
        create_time: new Date(),
      });

      // 添加学员操作记录
      await database.class_student_op.upsert({
        from_class_id: fromClassId,
        to_class_id: toClassId,
        course_id: course.id,
        student_id: studentId,
        purchase_id: purchaseId,
        from_lesson_ids: JSON.stringify([fromLessonId]),
        to_lesson_ids: JSON.stringify([toLesson.id]),
        op_type: 3,
        operator_id: ctx.state.user.id,
      });
    });

    ctx.body = {success: true};
  };
};

function getAdjustTimes(database, student_id, course_id, from_class_id, to_class_id) {
  return database.class_student_op.count({
    col: 'id',
    where: { student_id, course_id, op_type: 3, from_class_id, to_class_id },
  });
}

function getClassLessonByNumber(database, class_id, number) {
  return database.class_lesson.findOne({
    where: {class_id, number},
  });
}

async function getLastPurchaseId(database, class_id, student_id) {
  const classStudent = await database.class_student.findOne({
    where: {class_id, student_id},
    order: [['create_time', 'DESC']],
  });
  return classStudent.purchase_id;
}

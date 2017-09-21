module.exports = function(database) {
  return async function (ctx, next) {
    const {classId} = ctx.params;
    const classInfo = await database.class_info.findById(classId);
    if (classInfo != null) {
      ctx.body = classInfo;
    } else {
      ctx.throw(404, '班级不存在');
    }
  };
};

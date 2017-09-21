const md5 = require('md5');
const jwt = require('jsonwebtoken');

module.exports = function(database) {
  return async function (ctx, next) {
    const {mobile, password} = ctx.request.body;

    const student = await database.student.findOne({
      where: {mobile},
    });

    if (student == null) {
      ctx.throw(401, '学员不存在');
    }

    const account = await database.student_account.findOne({
      where: {mobile},
    });

    if (account == null) {
      ctx.throw(401, '请先通过忘记密码方式设置密码');
    } else if (md5(password) != account.password) {
      ctx.throw(401, '密码不正确');
    } else {
      const {id, mobile, name, number} = student;
      const token = jwt.sign({id, mobile, name, number}, process.env.JWT_SECRET, {expiresIn: "7 days"});
      ctx.body = {token, student};
    }
  };
};

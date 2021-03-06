const Config =  require('config');
const Sequelize = require('sequelize');

// Automatically pass transactions to queries
const cls = require('continuation-local-storage');
const namespace = cls.createNamespace('mysql-transaction');
Sequelize.useCLS(namespace);

const sql_server = Config.get('sql_server');
const sequelize = new Sequelize(sql_server);

// sequelize
//   .authenticate()
//   .then(() => {
//     console.log('Database connection has been established successfully.');
//   })
//   .catch(err => {
//     console.error('Unable to connect to the database:', err);
//   });

const models = [
  'class_info',
  'class_lesson',
  'class_student',
  'class_student_op',
  'course',
  'student',
  'student_account',
  'student_lesson',
  'student_lesson_sign',
  'user',
  'institution',
  'institution_member',
  'teacher',
  'user_role',
  'course_lesson',
  'class_lesson',
  'selected_playback',
  'class_teacher',
  'student_weixin',
  'class_student',
  'purchase_class',
  'purchase_info',
  'student_coupon_obtained',
  'coupon',
  'student_coupon_shared',
  'teacher_qualification',
  'teacher_grade',
  'teacher_subject',
  'teacher_subject',
  'wechat_user_info',
  'student_refund',
  'class_promote'
  
];

models.forEach(function(model) {
  module.exports[model] = sequelize.import(__dirname + '/models/' + model);
});

// export database connection
module.exports.sequelize = sequelize;

module.exports.models = models;

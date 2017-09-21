const fs = require('fs');
const sequelize = require('sequelize');
const _ = sequelize.Utils._;

function count_by_js(database) {
  return database.student.findAll().then(students => {
    console.log(students.length);
    let stream = fs.createWriteStream('students.csv');
    _.forEach(_.groupBy(students, 'mobile'), (children, mobile) => {
      if (children.length > 1) {
        stream.write(`${mobile},${children.length}\n`);
      }
    });
    stream.end('\n', () => {
      process.exit();
    });
  });
}


function count_by_sql(database) {
  return database.student.findAll({
    attributes: ['mobile', [sequelize.fn('count', sequelize.col('id')), 'count']],
    group: ['mobile'],
    order: [[sequelize.col('count'), 'desc']],
  }).then(students => {
    let stream = fs.createWriteStream('students2.csv');
    _.forEach(students, record => {
      const {mobile, count} = record.dataValues;
      if (count > 1) {
        stream.write(`${mobile},${count}\n`);
      }
    });
    stream.end('\n', () => {
      process.exit();
    });
  });
}

module.exports = count_by_sql;

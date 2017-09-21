require('dotenv').config();

const Config =  require('config');
const SequelizeAuto = require('sequelize-auto')

const sql_server = Config.get('sql_server');
const {database, username, password, ...options} = sql_server;
const sequelizeAuto = new SequelizeAuto(database, username, password, {
  ...options,
  additional: {
    timestamps: false,
  },
});

sequelizeAuto.run(function (err) {
  if (err) throw err;

  console.log(sequelizeAuto.tables); // table list
  console.log(sequelizeAuto.foreignKeys); // foreign key list
  console.log('Done!');
});


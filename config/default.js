module.exports = {
  sql_server: {
    host: "lkl.data",
    port: 3306,
    dialect: "mysql",
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: "libra",
  }
}

module.exports = {
  sql_server: {
    host: "127.0.0.1",
    port: 3306,
    dialect: "mysql",
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: "libra",
  }
}

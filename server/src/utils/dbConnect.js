const mysql = require("mysql2");
const dotenv = require("dotenv");

dotenv.config();

const connection = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASS,
  port: process.env.DATABASE_PORT,
  database: "kainakap",
  waitForConnections: true,
  queueLimit: 0,
  connectTimeout: 20000, // 10 seconds
});

module.exports = connection;

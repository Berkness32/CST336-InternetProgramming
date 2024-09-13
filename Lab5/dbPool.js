const mysql = require('mysql');

const pool = mysql.createPool({
  connectionLimit: 10,
  host: "i5x1cqhq5xbqtv00.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
  user: "r1nhvxa8hyav6wna",
  password: "tnmdcxznh7l9vytd",
  database: "jv5eb3fbf7e8zwi6"
});

module.exports = pool;
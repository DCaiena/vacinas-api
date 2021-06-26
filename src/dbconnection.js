const mysql = require('mysql')

const  DB_CONNETION = mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'password',
  database:'vacinasdb',
  prot:'4004'
})
module.exports = DB_CONNETION

import * as mysql from 'mysql';

const mysqlPool = mysql.createPool({
  host     : '123.207.98.46:3306',
  user     : 'root',
  password : 'xunfeng',
  database : 'demo'
})
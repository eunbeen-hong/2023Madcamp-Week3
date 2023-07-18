const fs = require('fs');
var db_password;

try {
    const data = fs.readFileSync('secret/db_password.json', 'utf8');
    const jsonData = JSON.parse(data);
    db_password = jsonData.password;
  } catch (error) {
    console.error('Error reading file:', error);
    return;
  }
  

var mysql = require('mysql');
const { connect } = require('./main');
var db = mysql.createConnection({
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: db_password,
    database: 'playjam_db'
});
db.connect(function(err) {
    if (err) {
        console.error('MySQL 연결 오류:', err);
        return;
    }
    console.log('MySQL에 연결되었습니다.');

      // Perform a test query
  db.query('SELECT 1 + 1 AS result', (error, results) => {
    if (error) {
      console.error('Error executing query:', error);
      return;
    }

    // The query was successful
    console.log('Test query result:', results[0].result);
  });
});

module.exports = db;


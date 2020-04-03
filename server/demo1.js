
let mysql = require('mysql');
let pool = mysql.createPool({
    host     : 'localhost',
    user     : 'root',
    password : "root",
    database : 'zyl',
    port:3306
  });
  pool.query('select * from blog', function(err, rows, fields) {
    // console.log(pool.getConnection)
    if (err) throw err;
    console.log('The solution is: ', rows);
});
// pool.end();





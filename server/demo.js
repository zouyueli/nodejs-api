//1 引入http模块
let http = require("http");
let mysql = require("mysql");


//2 创建后端服务
let server = http.createServer();



let conn = mysql.createConnection({
    host     : '47.105.183.13',
    user     : 'root',
    password : 'mysqlpwd666.',
    database:'zyl'
  });

  conn.connect();

server.on("request",function(req,resp){
    resp.setHeader("Access-Control-Allow-Origin", "*");
    var currentUrl = req.url;
    if(currentUrl=="/showBlogs"){
        console.log(conn);
        conn.query( 'select * from blog', function(err, rows) {
            if (err) throw err;
            console.log("result:"+rows);
            conn.end();

          });
    }
    
    
});




//4 启动服务
server.listen(8080,function(){
    console.log("blog后端服务启动，通过：http://0.0.0.0:8080");
});


// 引入mysql第三方模块
let mysql = require("mysql");

let pool = mysql.createPool({
    host     : 'localhost',
    user     : 'root',
    password : "root",
    database : 'zyl',
  });

  

function selectBlogs(){
    let sql = "select * from blog";
    // pool.connect();
    pool.query(sql,function(err,rows){
        console.log("api.js:"+rows);
        if(err)  throw  err;
        return rows;
    });
}




// // 添加一条blog
// function insertBlog(){
//     //获取前端过来的请求数据
//     let sql = "insert into blog values(?,?,?,?)";
//     let params = arguments;

// }



function singleBlog(){

    
    let sql = "select * from where id = ?";
    let id = arguments[0];
    connection.query(sql,id,function(err,result){

    });
}

// function updateBlog(){

//     let sql = "update blog set ";
//     let params = arguments;
//     connection.query(sql,params,function(err,result){

//     });
// }

// function deleteBlog(){

//     let sql = "delete from blog where id = ? ";
//     let id = arguments[0];
//     connection.query(sql,id,function(err,result){

//     });
// }

module.exports = {
    
    selectBlogs : selectBlogs,

}


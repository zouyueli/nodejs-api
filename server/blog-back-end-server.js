//1 引入http模块
let http = require("http");
let mysql = require("mysql");

//处理请求参数，解析url将&和=拆分成键值对
let queryString = require("querystring");


let conn = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : "root",
    database : 'zyl',
  });


//2 创建后端服务
let server = http.createServer();

//3 监听前端发过来的请求，返回的数据 已json格式输送
server.on("request",function(req,resp){
    //【难题1】解决跨域问题：协议 域名 端口其中有一个不同则为跨域 (端口)
    resp.setHeader("Access-Control-Allow-Origin", "*");
    resp.setHeader("Cache-Control","no-cache"); 
    console.log("aaaaaa");

    var currentUrl = req.url;
    if(currentUrl=="/showBlogs"){
        console.log(currentUrl);
                let sql = "select * from blog";
                conn.query(sql,function(err,rows){  //返回的rows是数组
                    if(err)  throw  err;
                    resp.end(JSON.stringify(rows));
                });
                // conn.end();
        
            
    }else if(currentUrl =="/addBlog"){
        console.log(currentUrl);
                let sql = "insert into blog(title,content,categories,author) values(?,?,?,?)";
                req.on("data",function(data){
                    console.log(data.toString());
                    let paramsObj = queryString.parse(data.toString());   //请求参数反序列
                    let params = [paramsObj.title, paramsObj.content,, paramsObj.author];
                    console.log( typeof paramsObj.categories)
                    if(typeof(paramsObj.categories) == "string"){
                        params[2]=paramsObj.categories;
                    }else{
                        params[2]=paramsObj.categories.join(",");
                    }
                    console.log(params);
                    conn.query(sql,params,function(err,rows){ 
                        console.log(rows);
                        if(err)  throw  err;
                    });
                    resp.end("success")

                });
                // conn.end();
                
    }else if(currentUrl =="/singleBlog"){
            console.log(currentUrl);
            let sql = "select * from blog where id = ?";
            req.on("data",function(data){
                console.log(data.toString());
                let paramsObj = queryString.parse(data.toString());   //请求参数反序列

                let params = [paramsObj.id];
                
                conn.query(sql,params,function(err,rows){ 
                    console.log(rows);
                    if(err)  throw  err;
                    resp.end(JSON.stringify(rows));
                });
            });
            // conn.end();
    }else if(currentUrl =="/deleteBlog"){
        console.log(currentUrl);
        let sql = "delete from blog where id = ? ";
        req.on("data",function(data){
            let paramsObj = queryString.parse(data.toString());
            let params = [paramsObj.id];
            conn.query(sql,params,function(err,rows){ 
                if(err)  throw  err;
                return true;
            });
        });
        // conn.end();



    }else  if(currentUrl =="/updateBlog"){
            let sql = "update blog set title=?,content=?,categories = ?,author=? where id = ?";
            req.on("data",function(data){
                let paramsObj = queryString.parse(data.toString());   //请求参数反序列
                console.log(paramsObj)
                let params = [paramsObj.title, paramsObj.content, , paramsObj.author,paramsObj.id];
                if(typeof(paramsObj.categories) == "string"){
                    params[2]=paramsObj.categories;
                }else{
                    params[2]=paramsObj.categories.join(",");
                }
                conn.query(sql,params,function(err,rows){ 
                    if(err)  throw  err;
                    return true;
                });
            });
            // conn.end()
    }else{
        console.log(currentUrl);
        console.log("the request is err");
    }
    
});

//4 启动服务
server.listen(8080,function(){
    console.log("blog后端服务启动，通过：http://localhost:8080");
});
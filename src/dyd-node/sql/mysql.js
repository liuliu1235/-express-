const mysql = require('mysql');
// const  link_mysql={
//     host: 'localhost',  // 新建数据库连接时的 主机名或ID地址 内容
//     user: 'root',//连接名
//     password: 'root', // root 密码
//     database: 'pc', // 数据库名
//     port: '3306',
//     multipleStatements: true    // 多语句查询
// }

// 建立mysql连接池  link_mysql：链接参数  前端传递过来  src\assets\util\lib\config.js
let linkMysql=function(sql,link_mysql) {
    console.log(sql)
    let pool=mysql.createPool(link_mysql);
    return new Promise((rs,rj)=>{
        pool.getConnection((err, connection) => {
            connection.query(sql, [], (err, result) => {
                if(err){
                    rj(err)
                }else{
                    rs(result);
                    connection.release();
                }
            })
        })
    })

}
module.exports =linkMysql

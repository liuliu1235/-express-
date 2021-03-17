const db = {
  mysql:{
    host: 'localhost',  // 新建数据库连接时的 主机名或ID地址 内容
    user: 'root',//连接名
    password: '', // root 密码
    database: 'course', // 数据库名
    port: '3306',
    //multipleStatements: true    // 多语句查询
  },
  mongoDB:'localhost:27017/news'
}

export default function (options) {
  options.$db='mongoDB';
  options.$configDB = db[options.$db]
  options.$isCrypto = false; // 是否加密
}

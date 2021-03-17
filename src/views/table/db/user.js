 const table={
   '数据库名称':'用户信息表',
   ids:'varchar(20) primary key',
   names:'varchar(20) not null',
   username:'varchar(200) not null',
   password:'varchar(200) not null',
   userImg:'varchar(200) ',
   phone:'varchar(200) ',
   prohibit: 'bigInt(20) - 解封号时间', // 解封号时间
}

 export default table

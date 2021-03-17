const table={
  '数据库名称':'新闻信息表',
  ids:'varchar(20) primary key',
  src:'varchar(200) not null',
  name:'varchar(200) not null',
  img:'varchar(200) not null',
  num:'varchar(200) - 浏览量',
  text:'varchar(200000) - 简介',
  content:'varchar(200000) - 详情',
  sortId:'varchar(200) - 分类',
}

export default table

export default [
  {
    path:'/myInfo',
    name:'我的信息',
    component:()=>import('./info'),
  },{
    path:'/speak',
    name:'我的留言',
    component:()=>import('./speak'),
  }


]

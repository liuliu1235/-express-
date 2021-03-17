let menu={
    grade:['普通管理员','超级管理员'],
    //公共
    publicMenu:[
        {
            path:'/admin-user',
            name:'用户管理',
            icon:'el-icon-user',
            children:[
            ]
        },
        {
            path:'/admin-carousel',
            name:'轮播图管理',
            icon:'el-icon-picture-outline',
            //children:[]
        },
      {
        path:'/admin-sort',
        name:'分类管理',
        icon:'el-icon-picture-outline',
      },
        {
            path:'/admin-news',
            name:'新闻管理',
            children:[
            ],
            icon:'el-icon-picture-outline',
        },
        {
            path:'/admin-speak',
            name:'留言管理',
            component: () => import( './speak/index'),
        },
    ],
    '超级管理员':[
        {
            path:'/admin-admin',
            name:'管理员管理',
            icon:'el-icon-user-solid',
            children:[]
        },
      {
        path:'/admin-mysql',
        name:'数据库管理',
        icon:'el-icon-s-order',
        children:[]
      },
    ],
    '普通管理员':[

    ]
}

export default menu

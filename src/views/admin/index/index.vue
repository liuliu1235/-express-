<template>
    <div id="adminIndex">

        <el-container>
            <el-aside :width="menuType.asideWidth" :style="{backgroundColor:menuType.asideBackgroundColor}">
                <el-container>
                    <el-header :height="menuType.menuHeader+'px'" style="padding: 0;overflow: hidden;width: 100%"
                               :style="{

                               }"
                    >
                        <menuAsideHead></menuAsideHead>
                    </el-header>

                    <el-main style="padding: 0;">
                        <menuAside :menuList="menuList"></menuAside>
                    </el-main>
                </el-container>
            </el-aside>

            <el-container>
                <el-header style="box-shadow: 0 1px 4px rgba(0,21,41,.08);padding-left: 0" :height="menuType.menuHeader+'px'" :style="{ backgroundColor: menuType.headBack }">
                    <menuHeader :height="menuType.menuHeader" ></menuHeader>
                </el-header>

                <el-main style="padding-right: 0;min-width: 800px;height:100vh;overflow: auto;"
                         :style="{marginBottom: menuType.menuHeader+'px', backgroundColor: menuType.mainBack}"
                >
                    <keep-alive>
                        <transition name="el-fade-in" >
                            <div style="margin-right: 20px">
                                <router-view v-show="showMain" style="" :style="{paddingBottom:40+Number(menuType.menuHeader)+'px'}"></router-view>
                            </div>
                        </transition>
                    </keep-alive>
                </el-main>
            </el-container>
        </el-container>

    </div>
</template>

<script>
    import menuAsideHead from './menuAsideHead'
    import menuAside from './menuAside'
    import menuHeader from './menuHeader'
    import MenuType from './menuType'
    import menuList from '../menu.js'
    export default {
        name: "index",
        props: [''],
        data() {
            return {
                menuType:MenuType,
                menuList:[...menuList.publicMenu,...menuList[this.$adminInfo().grade]],
                showMain:true,
                myMenu:[]
            }
        },
        methods: {
            /** 有无权限 **/
            async noGrade(){
                if(this.$adminInfo().ids){
                    //console.log(this.menuList)
                }else{
                    this.$routerGo('/admin-login')
                }
            },

            /** 存储我能访问的所有路由 **/
            getMyMenu(arr){
                arr.forEach((val)=>{
                    this.myMenu.push(val.path)
                    if(val.children&&val.children.length>0){
                        this.getMyMenu(val.children)
                    }
                })
            },

            /**  路由守卫 **/
            async menuGrade(){
               // console.log(this.myMenu.indexOf(this.$route.fullPath))
                this.myMenu.indexOf(this.$route.fullPath)<0
                    ?this.$routerGo('/admin-404')
                    :false;
            }
        },
        mounted() {


        },
        computed:{
            adminId(){
                return this.$adminInfo().ids
            },


        },
        created() {
            this.noGrade()
            this.getMyMenu(this.menuList)
        },
        components: {menuHeader,menuAsideHead,menuAside},
        watch: {
            '$route'(){
                this.menuGrade()
                this.showMain=false
                setTimeout(()=>{
                    this.showMain=true
                },100)

            },
            adminId(){
                this.noGrade()
            }
        },
    }
</script>

<style scoped lang='scss'>
    #adminIndex {
        min-width: 500px;
        transform: translate(0%,0%);
        height: 100vh;
        overflow: hidden;
        .transition-box {
            margin-bottom: 10px;
            border-radius: 4px;
            background-color: #409EFF;
            text-align: center;
            color: #fff;
            box-sizing: border-box;

        }
    }
</style>
<style>
  .el-link{
    padding: 5px !important;
  }
</style>

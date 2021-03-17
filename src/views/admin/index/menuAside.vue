<template>
    <div id="menuAside"
         :style="{
                marginBottom:menuType.menuHeader+'px',
                 paddingBottom:menuType.menuHeader+'px'
         }"
    >
        <el-menu :default-active="defaultActive" class="el-menu-vertical-demo"
                 :collapse="menuType.isCollapse"
                 :background-color="menuType.asideBackgroundColor"
                 :text-color="menuType.asideTextColor"
                 :active-text-color="menuType.asideActiveTextColor"
        >
            <span v-for="(item,index) in menuList" :key="index" v-show="item.show!==false">
                <el-submenu  :index="''+index" v-if="item.children&&item.children.length>0">
                    <template slot="title">
                        <div style="margin-right: 5px !important;float: left;width: 24px;text-align: center">
                            <i :class="item.icon||'el-icon-s-help'" ></i>
                        </div>
                        <span slot="title" v-show="!menuType.isCollapse">{{item.name}}</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item
                                @click="navActive(item,index+'-'+id)"
                                v-for="(it,id) in item.children" :key="index+'-'+id" :index="index+'-'+id">{{it.name}}</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>

                <el-menu-item :index="''+index" v-else @click="navActive(item,''+index)">
                    <div style="margin-right: 5px !important;float: left;width: 24px;">
                        <i :class="item.icon||'el-icon-menu'"></i>
                    </div>

                    <span slot="title">{{item.name}}</span>
                </el-menu-item>
            </span>
        </el-menu>
        <div style="width: 100%"
                :style="{
                height:menuType.menuHeader+'px',

         }">

        </div>
    </div>
</template>

<script>
    import menuType from './menuType'

    export default {
        name: "menuAside",
        props: ['menuList'],
        data() {
            return {
                menuType:menuType,
                defaultActive:'0'
            }
        },
        methods: {
            //菜单选中
            navActive(item,key) {
                let navList=key.split('-')
                let path=navList.length===1 //判断是否是一级菜单跳转
                    ? item.path
                    : item.children[navList[1]].path

                this.$adminInfo.prototype.nav({key:key,item:item})  //存取当前点击菜单
                this.$routerGo(path)
            },
            async getDefaultActive(){
                let defaultActive=this.$adminInfo.prototype.nav().key
                try{
                    if(defaultActive){
                        this.defaultActive=defaultActive+''
                        let navList=defaultActive.split('-')
                        let path=navList.length===1 //判断是否是一级菜单跳转
                            ? this.menuList[navList[0]].path
                            : this.menuList[navList[0]].children[navList[1]].path

                        this.$routerGo(path)
                    }else{
                        this.navActive(this.menuList[0],'0')
                    }
                }catch (e) {
                    this.navActive(this.menuList[0],'0')
                }
            }
        },
        mounted() {

        },
        created() {
            this.getDefaultActive()
        },
        components: {},
        computed:{
          query(){
              return JSON.stringify(this.$route.query)
          }
        },
        watch: {
            query(){
                this.$adminInfo.prototype.nav({query:this.$route.query})  //存取当前传值
            }
        },
    }
</script>

<style scoped lang='scss'>
    #menuAside {
        overflow: auto;
        height:100vh;

        .el-menu-vertical-demo:not(.el-menu--collapse) {
            width: 100%;
            min-height: 400px;
        }
        .el-menu{
            border: 0;
            width: 100%;
        }

    }
    ::-webkit-scrollbar-track { /* 定义滚动条轨道  内阴影+圆角*/
        -webkit-box-shadow: inset 0 0 6px #304156;
        background-color: #fff;
    }

    ::-webkit-scrollbar { /*滚动条整体样式*/
        width: 0.4rem;
        background-color: #304156;
        border-radius: 0.2rem;
    }

    ::-webkit-scrollbar-thumb { /*滚动条里面小方块*/
        border-radius: 0.25rem;
        -webkit-box-shadow: inset 0 0 1px #304156;
        background-color: #304156;
    }
</style>
<style lang="scss">
    #menuAside{
        .el-submenu__icon-arrow{
            float: right;
        }
        .el-submenu__title {
            height: 56px;
            line-height: 56px;
            font-size: 14px;
            color: #303133;
            padding: 0 20px;
            list-style: none;
            cursor: pointer;
            position: relative;
            transition: border-color .3s,background-color .3s,color .3s;
            box-sizing: border-box;
            white-space: nowrap;
        }
    }
    .el-menu-item-group__title{
        padding: 0 !important;
    }
</style>

<template>
    <div class="header">
        <img src="@/assets/logo.png" class="logo" >
        <div class="title" @click="$routerGo('/')">
            {{$webTitle}}
        </div>
        <div class="menu">
            <el-tabs v-model="activeName" @tab-click="handleClick()">
                <el-tab-pane
                        v-for="(item,index) in activeList"
                        :key="index"
                        :label="item.label"
                        :name="item.path">
                </el-tab-pane>
            </el-tabs>
        </div>
      <div class="search">
        <div class="input">
          <el-input v-model="search"  placeholder="请输入内容"></el-input>
        </div>
        <el-button @click="handleClick('/home')"><i class="el-icon-search"></i></el-button>
      </div>
      <div class="user">
        <userHeader></userHeader>
      </div>
    </div>
</template>

<script>
  import menuList from "./menuList";
  import userHeader from "./userHeader";
  export default {
    name: 'headers',
    props: [''],
    components: { userHeader },
    data() {
      return {
        activeName:'/home',
        activeList:menuList,
        search:''
      }
    },
    computed: {},
    methods: {
      handleClick(path) {
        console.log();
        this.$routerGo(path || this.activeName,{},()=>{
          setTimeout(()=>{
            this.$bus.$emit('search',this.search)
          },100)
        })
      }
    },
    mounted() {
      let now = this.activeList.filter((val)=>{
        return this.$route.fullPath === val.path
      })
      if(now.length){
        this.activeName=now[0].path
      }else{
        this.activeName=''
      }
    },
    created() {
    },
    watch: {
    }
  }
</script>

<style scoped lang="scss">
    .header {
        width: 100%;
        height: 100%;
        & div{
            float: left;
        }
        .logo{
            width: 40px;
            height: 40px;
            margin: 10px 0;
            float: left;
            display: block;
        }
        .title{
            line-height: 60px;
            font-size: 20px;
            color:#3a3b3e;
            display: inline;
            margin: 0 20px 0 6px;
          cursor: pointer;
        }
        .menu{
            display: inline-block;
            position: relative;
            top:12px

        }
      .search{
        margin-top: 10px;
        margin-left: 30px;
        .el-button{
          border-radius: 0 20px 20px 0;
        }
        .el-input__inner{
        }
        .input {
          float: left;
          display: inline-block;
          position: relative;
          left: 1px;
        }
      }
        .user{
          float: right !important;
        }

    }
</style>
<style lang="scss">
    $mainColor:#ff5c38;
    .header{
        .menu{
            .el-tabs__active-bar{
                height: 0 !important;
                display: none;
            }
            .el-tabs__item{
              font-size: 16px;

            }
            .el-tabs__header{
                margin-bottom: 0;
            }
            .el-tabs__nav-wrap::after{
                height: 0;
            }
            .el-tabs__item:hover{
               // color:$mainColor;
            }
        }
      .search {
        .el-input__inner{
          border-radius: 20px 0 0 20px !important;
        }
      }
    }
</style>


<template>
  <div id="index">
    <div style="width: 300px;float: left;padding: 1rem">
      <el-card style="background-color: #f9f9f9">
        <div style="width: 120px;height: 120px;margin: 0 auto;cursor: pointer">
          <up-img :auto-upload="true" @success="successUp" :src="$userInfo().userImg" :round="true"></up-img>
<!--          <user-image width="120px" height="120px" round="60px" :src="$userInfo().userImg"></user-image>-->
        </div>
        <p style="text-align: center;font-size: 1.8rem"> {{$userInfo().names}}</p>
      </el-card>
      <el-menu
        default-active="0"
        class="el-menu-vertical-demo">
        <el-menu-item v-show="item.show()" v-for="(item,index) in userMenu" :key="index" :index="'10-'+index"
                      @click="!item.path?item.fun():$routerGo(item.path)">
          <i :class="item.icon"></i>
          <span slot="title">{{item.name}}</span>
        </el-menu-item>

      </el-menu>
    </div>
    <div style="padding: 1rem;width: auto;overflow: hidden">
      <div style="width: 100%;">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "index",
    props: [''],
    data() {
      return {
        userMenu:[
          {name:'我的信息',path:'/myInfo',icon:'el-icon-menu',show:()=>{return this.showMenu()}},
          {name:'我的留言',path:'/speak',icon:'el-icon-menu',show:()=>{return this.showMenu()}},
        ]
      }
    },
    methods: {
      showMenu(){
        return this.$userInfo().ids
      },
      adminLogin(){
        let admins=this.$router.resolve({
          path:'/admin-login',
        })

        window.open(admins.href, '_blank')
      },
      successUp(src) {
        console.log(src)
        let cnt={
          $where:{
            ids:this.$userInfo().ids
          },
          $set:{
            userImg:src
          }

        }
        this.$api.up('user',cnt,res=>{
          this.$userInfo({userImg:src})
        })

      }
    },
    mounted() {
      if(!this.$userInfo().ids){
        this.$routerGo('/')
      }
    },
    created() {
    },
    computed:{
      userInfo(){

      }
    },
    components: {},
    watch: {

    },
  }
</script>

<style scoped lang='scss'>
  #index {
    margin-bottom: 20px;
  }
</style>

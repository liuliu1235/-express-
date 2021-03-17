<template>
  <div class="signIn">
    <div class="signIn-title">
      登录
    </div>
    <el-input v-model="ruleForm.username" placeholder="账号">
      <i slot="prefix" class="el-input__icon el-icon-user"></i>
    </el-input>
    <el-input v-model="ruleForm.password" :type="lookPassword ? 'text' : 'password'" placeholder="密码">
      <div slot="suffix" class="el-input__icon" @click="lookPassword = !lookPassword">
        <van-icon :name="lookPassword ?  'closed-eye':'eye-o'"></van-icon>
      </div>
      <i slot="prefix" class="el-input__icon  el-icon-setting"></i>
    </el-input>
    <el-input v-model="inputCode" placeholder="验证码">
      <div slot="suffix" class="code" @click="changeCode">
        {{code}}
      </div>
      <i slot="prefix" class="el-input__icon el-icon-key"></i>
    </el-input>
    <div class="signIn-footer">
      <el-button type="text" style="float: right" @click="$routerGo('/forget')">手机登录</el-button>
    </div>
    <el-button plain type="primary" style="width: calc(50% - 5px)" @click="login"> 登录 </el-button>
    <el-button plain type="success" style="width: calc(50% - 5px)" @click="$routerGo('/signUp')"> 注册 </el-button>
  </div>
</template>

<script>
  export default {
    name: 'signIn',
    props: [''],
    components: {  },
    data() {
      return {
        ruleForm :{
          username:'',
          password:'',
        },
        inputCode:'',
        code:'',
        lookPassword:false,
      }
    },
    computed: {},
    methods: {
      // 刷新验证码
      changeCode() {
        this.$verificationCode.random(call=>{
          this.code = call
        })
      },
      // 登录记录
      async userLogin(){
        let cnt={
          userId:this.$userInfo().ids,
          ids:Date.now(),
          address:window.returnCitySN.cname,
          cid:window.returnCitySN.cid,
          cip:window.returnCitySN.cip
        }
        this.$api.add('loginInfo', cnt,()=>{})
      },
      login() {
        if(this.$verificationCode.equal(this.inputCode)){ // 验证码输入正确
          let form = {
            $where: this.ruleForm
          }
          this.$api.get('user',form,res=>{
            if(res.length){
              this.$userInfo(res[0]) // 存储用户信息
              this.userLogin()   // 登录记录
              this.$routerGo('/')
            }else{
              this.$message.info('账号或密码错误')
              this.ruleForm.username = ''
              this.ruleForm.password = ''
              this.changeCode()
            }
          })
        }else{
          this.$message.info('验证码错误')
          this.changeCode()
        }
      }
    },
    mounted() {
    },
    created() {
      this.changeCode()

    },
    watch: {
    }
  }
</script>

<style scoped lang="scss">
  .signIn {
    box-shadow: -15px 15px 15px rgba(6,17,47,.7);
    transition-property: transform,opacity,box-shadow,top,left;
    -webkit-transition-duration: .5s;
    transition-duration: .5s;
    -webkit-transform-origin: 161px 100%;
    -ms-transform-origin: 161px 100%;
    transform-origin: 161px 100%;
    -webkit-transform: rotateX(0deg);
    transform: rotateX(0deg);
    width: 280px;
    height: 300px;
    position: relative;
    left: 0;
    right: 0;
    margin: auto;
    top: 100px;
    bottom: 0;
    padding: 40px 40px 40px;
    background: #35394a;
    background: -webkit-gradient(linear,left bottom,right top,color-stop(0%,#35394a),color-stop(100%,rgb(0,0,0)));
    background: -webkit-linear-gradient(230deg,rgba(53,57,74,0) 0%,rgb(0,0,0) 100%);
    background: linear-gradient(230deg,rgba(53,57,74,0) 0%,rgb(0,0,0) 100%);
    .signIn-title{
      color: #d3d7f7;
      height: 60px;
      text-align: left;
      font-size: 16px;
    }
    .signIn-footer{
      color: #d3d7f7;
      font-size: 10px;
      text-align: left;
      width: 100%;
      display: inline-block;
    }
    .code {
      line-height: 40px;
      font-size: 18px;
    }
  }
</style>
<style lang="scss">
  $bg:#283443;
  $light_gray:#fff;
  $cursor: #fff;
  .signIn{
    .el-input {
      .el-input__inner{
        color:$cursor !important;
        background-color: transparent !important;
      }
      height: 47px;
      input {
        background-color: transparent !important;
        border: 0;
        -webkit-appearance: none;
        caret-color: $cursor;

        &:-webkit-autofill {
          box-shadow: 0 0 0 1000px $bg inset !important;
          -webkit-text-fill-color: $cursor !important;
        }
      }
    }
  }
</style>


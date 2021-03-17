<template>
  <div class="signIn">
    <div class="signIn-title">
      注册
    </div>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" :inline-message="true">
      <el-form-item prop="username">
        <el-input autocomplete="new-password" v-model="ruleForm.username" placeholder="账号">
          <i slot="prefix" class="el-input__icon el-icon-user"></i>
        </el-input>
      </el-form-item>

      <el-form-item prop="password">
        <el-input autocomplete="new-password" v-model="ruleForm.password" :type="lookPassword ? 'text' : 'password'" placeholder="密码">
          <div slot="suffix" class="el-input__icon" @click="lookPassword = !lookPassword">
            <van-icon :name="lookPassword ?  'closed-eye':'eye-o'"></van-icon>
          </div>
          <i slot="prefix" class="el-input__icon  el-icon-setting"></i>
        </el-input>
      </el-form-item>

      <el-form-item prop="validatePass">
        <el-input v-model="ruleForm.validatePass" :type="lookPassword ? 'text' : 'password'" placeholder="确认密码">
          <div slot="suffix" class="el-input__icon" @click="lookPassword = !lookPassword">
            <van-icon :name="lookPassword ?  'closed-eye':'eye-o'"></van-icon>
          </div>
          <i slot="prefix" class="el-input__icon  el-icon-setting"></i>
        </el-input>
      </el-form-item>

      <el-form-item prop="phone">
        <el-input :disabled="!sendOut" type="number" v-model.number="ruleForm.phone" placeholder="手机">
          <i slot="prefix" class="el-input__icon el-icon-mobile"></i>
        </el-input>
      </el-form-item>

      <el-form-item>
        <el-input  v-model="phoneCode" placeholder="短信验证码" v-show="/^[1][3,4,5,7,8,9][0-9]{9}$/.test(this.ruleForm.phone)">
          <div slot="suffix" style="line-height: 40px" @click="">
            <span v-if="sendOut" @click="sendOut = !sendOut" style="cursor: pointer">发送</span>
            <van-count-down
              style="line-height: 40px;color:#fff"
              v-else
              ref="countDown"
              millisecond
              :time="60 * 1000"
              :auto-start="true"
              format="ss s"
              @finish="sendOut =! sendOut"
            />
          </div>
          <i slot="prefix" class="el-input__icon el-icon-key"></i>
        </el-input>
      </el-form-item>

      <el-form-item >
        <el-input  v-model="inputCode" placeholder="验证码">
          <div slot="suffix" class="code" @click="changeCode">
            {{code}}
          </div>
          <i slot="prefix" class="el-input__icon el-icon-key"></i>
        </el-input>
      </el-form-item>
    </el-form>


    <div class="signIn-footer">
      <el-button type="text" style="float: right">忘记密码？</el-button>
    </div>
    <el-button plain type="success" style="width: calc(50% - 5px)" @click="signUp"> 注册 </el-button>
    <el-button plain type="primary" style="width: calc(50% - 5px)" @click="$routerGo('/signIn')"> 登录 </el-button>
  </div>
</template>

<script>
  export default {
    name: 'signIn',
    props: [''],
    components: {  },
    data() {
      const validatePass = (rule, value, callback) => {
        if (value !== this.ruleForm.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm :{
          username:'',
          password:'',
          validatePass:'',
          phone:'',
          prohibit:0,
          userImg:''
        },
        rules:{
          username: [
            { required: true, message: '请填写账号', trigger: 'blur' },
            { validator: this.$rules.username, trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请填写密码', trigger: 'blur' },
            { validator: this.$rules.username, trigger: 'blur' }
          ],
          validatePass: [
            { required: true, message: '请再次填写密码', trigger: 'blur' },
            { validator: validatePass, trigger: 'blur' }
          ],
          phone: [
            { required: true, message: '请填手机号', trigger: 'blur' },
            { validator: this.$rules.phone, trigger: 'blur' }
          ],
        },
        phoneCode:'',
        inputCode:'',
        code:'',
        lookPassword:false,
        sendOut: true
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
      signUp() {
        this.$rules.ver.bind(this)('ruleForm')
          .then(()=>{
            if(this.$verificationCode.equal(this.inputCode)){
              if(this.phoneCode === '1234'){
                this.$api.get('user',{$where:{username:this.ruleForm.username}},r=>{
                  if(!r.length){
                    this.$api.get('user',{$where:{phone:this.ruleForm.phone}},r=>{
                      if(!r.length){
                        delete this.ruleForm.validatePass
                        this.ruleForm.ids = Date.now()
                        this.ruleForm.names = '游客'+Date.now()
                        this.$api.add('user',this.ruleForm,res=>{
                          if(res){
                            this.$userInfo(this.ruleForm)
                            this.$routerGo('/')
                          }else{
                            this.changeCode()
                          }
                        })
                      }else{
                        this.$message.info('该手机号已被注册')
                        this.changeCode()
                      }
                    })
                  }else{
                    this.$message.info('该账号已被注册')
                    this.changeCode()
                  }
                })
              }else{
                this.$message.info('短信验证码错误')
              }
            }else{
              this.$message.info('验证码错误')
              this.changeCode()
            }
          })
          .catch(()=>{
            this.$message.info('请输入完整')
          })
      }
    },
    mounted() {
    },
    created() {
      this.changeCode()

    },
    watch: {
      sendOut(news) {
        if(!news){
          this.$message.success('验证码发送成功，是1234')
        }
      }
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
    .el-form-item{
      margin-bottom: 0;
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
      input::-webkit-outer-spin-button,
      input::-webkit-inner-spin-button {
        -webkit-appearance: none;
      }
      input[type="number"]{
        -moz-appearance: textfield;
      }
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
    .el-form-item__error--inline,.el-form-item__error{
      z-index: -1;
      position: absolute !important;
      top: 10px;
      left: 130px !important;
    }
  }
</style>


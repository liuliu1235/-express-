<template>
  <div id="boxss">
    <div style="width: 400px;margin: 0 auto;height: 500px;padding: 20px ">
      <div style="text-align: center;font-size: 1.6rem">修改个人信息</div>
      <!--<div style="width: 122px;height: 122px;margin: 0 auto">-->
        <!--<up-img :auto-upload="true" :src="$userInfo().userImg" @success="success"></up-img>-->
      <!--</div>-->

      <el-form  :model="userInfo" :rules="rules" ref="ruleForm" label-width="60px" class="demo-ruleForm">
        <el-form-item label="账号">
          {{userInfo.username}}
        </el-form-item>
        <el-form-item label="手机">
          {{userInfo.phone}}
        </el-form-item>
        <el-form-item label="昵称" prop="names">
          <el-input v-model="userInfo.names"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="userInfo.password"></el-input>
        </el-form-item>
      </el-form>
      <el-button type="danger" style="width: 100%;margin-top: 30px;margin-bottom: 50px"  @click="update" plain round>修改</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "myInfo",
    props: [''],
    data() {
      return {
        userInfo:this.$JSP(this.$userInfo()),
        rules: {
          names: [
            { required: true, message: '请填写昵称', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请填写密码', trigger: 'blur' },
            { validator: this.$rules.username, trigger: 'blur' }
          ],
        },
        userImg:'',
        imageUrl:this.$userInfo().userImg?this.$nodeUrl+'file/getImg?imagePath='+this.$userInfo().userImg:''

      }
    },
    methods: {
      update(){
        this.$ver(this.$refs.ruleForm).then(r=>{
          this.upUser(this.userInfo)
        }).catch(f=>{
          this.$message.error('请填写完整')
        })
      },
      upUser(cnt){
        this.$api.up('user',cnt,res=>{
          if(res) {
            this.$userInfo(this.userInfo)
            console.log(this.userInfo)
          }
        })
      },
      success(path){

        this.userInfo.userImg = path
      }
    },
    mounted() {
    },
    created() {
    },
    computed:{
      userIn: {
        get() {
          return JSON.stringify(this.$userInfo())
        },
      }
    },
    watch: {
      userIn (){
        this.userInfo = this.$JSP(this.$userInfo())
      }
    }
  }
</script>

<style scoped lang='scss'>
  #boxss {
    .el-tabs--left .el-tabs__header.is-left{
      width: 100%;
    }

  }
</style>

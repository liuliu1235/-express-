<template>
    <div id="info">
                <el-row style="position: relative;top:15px" id="">
                    <el-col :span="24">
                        <up-img :round="true" :src="ruleForm.userImg" :auto-upload="true" @success="success" style="float: left"></up-img>
                        <div style="font-size: 30px;margin-top: 40px">
                            {{ruleForm.names}}
                        </div>
                        <div style="float: left;margin-top: 20px;margin-right: 15px">

                                账号: {{ruleForm.username}}
                        </div>
                        <div style="margin-top: 20px;">
                                权限: {{ruleForm.grade}}
                        </div>
                    </el-col >
                </el-row>

            <el-divider></el-divider>

        <dyd-form :ruleForm="ruleForm" :rules="rules" labelPosition="left" label-width="100px" ref="dydForm" @submit="submit()">
            <!--<el-form-item label="账号">-->
                <!--{{ruleForm.username}}-->
                <!--&lt;!&ndash;<el-input v-model="ruleForm.username" :disabled="true"></el-input>&ndash;&gt;-->
            <!--</el-form-item>-->
            <!--<el-form-item label="权限">-->
                <!--{{ruleForm.grade}}-->
                <!--&lt;!&ndash;<el-input v-model="ruleForm.grade" :disabled="true"></el-input>&ndash;&gt;-->
            <!--</el-form-item>-->
            <el-form-item label="昵称" prop="names">
                <el-input v-model="ruleForm.names"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="ruleForm.password"></el-input>
            </el-form-item>
            <el-form-item label="手机" prop="phone">
                <el-input v-model="ruleForm.phone"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
                <el-input v-model="ruleForm.email"></el-input>
            </el-form-item>
        </dyd-form>
        <el-button style="width: 100%;" type="primary"   @click="$refs.dydForm.submitForm()">修改资料</el-button>
    </div>
</template>

<script>

    export default {
        name: "info",
        props: [''],
        data() {
            return {
                ruleForm:this.$JSP(this.$adminInfo()),
                rules:{
                    names: [
                        {  message: '请填写昵称', trigger: 'blur' }
                    ],
                    password: [
                        {  validator: this.$rules.username, trigger: 'blur'  },
                    ],
                    grade:[
                        {  message: '请选择权限', trigger: 'blur' }
                    ],
                    idcard:[
                        {  validator: this.$rules.idCard, trigger: 'blur'  },
                    ],
                    phone:[
                        {  validator: this.$rules.phone, trigger: 'blur'  },
                    ],
                    email:[
                        {  validator: this.$rules.email, trigger: 'blur'  },
                    ]
                }
            }
        },
        computed:{

        },
        methods: {
            success(path){
                this.ruleForm.userImg=path
            },
            submit(){
                this.$api.up('admin',this.ruleForm,res=>{
                    this.$adminInfo(this.ruleForm)
                })
            }
        },
        mounted() {
            console.log(this.ruleForm)
        },
        created() {
        },
        components: {},
        watch: {},
    }
</script>

<style scoped lang='scss'>
    #info {
        #rows{
            background-image: url("../../../assets/bg.jpg");
        }

       // margin-top: 60px;
        width: 40%;
        margin-left: 25%;
        .el-form-item__label{
            font-size: 4rem !important;
        }
    }
</style>
<style  lang='scss'>
    #info {
        .el-form-item__label{
            font-size: 1.6rem !important;
        }
        .el-form-item{
            margin-bottom: 30px;
        }
        .avatar-uploader{
           // margin-left: -120px;
            width: 180px;
        }
    }
</style>

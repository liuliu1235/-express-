<template>
    <div id="index">
        <dyd-dialog width="400px" ref="dialog" :title="(updates?'修改':'新增')+'管理员'">
            <dyd-form ref="dydForm" label-width="60px" :ruleForm="ruleForm" :rules="rules" @submit="submit">
                <el-form-item label="权限" prop="grade">
                    <el-select v-model="ruleForm.grade" placeholder="请选择">
                        <el-option
                                v-for="(item,index) in gradeList"
                                :key="index"
                                :value="item">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="账号" prop="username" v-if="!updates">
                    <el-input v-model="ruleForm.username"></el-input>
                </el-form-item>
                <el-form-item label="昵称" prop="names">
                    <el-input v-model="ruleForm.names"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password" v-if="updates">
                    <el-input v-model="ruleForm.password"></el-input>
                </el-form-item>
            </dyd-form>
            <div style="float: right;display: block" >
                <el-button plain type="info" plain @click="$refs.dydForm.resetForm();">清除</el-button>
                <el-button  type="primary" @click="$refs.dydForm.submitForm();">提交</el-button>
            </div>
            <div style="width: 100%;height: 40px"></div>
        </dyd-dialog>
        <div style="margin-bottom: 20px">
            <el-button  type="primary" round plain @click="updates=false;ruleForm=$JSP(form);$refs.dialog.openDia();">添加管理员</el-button>
        </div>
        <dyd-table :data="tableData">
            <el-table-column type="expand" label="展开" width="50">
                <template slot-scope="scope">
                    <expand :adminId="scope.row.ids"></expand>
                </template>
            </el-table-column>
            <el-table-column
                    width="80"
                    label="头像">
                <template slot-scope="scope">
                    <user-image size="60px" :src="scope.row.userImg"></user-image>
                </template>
            </el-table-column>
            <el-table-column
                    prop="names"
                    label="姓名">
            </el-table-column>
            <el-table-column
                    prop="username"
                    label="账号 ">
            </el-table-column>
            <el-table-column
                    prop="password"
                    label="密码 ">
            </el-table-column>
            <el-table-column
                    prop="grade"
                    label="权限 ">
            </el-table-column>
            <el-table-column
                    prop="phone"
                    label="手机号 "
            >
            </el-table-column >
            <el-table-column
                    prop="email"
                    label="email ">
            </el-table-column>
            <el-table-column
                    width="160"
                    label="操作">
                <template slot-scope="scope">
                    <dydLink  type="up" @click.native="updates=true;ruleForm=$JSP(scope.row);$refs.dialog.openDia();index=scope.$index">修改</dydLink>
                    <dydLink  type="del"   @click.native="deleteAdmin(scope.row,scope.$index)">删除</dydLink>
                </template>
            </el-table-column>
        </dyd-table>
    </div>
</template>
<script>
    import menu from '../menu'
    import expand from './expand'
    export default {
        name: "index",
        props: [''],
        data() {
            return {
                tableData:[],
                ruleForm:{},
                updates:false,
                index:'',
                gradeList:menu.grade,
                form:{
                    username:'',
                    names:'',
                    grade:'',
                    phone:'',
                    email:'',
                },
                rules:{
                    username: [
                        { required: true, validator: this.$rules.username, trigger: 'blur'  },
                    ],
                    names: [
                        { required: true, message: '请填写昵称', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, validator: this.$rules.username, trigger: 'blur'  },
                    ],
                    grade:[
                        { required: true, message: '请选择权限', trigger: 'blur' }
                    ],
                }
            }
        },
        methods: {
            submit(){
                let cnt=this.$JSP(this.ruleForm)
                if(!this.updates){
                    cnt.ids=Date.now()
                    cnt.password=cnt.username
                    cnt.userImg=''
                    cnt.grade='普通管理员'
                    this.$api.get('admin',{$where:{
                            username:cnt.username
                        }},r=>{
                        if(r.length>0){
                            this.$message.info('已有此账号')
                        }else{
                            this.$api.add('admin',cnt,res=>{
                                this.tableData.splice(0,0,cnt)
                                this.$message.success('默认密码为账号')
                                this.$refs.dialog.closeDia()
                            })
                        }
                    })

                }else{
                    this.$api.up('admin',cnt,res=>{
                        this.tableData.splice(this.index,1,cnt)
                        this.$refs.dialog.closeDia()
                    })
                }
            },
            deleteAdmin(row,index){
                this.$api.del('admin',{ids:row.ids},res=>{
                    this.tableData.splice(index,1)
                })
            }
        },
        mounted() {
        },
        created() {
            this.$api.get('admin',{$orderBY: {col:'ids'}},res=>{
                this.tableData=res
            })

        },
        components: {expand},
        watch: {},
    }
</script>

<style scoped lang='scss'>
    #index {

    }
</style>

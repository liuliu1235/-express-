<template>
    <div id="index">
        <dyd-dialog width="400px" ref="dialog" :title="(updates?'修改':'新增')+'轮播图'">
            <dyd-form ref="dydForm" label-width="80px" :ruleForm="ruleForm" :rules="rules" @submit="submit">
                <el-form-item label="图片" prop="image">
                    <up-img :auto-upload="true" @success="success" :src="ruleForm.image"></up-img>
                </el-form-item>
                <el-form-item label="跳转地址" prop="url">
                    <el-input v-model="ruleForm.url"  placeholder="不填则不跳转"></el-input>
                    <div style="color: #969799">http:// 或 https:// 开头</div>
                </el-form-item>

            </dyd-form>
            <div style="float: right;display: block" >
                <el-button plain type="info" plain @click="$refs.dydForm.resetForm();">清除</el-button>
                <el-button  type="primary" @click="$refs.dydForm.submitForm();">提交</el-button>
            </div>
            <div style="width: 100%;height: 40px"></div>
        </dyd-dialog>
        <div style="margin-bottom: 20px">
            <el-button   type="primary" round plain @click="updates=false;ruleForm=$JSP(form);$refs.dialog.openDia();">添加轮播图</el-button>
        </div>
        <dyd-table :data="tableData">
            <el-table-column
                    label="图片">
                <template slot-scope="scope">
                    <user-image size="80px"  :src="scope.row.image"></user-image>
                </template>
            </el-table-column>
            <el-table-column
                    prop="url"
                    label="跳转地址">
                <template slot-scope="scope">
                    <a :href="scope.row.url" target="_Blank">{{scope.row.url}}</a>
                </template>
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
    export default {
        name: "index",
        props: [''],
        data() {
            return {
                updates:false,
                form:{
                    image:'',
                    url:''
                },
                ruleForm:{},
                rules:{
                    image: [
                        { required: true, message: '请选择图片', trigger: 'blur' }
                    ],
                    url:[
                        {  validator: this.$rules.url, trigger: 'blur'  },
                    ]
                },
                tableData:[]
            }
        },
        methods: {
            success(path){
                this.ruleForm.image=path
            },
            submit(){
                let cnt=this.$JSP(this.ruleForm)
                if(!this.updates){
                    cnt.ids=Date.now()
                    this.$api.add('carousel',cnt,res=>{
                      this.getData()
                        this.$refs.dialog.closeDia()
                    })

                }else{
                    this.$api.up('carousel',cnt,res=>{
                      this.getData()
                        this.$refs.dialog.closeDia()
                    })
                }
            },
            deleteAdmin(row,index){
                this.$api.del('carousel',row,res=>{
                  this.getData()
                })
            },
          getData() {
            this.$api.get('carousel',{$orderBY: {col:'ids'}},res=>{
              this.tableData=res
            })
          }
        },
        mounted() {
        },
        created() {
           this.getData()
        },
        components: {},
        watch: {},
    }
</script>

<style scoped lang='scss'>
    #index {

    }
</style>

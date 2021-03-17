<template>
  <div id="index">
    <dyd-dialog width="500px" ref="dialog" :title="(updates?'修改':'新增')+'留言'">
      <dyd-form ref="dydForm" label-width="80px" :ruleForm="ruleForm" :rules="rules" @submit="submit">
        <el-form-item label="留言" prop="text">
          <el-input v-model="ruleForm.text" type="textarea" :rows="10"  placeholder="请填写留言"></el-input>
        </el-form-item>
      </dyd-form>
      <div style="float: right;display: block" >
        <el-button plain type="info" plain @click="$refs.dydForm.resetForm();">清除</el-button>
        <el-button  type="primary" @click="$refs.dydForm.submitForm();">提交</el-button>
      </div>
      <div style="width: 100%;height: 40px"></div>
    </dyd-dialog>
    <div style="margin-bottom: 20px">
      <el-button   type="primary" round plain @click="updates=false;ruleForm=$JSP(form);$refs.dialog.openDia();">添加留言</el-button>
    </div>
    <dyd-table :data="tableData">
      <el-table-column  label="留言时间">
        <template slot-scope="scope">
          {{$Time(scope.row.ids).getTime()}}
        </template>
      </el-table-column>
      <el-table-column
          prop="text"
          label="留言信息">
      </el-table-column>
      <el-table-column
          prop="speak"
          label="回复">
      </el-table-column>
      <el-table-column
          width="160"
          label="操作">
        <template slot-scope="scope">
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
        text:'',
        speak:'',
        userId: this.$userInfo().ids
      },
      ruleForm:{},
      rules:{
        text: [
          { required: true, message: '请填写留言', trigger: 'blur' }
        ],
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
        this.$api.add('speak',cnt,res=>{
          this.tableData.splice(0,0,cnt)
          this.$refs.dialog.closeDia()
        })

      }else{
        this.$api.up('speak',cnt,res=>{
          this.tableData.splice(this.index,1,cnt)
          this.$refs.dialog.closeDia()
        })
      }
    },
    deleteAdmin(row,index){
      this.$api.del('speak',row,res=>{
        this.tableData.splice(index,1)
      })
    }
  },
  mounted() {
  },
  created() {
    this.$api.get('speak',{$orderBY: {col:'ids'}, $where:{
        userId: this.$userInfo().ids
      }},res=>{
      this.tableData=res
    })
  },
  components: {},
  watch: {},
}
</script>

<style scoped lang='scss'>
#index {

}
</style>

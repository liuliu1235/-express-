<template>
  <div id="index">
    <dyd-dialog width="600px" ref="dialog" :title="(updates?'修改':'新增')+'新闻'">

      <dyd-form ref="dydForm" label-width="80px" :ruleForm="ruleForm" :rules="rules" @submit="submit">
        <el-form-item label="图片">
          <up-img :auto-upload="true" @success="success" :src="ruleForm.img"></up-img>
        </el-form-item>
        <el-form-item label="名称" prop="name">
          <el-input v-model="ruleForm.name"  placeholder="名称"></el-input>
        </el-form-item>
        <el-form-item label="分类" prop="sortId">
          <el-select v-model="ruleForm.sortId" placeholder="请选择">
            <el-option
              v-for="item in sortData"
              :key="item.ids"
              :label="item.names"
              :value="item.ids">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="简介" prop="text">
          <el-input v-model="ruleForm.text"  ></el-input>
        </el-form-item>
        <el-form-item label="视频">
          <div style="width: 240px">
            <up-video :auto-upload="true" @success="src => ruleForm.src = src" :src="ruleForm.src"></up-video>
          </div>
        </el-form-item>
        <el-form-item label="教程详情">
          <quill-editor
            style="height: 300px;display: inline-block"
            v-model="ruleForm.content"
            ref="myQuillEditor"
            :options="{}">
          </quill-editor>
        </el-form-item>
<!--        <el-form-item label="价格" prop="price">-->
<!--          <el-input-number v-model="ruleForm.price" :step="1" :min="0"></el-input-number>-->
<!--          <span>0元即免费</span>-->
<!--        </el-form-item>-->
      </dyd-form>
      <div style="float: right;display: block" >
        <el-button plain type="info" plain @click="$refs.dydForm.resetForm();">清除</el-button>
        <el-button  type="primary" @click="$refs.dydForm.submitForm();">提交</el-button>
      </div>
      <div style="width: 100%;height: 40px"></div>
    </dyd-dialog>
    <div style="margin-bottom: 20px">
      <el-button   type="primary" round plain @click="updates=false;ruleForm=$JSP(form);$refs.dialog.openDia();">添加新闻</el-button>
      <el-select v-model="sortId" placeholder="请选择" @change="getData(sortId)" style="margin-left: 20px">
        <el-option
            label="全部"
            value="">
        </el-option>
        <el-option
            v-for="item in sortData"
            :key="item.ids"
            :label="item.names"
            :value="item.ids">
        </el-option>
      </el-select>
    </div>
    <dyd-table :data="tableData">
      <el-table-column type="expand" label="详情" width="50">
        <template slot-scope="scope">
         <info :scope="scope"></info>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="名称">
      </el-table-column>
      <el-table-column
        prop="sortName"
        label="分类">
        <template slot-scope="scope">
          {{( sortData.filter(item=> item.ids == scope.row.sortId)[0] || {} ).names}}
        </template>
      </el-table-column>
      <el-table-column
        prop="text"
        label="简介">
      </el-table-column>
      <el-table-column
        label="展示图片">
        <template slot-scope="scope">
          <user-image size="80px"  :src="scope.row.img"></user-image>
        </template>
      </el-table-column>
      <el-table-column
        width="300"
        label="视频">
        <template slot-scope="scope">
          <dyd-video v-if="scope.row.src" :src="scope.row.src"></dyd-video>
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
  import Vue from 'vue'
  import VueQuillEditor from 'vue-quill-editor'
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import 'quill/dist/quill.bubble.css'
  import Comment from "./comment";
  import Info from "./info";
  Vue.use(VueQuillEditor)
  export default {
    name: "index",
    props: [''],
    data() {
      return {
        sortData: [],
        sortId: null,
        updates:false,
        form:{
          img:'',
          src:'',
          name:'',
          content:'',
          num:0
        },
        ruleForm:{},
        rules:{
          img: [
            { required: true, message: '请选择图片', trigger: 'blur' }
          ],
          src: [
            { required: true, message: '请选择视频', trigger: 'blur' }
          ],
          name:[
            {  required: true, message: '请输入名称', trigger: 'blur'  },
          ],
          sortId:[
            {  required: true, message: '请选择分类', trigger: 'blur'  },
          ],
        },
        tableData:[]
      }
    },
    methods: {
      success(path){
        this.ruleForm.img=path
      },
      submit(){
        let cnt=this.$JSP(this.ruleForm)
        cnt.content =  cnt.content.replace(/\"/g,"'")
        if(!this.updates){
          cnt.ids=Date.now()
          this.$api.add('news',cnt,res=>{
            this.getData()
            this.$refs.dialog.closeDia()
          })

        }else{
          this.$api.up('news',cnt,res=>{
            this.getData()
            this.$refs.dialog.closeDia()
          })
        }
      },
      deleteAdmin(row,index){
        this.$api.del('news',{id:row.id},res=>{
          this.getData()
        })
      },
      getData(sortId) {
        let cnt = {
          $orderBY: {col:'ids'},
          $link:{
            table:'sort',
            left:'sortId',
            right:'sortId',
            where:'ids as sortId, names as sortName'
          }
        }
        if(sortId){
          cnt.$where = {
            sortId
          }
        }
        this.$api.get('news',cnt,res=>{
          this.tableData=res
        })
      },
      getSort() {
        this.$api.get('sort',{},res=>{
          this.sortData=res
        })
      },
    },
    mounted() {
      this.getData()
      this.getSort()
    },
    created() {

    },
    components: {Info, Comment},
    watch: {},
  }
</script>

<style scoped lang='scss'>
  #index {

  }
</style>

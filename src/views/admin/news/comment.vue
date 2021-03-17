<template>
  <div class="comment">
    <dyd-table :data="tableData">
      <el-table-column prop="text" label="内容"></el-table-column>
      <el-table-column prop="userId" label="用户Id"></el-table-column>
      <el-table-column prop="userNames" label="用户名"></el-table-column>
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column  label="评论时间">
        <template slot-scope="scope">
          {{$Time(scope.row.ids).getTime()}}
        </template>
      </el-table-column>
      <el-table-column
        v-if="!noShow"
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
    name: 'comment',
    props: ['blobId','noShow'],
    components: {},
    data() {
      return {
        tableData:[]
      }
    },
    computed: {},
    watch: {},
    mounted() {
      console.log(this.$attrs,this.blobId);
      this.getData()

    },
    created() {
    },
    methods: {
      getData() {
        let cnt = {
          $where:{
            blogId:this.blobId
          },
          $link:{
            table:'user',
            left:'userId',
            right:'userId1',
            where:'ids as userId1, names as userNames',
          }
        }
        console.log(cnt);
        this.$api.get('Comment',cnt,res=>{
          if(res) this.tableData=res
        })
      },
      deleteAdmin(row){
        this.$api.del('comment',{ids: row.ids},()=>{
          this.$message.success('删除成功')
          this.getData()
        })
      }
    },
  }
</script>

<style scoped lang="scss">
  .comment {
  }
</style>


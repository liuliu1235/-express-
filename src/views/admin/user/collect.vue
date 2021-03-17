<template>
  <div class="collect">
    <dyd-table :data="tableData">
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column prop="text" label="内容"></el-table-column>
      <el-table-column  label="收藏时间">
        <template slot-scope="scope">
          {{$Time(scope.row.ids).getTime()}}
        </template>
      </el-table-column>
    </dyd-table>
  </div>
</template>

<script>
  export default {
    name: 'collect',
    props: ['userId'],
    components: {},
    data() {
      return {
        tableData: []
      }
    },
    computed: {},
    watch: {},
    mounted() {
      this.getVideo()
    },
    created() {
    },
    methods: {
      async getVideo(){
        let cnt= {
          $where:{
            userId: this.userId
          },
          $link:{
            table:'news',
            left:'videoId',
            right:'videoId',
            where:'*, ids as videoId'
          }
        }
        this.$api.get('collect',cnt,res=>{
          res.map(item=>{
            item.ids = item.videoId
          })
          this.tableData=res
        })
      }
    },
  }
</script>

<style scoped lang="scss">
  .collect {
  }
</style>


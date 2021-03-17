<template>
    <div class="index">
        <el-container>
            <el-header height="60px">
                <headers></headers>
            </el-header>

            <el-main>
                <right></right>
                <router-view></router-view>
            </el-main>

            <el-footer>
                <footers></footers>
            </el-footer>
        </el-container>
    </div>
</template>

<script>
    import headers from "./header";
    import footers from "./footer";
    import right from "./right";
  export default {
    name: 'index',
    props: [''],
    components: {headers,footers,right},
    data() {
      return {}
    },
    computed: {},
    methods: {},
    mounted() {
    },
    created() {
    },
    watch: {
    }
  }
</script>

<style scoped lang="scss">
    .index {
        .el-header{
            width: 100%;
          background-color: #f7f8fa;
          border-bottom: 1px solid #eeeeee;
        }
        .el-main{
          min-height: calc(100vh - 120px);
          width: 100%;
          padding: 0 0;
          margin: 0 0;
        }
      .el-footer{
        padding: 0;
        z-index: 10;
      }
    }
</style>


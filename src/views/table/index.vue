<template>
    <div id="index">
        <tables :table="table"></tables>
    </div>
</template>

<script>
    import tables from './tables'
    export default {
        name: "index",
        props: [''],
        data() {
            return {
                table:[]
            }
        },
        methods: {},
        mounted() {
        },
        created() {
            const requireComponent = require.context('./db',false,/\.js$/)//获取db下所有js
            requireComponent.keys().forEach(fileName => {
                // 获取组件配置
                let tableConfig = requireComponent(fileName)
                //文件名
                let name=fileName.split('.')[1].split('/')[1]

                this.table.push({table:tableConfig.default,name:name})
            })
          this.$message('本页面为调试时对数据库操作，请勿随意更改');
        },
        components: {tables},
        watch: {},
    }
</script>

<style scoped lang='scss'>
    #index {
        padding: 3%;
    }
</style>

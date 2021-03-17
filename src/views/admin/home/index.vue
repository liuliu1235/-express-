<template>
    <div id="index">
        <el-row>
            <el-col :span="12">
                <el-carousel :interval="2000"  height="300px">
                    <el-carousel-item v-for="(item,index) in tableData" :key="index">
                        <a :href="item.url" target="_Blank" v-if="item.url">
                            <user-image :src="item.image" width="500"  height="300"></user-image>
                        </a>
                        <user-image v-else :src="item.image" width="500"  height="300"></user-image>
                    </el-carousel-item>
                </el-carousel>
            </el-col>
            <el-col :span="12">

            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "index",
        props: [''],
        data() {
            return {
                tableData:[]
            }
        },
        methods: {},
        mounted() {
        },
        created() {

            this.$api.get('carousel',{},res=>{
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

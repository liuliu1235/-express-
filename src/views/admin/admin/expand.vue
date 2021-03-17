<template>
    <div id="expand">
        <dyd-table :data="tableData" :border="false" nextPageButtonType="text">
            <el-table-column
                    prop="ids"
                    label="ID">
            </el-table-column>
            <el-table-column
                    label="登陆时间">
                <template slot-scope="scope">
                    {{$Time(scope.row.ids).getTime()}}
                </template>
            </el-table-column>
            <el-table-column
                    prop="address"
                    label="登陆城市">
            </el-table-column>
            <el-table-column
                    prop="cid"
                    label="城市ID">
            </el-table-column>
            <el-table-column
                    prop="cip"
                    label="登陆IP">
            </el-table-column>
        </dyd-table>
    </div>
</template>

<script>
    export default {
        name: "expand",
        props: ['adminId'],
        data() {
            return {
                tableData:[]
            }
        },
        methods: {
            async getAdminLogin(){
                let cnt={
                    $orderBY: {col:'ids'},
                    $where:{
                        userId:this.adminId
                    },
                }
                this.$api.get('loginInfo',cnt,res=>{
                    this.tableData=res
                })
            }
        },
        activated(){

        },
        mounted() {
            console.log(window.returnCitySN)

        },
        created() {
            this.getAdminLogin()
        },
        components: {},
        watch: {},
    }
</script>

<style scoped lang='scss'>
    #expand {

    }
</style>
<style  lang='scss'>
    #expand {
        .el-table td, .el-table th.is-leaf{
            border-bottom: 0;
        }
        .el-table--border th, .el-table__fixed-right-patch{
            border-bottom: 0 !important;
        }
        .el-table--border td, .el-table--border th, .el-table__body-wrapper .el-table--border.is-scrolling-left~.el-table__fixed{
            border-right: 0;
        }
        #nextPage{
            float: right;
            .el-button{
                border: 0;
            }
        }
    }
</style>

<template>
    <div id="dydTable">
        <el-table stripe :data="data.slice((value-1)*10,value*10)" :border="border">
            <el-table-column
                    width="50"
                    label="#">
                <template slot-scope="scope">
                    {{(value-1)*10+scope.$index+1}}
                </template>
            </el-table-column>
            <slot></slot>
        </el-table>
        <next-page v-show="(data.length /count) > 1" :count="count" :nextPageButtonType="nextPageButtonType" :table="data" @change="changePage" style="margin: 30px auto;"></next-page>
    </div>
</template>

<script>
    export default {
        name: "dydTable",
        props: {
            data:{
                default:[]
            },
            border:{
                default:true,
                type:Boolean
            },
            tableRowClassName:{
                /**着重行  默认隔一行   */
                type: Function,
                default: function(event){
                    let {row,rowIndex} = event
                    if (rowIndex %2 === 1) {
                        return 'warning-row';
                    } else {
                        return '';
                    }
                    return '';
                }
            },
            nextPageButtonType:{
                type:String,
                default:'primary'
            },


        },
        data() {
            return {
                tableData:[],
                value:1,
                count:10
            }
        },
        methods: {
            changePage(value){
                this.value=value
            }
        },
        mounted() {
        },
        created() {
        },
        components: {},
        watch: {},
    }
</script>

<style  lang='scss'>
    #dydTable {
        .el-table thead{
            color:#606266 !important;
            background-color: #13ce66 !important;
        }
        .el-table .warning-row {
            background: oldlace;
        }

        .el-table .success-row {
            background: #f0f9eb;
        }
    }
</style>

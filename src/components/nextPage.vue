<template>
    <div id="nextPage" v-if="table.length>0">
        <el-button :type="nextPageButtonType" plain @click="value--" :disabled="value<=1" style="float: left">上一页</el-button>
        <div id="selectEle" style="float: left">
            <el-select v-model="value" placeholder="请选择" style="width: 70px;margin: 0 10px" >
                <el-option
                        v-for="item in pages"
                        :key="item"
                        :label="item"
                        :value="item">
                </el-option>
            </el-select>
        </div>
        <el-button :type="nextPageButtonType" plain @click="value++" :disabled="value>=pages" style="float: left">下一页</el-button>
    </div>
</template>

<script>
    export default {
        name: "nextPage",
        props: {
            table:{
                default:()=>{return []}
            },
            count:{
                type:Number,
                default:10
            },
            nextPageButtonType:{
                type:String,
                default:'primary'
            },
        },
        computed:{
          pages(){
              return this.table.length%10===0
                  ?this.table.length/10
                  :parseInt(this.table.length/10)+1
          }
        },
        data() {
            return {
                value:'',
            }
        },
        methods: {
            changePage() {
                let query=Object.keys(this.$route.query).length===0
                    ?{}
                    :this.$route.query
                query.nowPages=this.value
                this.$adminInfo.prototype.nav({query:query,fullPath:this.$route.fullPath})
                this.$emit('change',this.value)
            }
        },
        mounted() {
            //console.log(this.$route)

        },
        created() {
            this.value=this.$route.fullPath===this.$adminInfo.prototype.nav().fullPath
                ?this.$adminInfo.prototype.nav().query.nowPages
                :1
        },
        components: {},
        watch: {
            value(){
                this.changePage()
            }
        },
    }
</script>

<style scoped lang='scss'>
    #nextPage {
        width: 265px;
        height: 40px;
        #selectEle{
            .el-input__inner{
                border: 0;
            }
        }
    }
</style>
<style  lang='scss'>
    #nextPage {
        #selectEle{
            .el-input__inner{
                border: 0 !important;
            }
        }
    }
</style>

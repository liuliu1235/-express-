<template>
    <div id="dydDialog" >
        <el-dialog
                v-if="dialogVisible"
                :modal="false"
                :title="title"
                :visible.sync="dialogVisible"
                :width="width"
                :before-close="handleClose">
            <slot class="slot"></slot>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "dydDialog",
        props: {
            width:{
                type:String,
                default:'30%'
            },
            title:{
                default: ''
            }
        },
        data() {
            return {
                dialogVisible:false
            }
        },
        methods: {
            openDia(){
                this.dialogVisible=true
            },
            closeDia(){
                this.dialogVisible=false
            },
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {

                    });
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

<style scoped lang='scss'>
    #dydDialog {

    }
</style>
<style  lang='scss'>
    #dydDialog {
        .el-dialog{
          border-radius: 6px;
          z-index: 2002;
        }
        .v-modal{
          z-index: 2000;
        }
        .slot{
          z-index: 2002;
        }
    }
</style>

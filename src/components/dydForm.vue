<template>
    <div id="dydForm" v-if="ruleForm">
            <el-form :model="ruleForm"   :rules="rules" :label-position="labelPosition" ref="ruleForm" :label-width="labelWidth" class="demo-ruleForm">
                <slot></slot>
            </el-form>
    </div>
</template>

<script>
    export default {
        name: "dydForm",
        props: {
            ruleForm:{
                default:false
            },
            rules:{
                default:false
            },
            labelWidth:{
                default:'80px'
            },
            shadow:{
                default:'hover'
            },
            labelPosition:{
                default:'left'
            }
        },
        data() {
            return {}
        },
        methods: {

            /** 提交表单  */
            submitForm() {
                this.$refs['ruleForm'].validate((valid) => {
                    if (valid) {
                        this.$emit('submit')
                    } else {
                        this.$message('请填写完整')
                        return false;
                    }
                });
            },

            /**  清除表单  */
            resetForm() {
                this.$refs['ruleForm'].resetFields();
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
    #dydForm {
        .title{
            text-align: center;
            font-size: 1.8rem;
            margin-bottom: 30px;
        }
        .el-card__body{
            padding-top: 0;
        }
    }
</style>
<style lang='scss'>
    #dydForm {
        .el-card__body{
            padding-top: 8px;
        }
        .el-card{
            border-radius: 15px;
        }
    }
</style>

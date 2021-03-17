<template>
    <div id="box">
        <el-upload
                class="avatar-uploader"
                :action="$nodeUrl+'upFile'"
                ref="upload"
                :show-file-list="true"
                :auto-upload="autoUpload"
                :on-change="handleAvatarSuccess"
                :on-success="success"
                :before-upload="beforeAvatarUpload"
                list-type="text"
                :file-list="list"
                :limit="1"
                :on-remove="clearFiles"
        >
            <!-- :before-upload="beforeAvatarUpload"-->
            <el-button style="" class="el-icon-folder ">选择PDF</el-button>

            <!--<i style="font-size: 20px" class="el-icon-folder avatar-uploader-icon"></i>-->
            <!--<span style="font-size: 12px;color: #000;">{{videoName}}</span>-->
        </el-upload>
      <el-link :underline="false" type="primary" v-if="pdfNowPath" :href="pdfNowPath" target="_blank">预览</el-link>
    </div>
</template>

<script>

    export default {
        props:[ 'autoUpload', 'src'],
        data() {
            return {
                list:[],
              pdfNowPath: null

            };
        },
        methods: {
            submit() {  //上传
                this.$refs.upload.submit();
            },
            success(res, file, fileList) {  //上传成功
                this.$emit('success', res)
            },
            clearFiles() {
                this.pdfNowPath = null
            },
            handleAvatarSuccess(file, fileList) {  //选择文件 并检查文件
                let pdfNowPath = URL.createObjectURL(file.raw);

                console.log(file)
                const isJPG = file.raw.type === 'application/pdf'||file.raw.type === 'application/PDF';
                const isLt2M = file.size / 1024 / 1024 < 10;
                if (!isJPG || !isLt2M) {
                    if (!isJPG) {
                        this.$message.error('上传只能是 pdf 格式!');
                    }
                    if (!isLt2M) {
                        this.$message.error('上传PDF大小不能超过 10MB!');
                    }
                    return isJPG && isLt2M;
                } else {
                    this.pdfNowPath = pdfNowPath;
                    this.$emit('changePdf', file,pdfNowPath)
                }
            },

            beforeAvatarUpload(file) {  //检查文件
                console.log(file)
                const isJPG = file.type === 'application/pdf'||file.type === 'application/PDF';
                const isLt2M = file.size / 1024 / 1024 < 10;
                if (isJPG || isLt2M) {
                    if (!isJPG) {
                        this.$message.error('上传只能是 pdf 格式!');
                    }
                    if (!isLt2M) {
                        this.$message.error('上传PDF大小不能超过 10MB!');
                    }
                    return isJPG && isLt2M;
                }
            }
        },
        mounted() {
          if(this.src){
            this.pdfNowPath = this.$nodeUrl + 'getPdf?pdfPath='+ this.src
          }
        }
    }
</script>

<style scoped lang='scss'>
    $imgSize:28px;
    #box {
        margin: 0 !important;
        .avatar-uploader .el-upload {
            cursor: pointer;
            position: relative;
            overflow: hidden;
            height: 200px;

        }
        .avatar-uploader{
            //  height: $imgSize !important;

        }
        .avatar-uploader .el-upload:hover {
            height: $imgSize;
        }
        .avatar-uploader-icon {
            font-size: 28px;
            color: #8c939d;
            width: $imgSize;
            height: $imgSize;
            line-height: $imgSize;
            text-align: center;
        }
        .avatar {
            width: $imgSize;
            height: $imgSize;
            display: block;
        }
        .el-icon-document:before{
            content:'' !important
        }
        .el-upload-list__item-name [class^=el-icon]{
            height: 0;
        }


    }

</style>

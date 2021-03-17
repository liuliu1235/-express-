<template>
    <div id="box">
        <my-video  v-if="videoUrl"  :src="videoUrl"></my-video>
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
          <el-button  style="" class="el-icon-folder ">选择视频</el-button>
        </el-upload>
    </div>
</template>

<script>
    import myVideo from './dydVideo'
    export default {
        props:['index','autoUpload', 'src'],
        components: { myVideo },
        data() {
            return {
                list:[],
                videoUrl: false
            };
        },
        methods: {
            submit() {  //上传
                console.log()
                this.$refs.upload.submit();
            },
            success(res, file, fileList) {  //上传成功
              this.videoUrl = res;
                this.$emit('success', res)
            },
            clearFiles() {
                this.videoUrl = null
            },
            handleAvatarSuccess(file, fileList) {  //选择文件 并检查文件

                const isJPG = file.raw.type === 'video/mp4';
                const isLt2M = file.size / 1024 / 1024 < 200;
                if (!isJPG ) {
                    this.$message.error('上传视频只能是 mp4 格式!');
                    return isJPG && isLt2M;

                } else if(!isLt2M){
                    this.$message.error('上传视频大小不能超过 200MB!');
                    return isJPG && isLt2M;
                }
                else {

                    this.$emit('changeVideo', file)
                }
                console.log(123456 +file)
            },

            beforeAvatarUpload(file) {  //检查文件
              const isJPG = file.type === 'video/mp4';
              const isLt2M = file.size / 1024 / 1024 < 200;
              return isJPG && isLt2M;
            }
        },
        mounted() {
            if(this.src){
              this.videoUrl = this.src
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
            overflow: hidden;
            height: 100px;

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

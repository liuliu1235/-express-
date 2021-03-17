<template>
  <div :class="round?'border':''">
    <el-upload
            class="avatar-uploader"
            :action="$nodeUrl+'upFile'"
            :show-file-list="false"
            :auto-upload="autoUpload"
            ref="upload"
            :before-upload="beforeAvatarUpload"
            :on-success="handleAvatarSuccess"
            :on-change="change">
      <img v-show="imageUrl" :src="imageUrl" class="avatar">
      <i v-show="!imageUrl" class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>
<script>
  export default {
    props:{
      index:{
        default:0
      },
      autoUpload:{
        default:false
      },
      src:{
        default:''
      },
      round:{
        default:false
      }
    },
    data() {
      return {
        upload:false,
      };
    },
    computed:{
      imageUrl: {
        get(){
          return this.src?this.$nodeUrl+'getImg?imagePath='+this.src:''
        },
        set(){}
      }
    },
    methods: {
      submit(){  //上传
        this.$refs.upload.submit();
      },
      handleAvatarSuccess(res, file) {
        this.$emit('success',res,this.index)

      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg'||file.type === 'image/png';
        const isLt2M = file.size / 1024 / 1024 < 5;
        return isJPG && isLt2M;
      },
      change(file, fileList){
        const type = file.raw.type === 'image/jpeg'||file.raw.type === 'image/png'
        const size = file.size / 1024 / 1024 < 5;

        if (!type) {
          this.$message.error('上传头像图片只能是 JPG或PNG 格式!');
        }
        if (!size) {
          this.$message.error('上传头像图片大小不能超过 5MB!');
        }
        if(type&&size){
          this.imageUrl = URL.createObjectURL(file.raw);
          this.$emit('change',file,this.index)
        }
        this.upload=type&&size
        return type&&size
      },
      verification(){
        if(this.imageUrl!=='') {return true}
        else{return false}
      },
    },
    mounted() {
    },
    activated(){
    },
    created() {

    },
    watch:{
    }
  }
</script>
<style lang="scss">
  .border{
    .avatar-uploader .el-upload {
      border-radius: 60px;
    }
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    cursor: pointer;
    position: relative;
    overflow: hidden;

  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 120px;
    height: 120px;
    text-align: center;
    line-height: 120px;
  }
  .avatar {
    width: 120px;
    height: 120px;
    display: block;
  }
</style>

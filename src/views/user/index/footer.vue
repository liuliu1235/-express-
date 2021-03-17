<template>
    <div class="footer">
      <el-row class="bigPc">
        <el-row>
          <div class="logo">
            <div class="logo_img">
              <img src="@/assets/logo.png" width="90%" height="24px" style="margin:1.5px 5%">
            </div>
            <div class="logo_text">
              {{ $webTitle }}
            </div>
          </div>
        </el-row>
      </el-row>
    </div>
</template>

<script>
  export default {
    name: 'footers',
    props: [''],
    components: {},
    data() {
      return {}
    },
    computed: {},
    methods: {},
    mounted() {
    },
    created() {
    },
    watch: {
    }
  }
</script>

<style scoped lang="scss">
    .footer {
      min-height: 60px;
      background-color: #2C2C2C;
      .bigPc{
        .logo{
          margin: 15px 0 0 15px;
          .logo_img{
            width: 40px;
            height: 30px;
            float: left;
          }
          .logo_text{
            font-family: FZZZHUNHJW--GB1-0;
            font-size: 1.6rem;
            color: #FFFFFF;
            letter-spacing: 1px;
            line-height: 27px;
          }
        }
        .left_box{
          float: left;
          font-family: PingFangSC-Regular;
          font-size: 1.2rem;
          color: #c0c4cc;
          letter-spacing: 0.88px;
          margin-top: 40px;
          margin-left: 22px;
          margin-bottom: 30px;
          .left_box_icon{
            margin-right: 10px;
          }
          .left_box_phone{
            margin-top: 20px;
          }
        }
        .left_box_col{
          width: 480px;
        }
        .right_box_col{
          margin-left: 20px;
          // width: calc(100% - 480px)
        }
      }
    }
</style>


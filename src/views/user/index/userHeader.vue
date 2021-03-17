<template>
  <div class="user">
    <el-popover
      v-if="!$userInfo().ids"
      placement="top-start"
      width="160"
      trigger="hover">
      <user-image
        slot="reference"
        @click.native="signIn"
        style="cursor:pointer"
        size="30px"
        round="15px"
        :my-node="!!$userInfo().userImg"
        :src="$userInfo().userImg || require('@/assets/noLogin.jpg')"
        class="header-user-img" />
      <div>
        <user-image  style="cursor:pointer" slot="reference" size="30px" round="15px" :my-node="false" :src="require('@/assets/noLogin.jpg')" class="header-user-img"></user-image>
        <div style="line-height: 30px;margin-bottom: 5px">
          登录后享受更多功能
        </div>
        <el-button style="width: calc(50% - 5px)" size="mini" plain type="primary" @click="$routerGo('signIn')">登录</el-button>
        <el-button style="width: calc(50% - 5px)" size="mini" plain type="success" @click="$routerGo('signUp')">注册</el-button>
      </div>
    </el-popover>

    <el-dropdown v-else>
      <span style="cursor:pointer;line-height: 30px"  class="el-dropdown-link">
        <span>
          {{$userInfo().names}}
        </span>

        <user-image slot="reference" @click.native="$routerGo('/myInfo')"   size="30px" round="15px" :my-node="!!$userInfo().userImg" :src="$userInfo().userImg || require('@/assets/noLogin.jpg')" class="header-user-img"></user-image>

      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item @click.native="$routerGo('/myInfo')">个人中心</el-dropdown-item>
        <el-dropdown-item @click.native="$userInfo('clear');$routerGo('/')">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
  export default {
    name: 'userHeader',
    props: [''],
    components: {},
    data() {
      return {}
    },
    computed: {},
    methods: {
      signIn() {
        this.$routerGo('/signIn')
      }
    },
    mounted() {
    },
    created() {
    },
    watch: {
    }
  }
</script>

<style scoped lang="scss">
  .user {
    position: relative;
    top: 15px;
  }
  .user-menu{
    padding: 5px 10px;
    text-align: center;
    cursor: pointer;
    &:hover {
      color: rgba(0, 183, 255, 0.83);
    }
  }
  .el-divider--horizontal{
    margin: 5px 0 !important;
  }
</style>


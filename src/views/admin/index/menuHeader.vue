<template>
    <div id="items" :style="{ marginTop:(height-48.73)/2+'px',height:menuType.menuHeader+'px' }">
        <el-button :class="!menuType.isCollapse?'el-icon-s-fold':'el-icon-s-unfold'"
                   type="text"
                   @click="clickIcon"
                   :style="{lineHeight:(Number(menuType.menuHeader))+'px'}"
                   style="float: left;font-size: 24px;width: 50px;height: 48px">
        </el-button>

        <div style="float: left;" :style="{lineHeight:menuType.menuHeader+'px'}">
            {{$adminInfo.prototype.nav().item.name}}
        </div>

        <div class="right-menu">
            <el-dropdown  trigger="click" style="float: right;">
                <div>
                    <el-button type="text">
                        <img :src="adminImg"
                             class="user-avatar" width="40px" height="40px" style="border-radius: 20px;margin-top: 4px;">
                        <i class="el-icon-caret-bottom" />
                    </el-button>
                </div>
                <el-dropdown-menu slot="dropdown" >
                    <el-dropdown-item v-if="$adminInfo().grade!=='超级管理员'">
                        <span style="display:block;" @click="myInfo">我的资料</span>
                    </el-dropdown-item>
                    <el-dropdown-item divided>
                        <span style="display:block;" @click="logout">退出登陆</span>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
          <div style="text-align: center;float: right;margin-right: 10px;"
               :style="{lineHeight:menuType.menuHeader+'px'}">
            <el-tooltip class="item" effect="dark" content="全屏" placement="bottom-start">
              <el-link :underline="false" class="el-icon-full-screen" @click="fullScreen"></el-link>
            </el-tooltip>

          </div>
            <div style="text-align: center;float: right;margin-right: 10px;max-width: 200px"
                 :style="{lineHeight:menuType.menuHeader+'px'}">
                {{$adminInfo().names}}
            </div>
            <div style="text-align: center;float: right;margin-right: 10px;"
                 :style="{lineHeight:menuType.menuHeader+'px'}">
                {{$myCity().province}} {{$myCity().city}} <i :class="dayIcon"></i>{{tem.tem}}°C
            </div>

        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import menuType from './menuType'


    export default {
        name: "item",
        props: ['height'],
        data() {
            return {
                menuType:menuType,
                tem:{} //温度
            }
        },
        methods: {
            myInfo(){
                this.$adminInfo.prototype.nav(
                    {
                        key:'100',
                        item:{
                            path:'/admin-info',
                            name:'我的资料'
                        }
                    }
                )
                this.$routerGo('/admin-info')
            },
            async changeAsideWidth(){
                let changeNum=20;//跳动次数
                let width=(parseFloat(this.menuType.asideWidth_cope.split('px')[0])-64)/changeNum
                let num=1
                let changeWidth = setInterval(()=>{
                    this.menuType.isCollapse
                        ? this.$set(this.menuType,'asideWidth',(Number(this.menuType.asideWidth.split('px')[0])-width)+'px')
                        : this.$set(this.menuType,'asideWidth',(Number(this.menuType.asideWidth.split('px')[0])+width)+'px')
                    num===changeNum
                        ? clearInterval(changeWidth)
                        : num++
                },1)
            },
            clickIcon(){
                this.$set(this.menuType,'isCollapse',!this.menuType.isCollapse)
                this.changeAsideWidth()
            },
            async logout() {
                this.$adminInfo('clear')
                this.$routerGo(`/admin-login`)
            },

            /** 获取天气情况 */
            async getTem(){
                axios.get('https://www.tianqiapi.com/api?version=v61&appid=63428653&appsecret=hdz1e5w8').then((res)=>{
                    this.tem=res.data
                })
            },

          // 全屏显示
          fullScreen(state) {
            if (!document.fullscreenElement && // alternative standard method
              !document.mozFullScreenElement && !document.webkitFullscreenElement) {// current working methods
              if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen();
              } else if (document.documentElement.mozRequestFullScreen) {
                document.documentElement.mozRequestFullScreen();
              } else if (document.documentElement.webkitRequestFullscreen) {
                document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
              }
            } else {
              if (document.cancelFullScreen) {
                document.cancelFullScreen();
              } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
              } else if (document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen();
              }
            }
          }
        },
        computed:{
            adminImg(){
                return this.$adminInfo().userImg
                    ?this.$nodeUrl+'getImg?imagePath='+this.$adminInfo().userImg
                    :require('@/assets/head.jpg')
            },
            dayIcon(){
                //xue、lei、shachen、wu、bingbao、yun、yu、yin、qing 九种天气情况
                switch (this.tem.wea_img) {
                    case 'yun':return 'el-icon-cloudy';
                    case 'xue':return 'el-icon-light-rain';
                    case 'lei':return 'el-icon-lightning';
                    case 'shachen':return 'el-icon-partly-cloudy';
                    case 'bingbao':return 'el-icon-light-rain';
                    case 'yu':return 'el-icon-heavy-rain';
                    case 'yin':return 'el-icon-cloudy-and-sunny';
                    case 'qing':return 'el-icon-sunny';
                    case 'wu':return '';
                }
            }
        },
        mounted() {
        },
        created() {
            /** 获取城市温度 */
            this.getTem()
        },
        components: {},
        watch: {},
    }
</script>

<style scoped lang='scss'>
    #items {

        margin-right: 20px;
        line-height: normal;
        .el-button{
            padding: 0;
        }
        .navbar {
            height: 50px;
            overflow: hidden;
            position: relative;
            background: #fff;
            box-shadow: 0 1px 4px rgba(0,21,41,.08);

            .hamburger-container {

                height: 100%;
                float: left;
                cursor: pointer;
                transition: background .3s;
                -webkit-tap-highlight-color:transparent;

                &:hover {
                    background: rgba(0, 0, 0, .025)
                }
            }

            .breadcrumb-container {
                float: left;
            }

            .right-menu {
                float: right;
                height: 100%;

                &:focus {
                    outline: none;
                }

                .right-menu-item {
                    display: inline-block;
                    padding: 0 8px;
                    height: 100%;
                    font-size: 18px;
                    color: #5a5e66;
                    vertical-align: text-bottom;

                    &.hover-effect {
                        cursor: pointer;
                        transition: background .3s;

                        &:hover {
                            background: rgba(0, 0, 0, .025)
                        }
                    }
                }

                .avatar-container {
                    margin-right: 30px;

                    .avatar-wrapper {
                        margin-top: 5px;
                        position: relative;

                        .user-avatar {
                            cursor: pointer;
                            width: 40px;
                            height: 40px;
                        }

                        .el-icon-caret-bottom {
                            cursor: pointer;
                            position: absolute;
                            right: -20px;
                            top: 25px;
                            font-size: 12px;
                        }
                    }
                }
            }
        }
    }
</style>

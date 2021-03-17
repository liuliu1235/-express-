<template>
    <div class="index">
        <el-carousel :interval="2000"  height="400px" type="card" style="width: 90%;margin: 0 5%">
            <el-carousel-item v-for="(item,index) in tableData" :key="index">
                <a :href="item.url" target="_Blank" v-if="item.url">
                    <user-image :src="item.image" width="100%"></user-image>
                </a>
                <user-image  v-else :src="item.image" width="50vw"></user-image>
            </el-carousel-item>
        </el-carousel>
        <el-row style="margin-left: 10vw">
            <el-tabs v-model="sortId" style="display: inline-block">
                <el-tab-pane label="全部" name=""></el-tab-pane>
                <el-tab-pane v-for="(item,index) in sortData" :key="index" :label="item.names" :name="item.ids"></el-tab-pane>
            </el-tabs>
        </el-row>
        <div class="infinite-list-wrapper" style="overflow:auto">
            <el-row :gutter="20"  style="padding: 0 5vw;overflow: hidden;">
                <el-col style="margin-bottom: 20px" :span="6" v-for="(item,index) in listData.slice(0, count)" :key="index" v-infinite-scroll="load" infinite-scroll-disabled="disabled">
                    <el-card shadow="hover">
                        <div>
                            <el-row style="font-size: 18px;text-align: center;font-weight: 600">
                                {{item.name}}
                                <el-button style="float: right;margin: 0" @click="$routerGo('news-info',item)" type="text" >详情</el-button>
                            </el-row>
                            <el-row style="width: 100%;height: 180px">
                                <dyd-video style="" v-if="item.src"    :src="item.src"></dyd-video>
                                <user-image width="100%" height="180px" v-else-if="item.img"  :src="item.img"></user-image>
                                <el-row v-else>
                                    {{item.text}}
                                </el-row>
                            </el-row>

                            <el-row style="color: #999999;height: 20px;padding-top: 8px">
                                <span style="float: right;">
                                {{$Time(item.ids).getTime()}}
                            </span>
                            </el-row>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
            <el-row style="text-align: center">
                <p v-if="loading">加载中...</p>
                <p v-if="noMore">没有更多了</p>
            </el-row>
        </div>
        <el-row v-show="!listData.length" style="text-align: center;font-size: 14px;height: 200px;line-height: 200px">
            暂无视频
        </el-row>
    </div>
</template>

<script>
  export default {
    name: 'index',
    props: [''],
    components: {},
    data() {
      return {
        tableData:[],
          listData:[],
          search:null,
          sortId: null,
          sortData: [],
          count: 10,
          loading: false
      }
    },
    computed: {
        noMore () {
            return this.count >= 20
        },
        disabled () {
            return this.loading || this.noMore
        }
    },
    methods: {
        load () {
            this.loading = true
            setTimeout(() => {
                this.count += 10
                this.loading = false
            }, 2000)
        },
        async getVideo(){
            let cnt= {
                $like:{
                    name:`%${this.search}%`
                },
                $orderBY: {col:'ids'},
                $where:{
                    sortId: this.sortId
                }
            }
            if(!this.search){
                delete cnt.$like
            }
            if(!this.sortId || Number(this.sortId) === 0){
                delete cnt.$where
            }
            this.$api.get('news',cnt,res=>{
                this.listData=res
            })
        }
    },
    mounted() {
        this.getVideo()
    },
    async created() {

      this.$api.get('carousel',{$orderBY: {col:'ids'}},res=>{
        this.tableData=res
      })

        this.$bus.$on('search',search=>{
            this.search = search
            this.getVideo()
        })
        this.$api.get('sort',{},res=>{
            if(res) {
                this.sortData=res
            }
        })
    },
    watch: {
        sortId() {
            this.getVideo()
        }
    }
  }
</script>

<style scoped lang="scss">
    .index {
    }
</style>


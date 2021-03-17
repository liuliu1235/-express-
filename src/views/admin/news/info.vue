<template>
  <div class="info">
    <p style="text-align: center">简介</p>
    <dyd-video style="width: 70%;margin-left: 15%" v-if="scope.row.src"   :src="scope.row.src"></dyd-video>
    <div style="width: 80%;margin-left: 10%;max-height: 500px;overflow: auto" v-if="scope.row.content" v-html="scope.row.content">{{ scope.row.content }}</div>
    <div style="text-align: center" v-else> 暂无简介 </div>
  </div>
</template>

<script>
  import Comment from "./comment";
  export default {
    name: 'info',
    props: ['scope'],
    components: { Comment } ,
    data() {
      return {
        activeName: 'first'
      }
    },
    computed: {},
    watch: {},
    mounted() {
    },
    created() {
    },
    methods: {},
  }
</script>

<style scoped lang="scss">
  .info {
  }
</style>


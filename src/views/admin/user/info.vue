<template>
  <div class="info">
    <expand  :admin-id="scope.row.ids"></expand>
  </div>
</template>

<script>
  import comment from "../news/comment";
  import expand from '../admin/expand'
  import Collect from "./collect";
  export default {
    name: 'info',
    props: ['scope', 'noShow'],
    components: {Collect, expand, comment },
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


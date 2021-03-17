<template>
  <div class="dydLink">
    <el-link :underline="false"  :type="typeAll[type]" :class="classAll[type]">
      <slot></slot>
    </el-link>
  </div>
</template>

<script>
  export default {
    name: 'dydLink',
    props: ['type'],
    components: {},
    data() {
      return {
        classAll:{
          add:'el-icon-plus',
          up: 'el-icon-edit',
          del: 'el-icon-delete',
        },
        typeAll:{
          add:'primary',
          up: 'info',
          del: 'danger',
        },
        textAll:{
          add:'增加',
          up: '修改',
          del: '删除',
        }
      }
    },
    computed: {
    },
    methods: {},
    mounted() {
    },
    created() {
    },
    watch: {}
  }
</script>

<style scoped lang="scss">
  .dydLink {
    display: inline-block;
  }
</style>


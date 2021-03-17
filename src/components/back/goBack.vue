<template>
    <div id="goBack">
    </div>
</template>

<script>
    export default {
        name: "goBack",
        props: [''],
        data() {
            return {}
        },
        methods: {},
        mounted() {
        },
        created() {
            let query=this.$route.query
            let newPath=query.newPath
            let newQuery=query.query
            this.$routerGo(newPath,newQuery)
        },
        components: {},
        watch: {},
    }
</script>

<style scoped lang='scss'>
    #goBack {

    }
</style>

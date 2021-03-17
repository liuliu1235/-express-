<template>
    <div id="menuAsideHead">
        <div style="text-align: center;height: 50px;background-color: #263445;line-height: 50px;font-size: 14px;font-weight: 600">
        <img src="@/assets/logo.png" width="30px" height="30px" style="position: relative;top:10px;" >
            <span v-show="!menuType.isCollapse">
                {{$webTitle}}
            </span>
        </div>
    </div>
</template>

<script>
    import menuType from './menuType'
    export default {
        name: "menuAsideHead",
        props: [''],
        data() {
            return {
                menuType:menuType
            }
        },
        methods: {},
        mounted() {
        },
        created() {
        },
        components: {},
        watch: {},
    }
</script>

<style scoped lang='scss'>
    #menuAsideHead {
        color: #ffffff;

    }
</style>

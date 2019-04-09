<template>
    <el-button @click="goback" type="primary" size="mini">返回</el-button>
</template>

<script>
    export default {
        name: "goback",
        props: {
            defaultPath: {
                type: String,
                default: '/'
            }
        },
        methods: {
            goback() {
                window.history.length > 1
                    ? this.$router.go(-1)
                    : this.$router.push(this.defaultPath);
                this.$emit('callback');
            }
        }
    }
</script>

<style scoped>

</style>
<template>
    <header v-show="!isMainPage" v-bind:class="getHeaderClass(this.$store.state.isLogin)">
        <span class="kanit h2-like" onclick="location.href='/'">PlayUs</span>
    </header>
</template>

<script>
export default {
    data() {
        return {
            isMainPage : true
        }
    },
    methods: {
        getHeaderClass(isLogin) {
            return isLogin ? 'is-login' : 'need-login';
        }
    },
    watch : {
        '$route' (to) {
            this.isMainPage = to.path == '/' ? true : false
        }
    },
}
</script>

<style scoped>
header {
    width: 100vw;
    height: 100px;
    display: flex;
}

.is-login {
    background : linear-gradient(180deg, rgba(122, 120, 233, 1) 0%, rgba(97, 100, 222, 1) 100%);
    color : white;
}

.need-login {
    background: white;
    color : #5F62E2;
}

header > span {
    align-self: center;
    margin-left: 20vw;
    cursor: pointer;
}
</style>
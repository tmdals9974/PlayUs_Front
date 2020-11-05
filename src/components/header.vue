<template>
    <header v-show="!isMainPage" v-bind:class="getHeaderClass($store.getters.isLogin)">
        <span class="kanit h2-like" id="logo_text" @click="logo_clicked()">Play Us</span>
        <section class="user" v-show="$store.getters.isLogin">
            <div class="profile">
                <div class="circle-in-text kanit h5-like">{{ $store.getters.getEmail }}</div>
                <span class="down-arrow"></span>
            </div>
            <div>
                <div class="dropdown kanit h6-like light">
                    <span @click="$store.dispatch('logout', { $http, $router })">Logout</span>
                </div>
            </div>
        </section>
    </header>
</template>

<script>
export default {
    data() {
        return {
            isMainPage : this.$router.currentRoute.path == '/' ? true : false
        }
    },
    methods: {
        logo_clicked() {
            if (this.$router.currentRoute.path == '/projects')
                return;
            this.$router.push(this.$store.getters.isLogin ? '/projects' : '/');
        },
        getHeaderClass(isLogin) {
            return isLogin ? 'is-login' : 'need-login';
        }
    },
    watch : {
        '$route' (to) {
            this.isMainPage = to.path == '/' ? true : false;
        }
    }
}
</script>

<style scoped>
header {
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.is-login {
    background : linear-gradient(180deg, rgba(122, 120, 233, 1) 0%, rgba(97, 100, 222, 1) 100%);
    color : white;
}

.need-login {
    background: #f5f5f5;
    color : #5F62E2;
}

header > :first-child {
    margin-left: 20vw;
    cursor: pointer;
}

header > :last-child {
    margin-right: 20vw;
    cursor: pointer;
}

.user {
    display:flex; 
    flex-flow:column nowrap; 
    justify-content: center; 
}

.user > .profile {
    display:flex; 
    flex-flow:row nowrap; 
    justify-content:center; 
    align-items:center;
}

.circle-in-text {    
    width: 65px;
    height: 65px;
    border-radius: 50%;
    background-color: white;

    display:flex;
    justify-content: center;
    align-items: center;
    color : #5F62E2;
}

.down-arrow {
    width: 13px;
    height: 13px;
    margin-left: 13px;
    border-left: 1.5px solid #fff;
    border-bottom: 1.5px solid #fff;
    -webkit-transform: rotate(-45deg);
    transform: rotate(-45deg);
    box-sizing: border-box;
}

.dropdown {    
    display: none;
    position: absolute;
    background-color: #f9f9f9;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    border-radius: 4px;
    z-index: 1;
}

.dropdown span {
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
    text-align: left;
}

.dropdown span:hover {
    background-color: #ddd;
    border-radius: 4px;
    color: black;
}

.user:hover .dropdown {
    display: block;
}

</style>
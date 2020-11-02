<template>
    <main class="container">
        <section class="sub-container">
            <span class="h1-like kanit semiBold">Play Us</span>
            <p class="h3-like spoqaHanSans regular">웹서버 구현을 공부하지 않고<br>데이터 조작 & 리턴 가능한 서비스</p>
            <br>
            <input type="button" class="btn-start spoqaHanSans bold" value="시작하기" @click="btn_start_click()">
        </section>
        <section class="image-container">
            <img class="main-images" src="../assets/images/main.png" alt="PlayUs">
        </section>
    </main>
</template>

<script>
export default {
    methods: {
        btn_start_click() {
            this.$router.push(this.$store.getters.isLogin ? this.$store.getters.hasProject ? "/projects" : "/createProject" :  "/login");
        }
    }
}
</script>

<style scoped>
    .container {
        height: 100%;
        overflow: hidden;
        background: linear-gradient(100deg, rgba(159, 148, 250, 1) 0%, rgba(88, 92, 255, 1) 100%);
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        align-items: center;
    }

    .sub-container {
        display: flex;
        flex-flow: column nowrap;
        margin-left: 10rem;
        color:white;
    }

    .btn-start {
        font-size: 2.8rem;
        color: #5f62e2;
        width: 400px;
        padding-top: 1vw;
        padding-bottom: 1vw;
        border-radius: 4px;
        border-style: none;
        box-shadow: 3px 3px 6px 1px #53519a;
        cursor: pointer;
        outline: none;
    }

    .image-container {
        width: 730px;
    }

    .main-images {
        height: auto;
        width: auto;
        max-width: 100%;
    }
</style>
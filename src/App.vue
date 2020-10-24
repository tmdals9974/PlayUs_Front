<template>
  <div id="app">
    <Header/>
    <router-view/>
  </div>
</template>

<script>
// import Main from './components/main.vue'
// import Login from './components/login.vue'
import Header from './components/header.vue'

export default {
  name: 'App',
  components: {
    Header
  }
}
</script>

<style>
body {
  height: 100vh;
  overflow: hidden;
  margin : 0 auto;
}

#app {
  height: 100%;
}
  /* Noto Sans */
@font-face {
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 300;
    src: url('./assets/fonts/NotoSansKR/NotoSansKR-Light.otf') format('opentype');
}

@font-face {
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 400;
    src: url('./assets/fonts/NotoSansKR/NotoSansKR-Regular.otf') format('opentype');
}

@font-face {
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 500;
    src: url('./assets/fonts/NotoSansKR/NotoSansKR-Medium.otf') format('opentype');
}

@font-face {
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 700;
    src: url('./assets/fonts/NotoSansKR/NotoSansKR-Bold.otf') format('opentype');
}


/* Kanit */
@font-face {
    font-family: 'Kanit';
    font-style: normal;
    font-weight: 200;
    src: url('./assets/fonts/Kanit/Kanit-ExtraLight.ttf') format('truetype');
}

@font-face {
    font-family: 'Kanit';
    font-style: normal;
    font-weight: 300;
    src: url('./assets/fonts/Kanit/Kanit-Light.ttf') format('truetype');
}

@font-face {
    font-family: 'Kanit';
    font-style: normal;
    font-weight: 400;
    src: url('./assets/fonts/Kanit/Kanit-Regular.ttf') format('truetype');
}

@font-face {
    font-family: 'Kanit';
    font-style: normal;
    font-weight: 500;
    src: url('./assets/fonts/Kanit/Kanit-Medium.ttf') format('truetype');
}

@font-face {
    font-family: 'Kanit';
    font-style: normal;
    font-weight: 600;
    src: url('./assets/fonts/Kanit/Kanit-SemiBold.ttf') format('truetype');
}

/* SpoqaHanSans */
@font-face {
    font-family: 'SpoqaHanSans';
    font-style: normal;
    font-weight: 400;
    src: url('./assets/fonts/SpoqaHanSans/SpoqaHanSans-Regular.ttf') format('truetype');
}

@font-face {
    font-family: 'SpoqaHanSans';
    font-style: normal;
    font-weight: 700;
    src: url('./assets/fonts/SpoqaHanSans/SpoqaHanSans-Bold.ttf') format('truetype');
}

html {
    font-size: 62.5%;
}

.kanit {
    font-family: 'Kanit';
}

.spoqaHanSans {
    font-family: 'SpoqaHanSans';
    letter-spacing: -0.15rem;
}

.light {
    font-weight: 300;
}

.regular {
    font-weight: 400;
}

.semiBold {
    font-weight: 600;
}

.bold {
    font-weight: 700;
}

.h1-like {
    font-size: 6.0rem;
}

.h2-like {
    font-size: 3.5rem;
}

.h3-like {
    font-size: 2.8rem;
    line-height: 5rem;
}

.h4-like {
    font-size: 2.5rem;
}

.h5-like {
    font-size: 2.0rem;
}
</style>

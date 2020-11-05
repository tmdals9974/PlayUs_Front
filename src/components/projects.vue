<template>
    <main class="main-container">
        <div class="sub-container-1180">
            <span class="spoqaHanSans bold h4-like">프로젝트 목록</span>
            <section class="projectList spoqaHanSans">
                <article class="create-project" @click="$router.push('/createProject')">
                    <img src="../assets/images/project_create.png" alt="프로젝트 생성하기">
                    <span class="spoqaHanSans bold h5-like" style="margin-top:1vh;">프로젝트 생성하기</span>
                </article>

                <article class="project" v-for="(item, index) in $store.state.user.project" v-bind:key="index" @click="$router.push({ name: 'project', params: { name: item.name }})">
                    <span class="spoqaHanSans bold h5-like">{{item.name}}</span>
                    <span class="spoqaHanSans regular h6-like" style="white-space: pre-line">{{item.content}}</span>
                </article>
            </section>
        </div>
    </main>
</template>

<script>
export default {

}
</script>

<style scoped>
.projectList {
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
    align-items: flex-start;
    max-width: 100%;
}

.projectList > * {
    margin-right: 1.5vw;
    margin-top: 2vh;
}

.create-project {
    width:350px;
    height:280px;
    background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='6' ry='6' stroke='%23BDBDBDFF' stroke-width='4' stroke-dasharray='10%2c12' stroke-dashoffset='100' stroke-linecap='square'/%3e%3c/svg%3e");
    border-radius: 6px;
    cursor: pointer;

    display:flex; 
    flex-flow: column nowrap; 
    align-items:center; 
    justify-content: center;
}

.project {
    width:350px;
    height:280px;
    background-color: white;
    border-radius: 4px;
    box-shadow: 0px 2px 3px 2px #c9c9c9;
    cursor: pointer;
    
    display:flex;
    flex-flow: column nowrap;
    justify-content: flex-end;
}

.project > span {
    margin-left : 30px;
}

.project > span:last-child {
    margin-bottom : 30px;
}
</style>
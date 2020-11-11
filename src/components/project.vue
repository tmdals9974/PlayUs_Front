<template>
    <main class="main-container">
        <div class="sub-container-1180" style="width:1180px;">
            <span class="spoqaHanSans bold h2-like">{{ this.project.name }}</span>
            <section class="tab-menu spoqaHanSans bold h5-like">
                <span v-for="(tab, index) in tabs" v-bind:key="index" v-bind:class="{active : tab.title === selectedTab}" @click="selectedTab = tab.title">
                    {{ tab.title }} <div v-if="tab.subMenu" class="arrow"/>
                </span>
            </section>

            <section v-show="selectedTab === tabs[0].title" class="tab-content">
                <div class="card">
                    <div class="container spoqaHanSans bold h5-like">
                        그래프 1
                    </div>
                </div>
                <div class="card">
                    <div class="container spoqaHanSans bold h5-like">
                        그래프 2
                    </div>                    
                </div>
                <div class="card">
                    <div class="container spoqaHanSans bold h5-like">
                        그래프 3
                    </div>                
                </div>
                <div class="card">
                    <div class="container spoqaHanSans bold h5-like">
                        그래프 4
                    </div>                
                </div>
            </section>

            <section v-show="selectedTab === tabs[1].title">
                <div v-for="(item, index) in project.collection" :key="index" >
                    {{ item }}
                </div>
            </section>
        </div>
    </main>

</template>

<script>
export default {
    data() {
        let tabs = [ {title: "상세 통계", subMenu : false }, {title: "DB 관리", subMenu : true }, {title: "API 관리", subMenu : true } ];
        return {
            tabs, 
            selectedTab : tabs[0].title,
            project: {
                _id : '',
                name : '',
                collection : []
            }
        }
    },
    mounted() {
        this.project = this.$store.state.user.project.find(obj => obj._id === this.$route.params._id);
        this.$http.get(`projects/${this.project._id}/collections`)
        .then(result => {
            if (!result.data.success)
                return alert(result.data.msg);
            this.project.collection = result.data.details;
        })
        .catch(err => {
            alert(this.$errMsg);
            console.log(err);
        })
    },
}
</script>

<style>
.tab-menu {
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: center;

    background-color:white;
    margin-top : 3vh;
    padding : 20px 0;
}

.tab-menu > span {
    cursor: pointer;
    color: #9f9f9e;
    padding: 0 2vw 0;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
}

.tab-menu > span > .arrow {
    width: 11px;
    height: 11px;
    margin-left: 11px;
    border-left: 1.5px solid #9f9f9e;
    border-bottom: 1.5px solid #9f9f9e;
    -webkit-transform: rotate(-45deg);
    transform: rotate(-45deg);
    box-sizing: border-box;
}

.tab-menu > span.active > .arrow {
    width: 11px;
    height: 11px;
    margin-left: 11px;
    border-left: 1.5px solid #5F62E2;
    border-bottom: 1.5px solid #5F62E2;
    -webkit-transform: rotate(-45deg);
    transform: rotate(-45deg);
    box-sizing: border-box;
}

.tab-menu .active {
    color: #5F62E2;
}

.tab-content {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    align-items: flex-start;
}

.card {
    width: 570px;
    height: 400px;
    background-color: white;
    border-radius: 4px;
    box-shadow: 0px 2px 3px 2px #c9c9c9;
    margin-top: 4vh;

    display:flex;
    flex-flow: column nowrap;
}

.card > .container {
    margin: 3vh 1.5vw;
}

</style>
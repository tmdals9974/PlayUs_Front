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

            <span class="spoqaHanSans bold h4-like" style="margin-top:10vh;">프로젝트 차트</span>
            <section class="projectStats spoqaHanSans">
                <article class="stats bold h5-like">
                    <div class="container">
                        오브젝트 수
                        <canvas id="chart_objects" />
                        <div class="kanit h2-like" style="margin-top:-165px; margin-left:170px;">
                            {{ totalObjects }}
                            <p class="h6-like regular" style="margin-top:-10px; margin-left:10px;">TOTAL</p>
                        </div>
                    </div>
                </article>
                <article class="stats bold h5-like">
                    <div class="container">
                        오브젝트 평균 크기
                        <div class="spoqaHanSans regular h6-like">
                            <article class="bar-chart" v-for="(item, index) in items" :key="index">
                                <div class="legends">
                                    <span>{{item.name}}</span>
                                    <span>{{item.size.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}}</span>
                                </div>
                                <div class="progress-bar">
                                    <div class="percent" v-bind:style="{ backgroundColor : colors[index], width : (item.size/items[0].size) * 100 + '%'  }"></div>
                                </div>
                            </article>
                        </div>
                    </div>
                </article>
                <article class="stats bold h5-like" style="width:100%">
                    <div class="container">
                        frequencyOfUse
                        <canvas id="chart_frequencyOfUse"/>
                    </div>
                </article>
            </section>
        </div>
    </main>
</template>

<script>
import Chart from "chart.js";

export default {
    data() {
        return {
            totalObjects : 1281,
            items : [{ name : 'PROJECT 1', size : 35929 }, { name : 'PROJECT 2', size : 28854 }, { name : 'PROJECT 3', size : 12235 }, { name : 'PROJECT 4', size : 1843 }],
            colors : ['#5f62e2','#7679f3','#9b9dfd', '#babbff', '#dedfff']
        }
    },
    methods: {
        extract(objArr, key) {
            var resultArr = [];
            for (var obj in objArr) {
                resultArr.push(objArr[obj][key]);
            }
            return resultArr;
        },
        createChart(chartId, chartData) {
            var ctx = document.getElementById(chartId);
            new Chart(ctx, {
                type: chartData.type,
                data: chartData.data,
                options: chartData.options
            });
        },
        getColor(index) {
            console.log(this.colors[index]);
            return this.colors[index];
        }
    },
    mounted() {
        this.$http.get('projects/stats')
        .then(result => {
            if (!result.data.success)
                return alert(this.$errMsg);
            var chartData = {
                type: 'doughnut',
                //data: this.extract(result.data.details, 'objects'),
                data: { 
                    datasets: [{ backgroundColor: this.colors, weight: 1, data: [40, 30, 20, 7, 3] }],
                    labels: ['프로젝트 1','프로젝트 2','프로젝트 3', '프로젝트 4', '프로젝트 5'] 
                },
                options: { cutoutPercentage : 65,
                    legend: {position : 'right', align: 'end', 
                        labels: { boxWidth: 17, fontSize: 17, fontFamily: 'spoqaHanSans',  fontColor: 'black', padding: 12 }
                    }
                }
            };
            this.createChart('chart_objects', chartData);
        })
        .catch(err => {
            alert(this.$errMsg);
            console.log(err);
        })
    }
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

.projectStats {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    align-items: flex-start;
    max-width: 100%;
}

.stats {
    width:575px;
    height:350px;
    margin-top: 3vh;
    background-color: white;
    border-radius: 4px;
    box-shadow: 0px 2px 3px 2px #c9c9c9;
}

.stats > .container {
    margin: 3vh 1.5vw;
}

.bar-chart {
    margin-top : 2vh;
}

.bar-chart > .legends {
    display:flex; 
    flex-flow:row nowrap; 
    justify-content: space-between;
}

.progress-bar {
    background-color:#ebeff4; 
    border-radius: 16px;
}

.progress-bar > .percent {
    background-color:#7679f3; 
    border-radius: 16px; 
    margin-top:1vh;
    height: 8px;
    transition: width 1s;
}
</style>
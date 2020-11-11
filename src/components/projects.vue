<template>
    <main class="main-container">
        <div class="sub-container-1180">
            <span class="spoqaHanSans bold h4-like">프로젝트 목록</span>
            <section class="projectList spoqaHanSans">
                <article class="create-project" @click="$router.push('/createProject')">
                    <img src="../assets/images/project_create.png" alt="프로젝트 생성하기">
                    <span class="spoqaHanSans bold h5-like" style="margin-top:1vh;">프로젝트 생성하기</span>
                </article>

                <article class="project" v-for="(item, index) in $store.state.user.project" v-bind:key="index" @click="$router.push({ name: 'project', params: { _id: item._id }})">
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
                        <div class="kanit h2-like" id="totalObjects" style="margin-top:-165px; margin-left:170px;">
                            {{ totalObjects }}
                            <p class="h6-like regular" style="margin-top:-10px; margin-left:10px;">TOTAL</p>
                        </div>
                    </div>
                </article>
                <article class="stats bold h5-like">
                    <div class="container">
                        오브젝트 평균 크기
                        <div v-bind:class="{ objSize : items.length > 2 }" class="spoqaHanSans regular h6-like" style="margin-top:1vh">
                            <article class="bar-chart" v-bind:style="{ marginTop : items.length > 2 ? '0' : '2vh' }" v-for="(item, index) in sortItemBySize" :key="index">
                                <div class="legends">
                                    <span>{{item.name}}</span>
                                    <span>{{item.size.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}}</span>
                                </div>
                                <div class="progress-bar">
                                    <div class="percent" v-bind:style="{ backgroundColor : colors[index], width : (item.size/sortItemBySize[0].size) * 100 + '%'  }"></div>
                                </div>
                            </article>
                        </div>
                    </div>
                </article>
                <article class="stats bold h5-like" style="width:100%; height:100%">
                    <div class="container">
                        평균 사용 빈도
                        <canvas id="chart_frequencyOfUse" style="margin-top:3vh;"/>
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
            totalObjects: 1281,
            items: [{ name: 'PlayUs', count: 7, size: 35929, use: [10, 3, 30, 23, 10, 5, 50] }, { name: '여기야', count: 30, size: 28854, use: [3, 20, 5, 7, 18, 42, 50] },
                    { name: 'Pharmsland', count: 3, size: 12235, use: [70, 85, 82, 97, 113, 105, 87] }, { name: '다해아이앤씨', count: 40, size: 1843, use: [75, 72, 83, 69, 56, 41, 30] },
                    { name: '대리운전', count: 20, size: 41232, use: [3, 2, 9, 7, 18, 21, 13] }],
            colors: ['#5f62e2', '#7679f3', '#9b9dfd', '#babbff', '#dedfff']
        }
    },
    methods: {
        extract(objArr, key) {
            const resultArr = [];
            for (let obj in objArr) {
                resultArr.push(objArr[obj][key]);
            }
            return resultArr;
        },
        createChart(chartId, chartData) {
            const ctx = document.getElementById(chartId);
            new Chart(ctx, {
                type: chartData.type,
                data: chartData.data,
                options: chartData.options
            });
        },
        hexToRgb (hexType){ 
            let hex = hexType.replace( "#", "" ); 
            let value = hex.match( /[a-f\d]/gi ); 

            // 헥사값이 세자리일 경우, 여섯자리로. 
            if ( value.length == 3 ) hex = value[0] + value[0] + value[1] + value[1] + value[2] + value[2]; 
            value = hex.match( /[a-f\d]{2}/gi ); 

            const r = parseInt( value[0], 16 ); 
            const g = parseInt( value[1], 16 ); 
            const b = parseInt( value[2], 16 ); 

            return `${r}, ${g}, ${b}`; 
        },
        getAreaChartDataSet(items, colors) {
            const dataSet=[];
            for (const index in items) {
                const obj = {};
                const refObj = items[index];
                const color = colors[index];
                const hex = this.hexToRgb(color);
                obj.label = refObj.name;
                obj.data = refObj.use;
                obj.backgroundColor = `rgba(${hex}, 0.3)`;
                obj.borderColor = `rgba(${hex}, 0.8)`;
                obj.pointHoverBackgroundColor = color;

                dataSet.push(obj);
            }
            return dataSet;
        },
        measureText(pText, pFontSize, pStyle) {
            let lDiv = document.createElement('div');
            document.body.appendChild(lDiv);

            if (pStyle != null) {
                lDiv.style = pStyle;
            }
            lDiv.style.fontSize = "" + pFontSize + "px";
            lDiv.style.position = "absolute";
            lDiv.style.left = -1000;
            lDiv.style.top = -1000;

            lDiv.innerHTML = pText;

            const lResult = {
                width: lDiv.clientWidth,
                height: lDiv.clientHeight
            };

            document.body.removeChild(lDiv);
            lDiv = null;

            return lResult;
        }
    },
    computed: {
        sortItemBySize() {
            return this.items.slice().sort((a,b) => {
                if ( a.size > b.size ) { return -1; }
                if ( a.size < b.size ) { return 1; }
                return 0;
            });
        },
        sortItemByCount() {
            return this.items.slice().sort((a,b) => {
                if ( a.count > b.count ) { return -1; }
                if ( a.count < b.count ) { return 1; }
                return 0;
            });
        }
    },
    mounted() {
        this.$http.get('projects/stats')
            .then(result => {
                if (!result.data.success)
                    return alert(this.$errMsg);

                Chart.defaults.global.defaultFontFamily='spoqaHanSans';

                //도넛차트 생성코드
                const doughnutChartData = {
                    type: 'doughnut',
                    data: {
                        datasets: [{ backgroundColor: this.colors, weight: 1, data: this.extract(this.sortItemByCount, 'count') }],
                        labels: this.extract(this.sortItemByCount, 'name')
                    },
                    options: {
                        cutoutPercentage: 65,
                        legend: {
                            position: 'right', align: 'end',
                            labels: { boxWidth: 17, fontSize: 17, fontColor: 'black', padding: 12 }
                        },
                        tooltips: {
                            backgroundColor:'white',
                            bodyFontSize:15, bodyFontColor:'black', borderWidth:1, borderColor:'#c9c9c9'
                        },
                    }
                };
                this.createChart('chart_objects', doughnutChartData);
                
                // 도넛차트 - legends 길이에 따라 차트 중앙에 있는 글자 위치도 변경되어야 함.
                let maxWidth = 0;
                this.items.forEach(element => {
                    const textWidth = this.measureText(element.name, '17', 'font-family: "SpoqaHanSans"').width
                    if (maxWidth < textWidth)
                        maxWidth = textWidth;
                });
                const totalObj = document.getElementById('totalObjects');
                totalObj.style.marginLeft = 205-(maxWidth/2).toString() + 'px';

                //line-areaChart 생성코드
                const areaChartData = {
                    type: 'line',
                    data: {
                        labels: ['1월', '2월', '3월', '4월', '5월', '6월', '7월'],
                        datasets: this.getAreaChartDataSet(this.items, this.colors)
                    },
                    options: {
                        responsive: true,
                        elements: {
                            point: { hoverRadius: 6, hoverBorderColor: 'white', hoverBorderWidth: 6 },
                            fill: 'start'
                        },
                        tooltips: {
                            mode: 'index', intersect: false, position: 'nearest', backgroundColor:'white',
                            titleFontSize:20, titleFontColor:'black', titleAlign:'center', titleMarginBottom:13, 
                            bodyFontSize:15, bodyFontColor:'black', bodySpacing:5, 
                            borderWidth:1, borderColor:'#c9c9c9'
                        },
                        hover: {
                            mode: 'index', intersect: false
                        },
                        legend: {
                            position: 'right', align: 'end',
                            labels: { boxWidth: 17, fontSize: 17, fontColor: 'black', padding: 12 }
                        }
                    }
                }
                this.createChart('chart_frequencyOfUse', areaChartData);
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
    height: 100%;
}

.stats > .container .objSize {
    height: 80%;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-around;
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
    margin-top:0.5vh;
    height: 8px;
    transition: width 1s;
}
</style>
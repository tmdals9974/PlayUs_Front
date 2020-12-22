<template>
    <main class="main-container">
        <div class="sub-container-1180" style="width:1180px;">
            <span class="spoqaHanSans bold h2-like">{{ this.project.name }}</span>
            <section class="tab-menu spoqaHanSans bold h5-like">
                <span v-for="(tab, index) in tabs" v-bind:key="index" v-bind:class="{active : tab.title === selectedTab}" @click="selectedTab = tab.title">
                    {{ tab.title }} <div v-if="tab.subMenu" class="arrow"/>
                </span>
            </section>

            <section v-show="selectedTab === tabs[0].title" class="tab-content-stats">
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

            <section v-show="selectedTab === tabs[1].title" style="margin-top:2vh;">
                <div class="spoqaHanSans h5-like collection" @click="showModal=1">새 컬렉션 만들기</div>
                <div class="spoqaHanSans h5-like collection" v-for="(item, index) in project.collection" :key="index" >
                    {{ item }}
                </div>

                <modal v-if="showModal==1">
                    <h3 slot="header" class="spoqaHanSans h5-like">컬렉션 생성</h3>
                    <div slot="body">
                        <article class="span-input-set spoqaHanSans h6-like">
                            <span>컬렉션 이름</span>
                            <input class="items" type="text" v-model="newCollectionName" @keyup.enter="showModal=2"/>
                        </article>
                    </div>
                    <div slot="footer">
                        <input type="button" class="smallPlainButton spoqaHanSans h6-like" value="취소" @click="createCollectionCancel()">
                        <input type="button" class="smallThemeButton spoqaHanSans h6-like" value="다음" @click="createCollectionNext()">
                    </div>
                </modal>

                <modal v-if="showModal==2">
                    <h3 slot="header" class="spoqaHanSans h5-like">컬렉션 생성</h3>
                    <div slot="body" class="spoqaHanSans">
                        <span class="h5-like" style="margin-left:30px;">{{ newCollectionName }}</span>
                        <field v-for="item in fields" :key="item.num" :num="item.num" v-on:nameChange="nameChange" v-on:typeChange="typeChange" v-on:defaultChange="defaultChange">
                            <div class="field-minus" @click="fields.splice(fields.findIndex(field => field.num === item.num), 1);"> </div>
                        </field>
                        <div class="vertical-line">
                            <div style="display:flex; flex-flow:row nowrap">
                                <div class="horizontal-line"></div>
                                <div class="h6-like new-field">
                                    <div class="field-plus" @click="fields.push({num : ++fieldCount,  type : 'String', default : undefined})"> </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div slot="footer">
                        <input type="button" class="smallPlainButton spoqaHanSans h6-like" value="취소" @click="createCollectionCancel()">
                        <input type="button" class="smallThemeButton spoqaHanSans h6-like" value="저장" @click="createCollection()">
                    </div>
                </modal>
            </section>
        </div>
    </main>
</template>

<script>
import modal from './common/modal.vue';
import field from './common/field.vue';

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
            },

            showModal: 0,
            newCollectionName: '',
            fields: [{num : 0, name : '', type : 'String', default : undefined}],
            fieldCount: 0
        }
    },
    methods: {
        createCollectionCancel() {
            this.showModal = 0;
            this.createCollectionClear();
        },
        createCollectionNext() {
            if (this.newCollectionName == '')
                return alert('컬렉션 이름을 입력해주세요.');
            this.showModal = 2;
        },
        createCollectionClear() {
            this.showModal = 0;
            this.newCollectionName = '';
            this.fields = [0];
            this.fieldCount = 0;
        },
        createCollection() {
            this.fields.map(item => { delete item.num; return item; });
            
            this.$http.post(`projects/${this.project._id}/collections`, {
                collectionName : this.newCollectionName,
                collectionRules : this.fields
            })
            .then(result => {
                if (!result.data.success) 
                    return alert(result.data.msg);
                this.project.collection.push(this.newCollectionName);
                this.createCollectionClear();
            })
            .catch(err => {
                alert(this.$errMsg);
                console.log(err);
            })
        },
        nameChange(num, data) {
            const index = this.fields.findIndex(field => field.num === num);
            this.fields[index].name = data;
        },
        typeChange(num, data) {
            const index = this.fields.findIndex(field => field.num === num);
            this.fields[index].type = data;
        },
        defaultChange(num, data) {
            const index = this.fields.findIndex(field => field.num === num);
            this.fields[index].default = data;
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
    components: {
        modal, field
    }
}
</script>

<style scoped>
.smallThemeButton {
    background-color: #5F62E2;
    color: white;
    border-radius: 4px;
    border-style: none;
    cursor: pointer;
    outline: none;
    padding: 3px 8px;
}

.smallPlainButton {
    background-color: transparent;
    border: none;
    outline: none;
    padding: 3px 8px;
}

>>> .field-minus {
    margin: 38px 0px 0px 10px;
    width:20px; 
    height:20px; 
    cursor:pointer;
    background-image: url('../assets/images/minus.png');
    background-size: cover;
}

>>> .field-minus:hover {
    background-image: url('../assets/images/minus_hover.png');
}

>>> .field-plus {
    width:20px; 
    height:20px; 
    margin:40px 0 0 3px; 
    cursor:pointer;
    background-image: url('../assets/images/plus.png');
    background-size: cover;
}

>>> .field-plus:hover {
    background-image: url('../assets/images/plus_hover.png');
}

>>> .vertical-span-item-set > select.item {
    padding: 4px;
}

>>> .vertical-span-item-set > .item {
    width:130px; 
    padding: 5px; 
    border-radius:4px; 
    border: 1px solid #9f9f9e;
}

>>> .vertical-span-item-set > span {
    padding-bottom: 10px;
    color:#707070;
}

>>> .vertical-span-item-set {
    display:flex; 
    flex-flow:column nowrap; 
    align-content:center;
}

>>> .new-field {
    display:flex; 
    flex-flow:row nowrap; 
    margin:40px 0 0 0;
}

>>> .horizontal-line {
    border:none;
    height: 90px;
    border-bottom: 1.5px dashed #BCBCBC;
    width: 25px;
}

>>> .vertical-line {
    border:none;
    border-left: 1.5px dashed #BCBCBC;
    height:90px;
    margin-left: 2.5vw;
}

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

.tab-content-stats {
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

.collection {
    margin-left:2vw; 
    color:#9e9e9e;
    cursor: pointer;
}

.collection:hover {
    color:#5F62E2;
    font-weight: bold;
    text-decoration: underline;
}
</style>
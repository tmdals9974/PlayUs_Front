<template>
    <main class="main-container">
        <div class="sub-container-580" style="width:580px;">
            <span class="spoqaHanSans bold h2-like">프로젝트 생성하기</span>

            <section class="center-box" style="margin-top:8vh;">
                <article class="span-input-set spoqaHanSans h5-like">
                    <span>프로젝트 이름</span>
                    <input class="items" type="text" v-model="projectName"/>
                </article>
                <article class="span-input-set">
                    <span class="spoqaHanSans h5-like">리턴 타입</span>
                    <div class="items Kanit regular h5-like">
                        <input type="radio" name="returnType" id="JSON" value="0" v-model="returnType"/> 
                        <label for="JSON">JSON</label>
                        <input type="radio" name="returnType" id="XML" value="1" v-model="returnType">
                        <label for="XML">XML</label>
                    </div>
                </article>
                <article class="span-input-set">
                    <span class="spoqaHanSans h5-like">잠금모드</span>
                    <div class="items spoqaHanSans h5-like">
                        <input type="checkbox" id="lock" v-model="isLock"/>
                        <label class="toggle-switch" for="lock"/>
                        <span>{{lockMode}}</span>
                    </div>
                </article>
                <article class="span-input-set" style="height:auto;">
                    <span class="spoqaHanSans h5-like">프로젝트 소개</span>
                    <textarea class="items spoqaHanSans h5-like" width="100%" rows="3" v-model="content"></textarea>
                </article>
            </section>
            
            <input type="button" class="themeButton spoqaHanSans h4-like bold" style="line-height:5vh; margin-top:7vh;" value="생성하기" @click="postTest()">
        </div>
    </main>
</template>

<script>
export default {
    data() {
        return {
            projectName: '',
            returnType: 0,
            isLock : false,
            content : ''
        }
    },
    computed: {
        lockMode() {
            return this.isLock ? "사용" : "미사용";
        }
    },
    methods: {
        postTest() {
            var name = this.projectName;
            var returnType = this.returnType;
            var lock = this.isLock;
            var content = this.content;

            this.$http.post('projects', {name, returnType, lock, content})
            .then(result => {
                if (!result.data.success) 
                    return alert(result.data.msg);

                this.$store.commit('addProject', result.data.details);
                this.$router.push('/projects');
            })
            .catch(err => {
                alert(this.$errMsg);
                console.log(err);
            })
        }
    }
}
</script>

<style scoped>
.span-input-set {
    width: 100%;
    height: 4vh;
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    padding: 2.5vh 0 2.5vh 2.5vh;
}

.span-input-set span {
    width: 25%;
}

.span-input-set .items {
    width:75%; 
    display:flex; 
    flex-flow:row nowrap; 
    justify-content: flex-start; 
    align-items: center;
}

input[type="radio"] {
    display: none;
}

input[type="radio"] + label {
    width:100%;
    line-height: 4vh;
    cursor: pointer;
    padding-left: 40px;
    background: url('../assets/images/radiobutton.png') left/30px no-repeat;
}

input[type="radio"]:checked + label {
    background-image: url('../assets/images/radiobutton_check.png');
}

label.toggle-switch {
    text-indent: -9999px;
	width: 75px;
	height: 37px;
	background: #9e9e9e;
	display: block;
	border-radius: 100px;
	position: relative;
    margin-right: 10px;
    cursor: pointer;
}

label.toggle-switch:after {
	content: '';
	position: absolute;
	top: 3.5px;
	left: 5px;
	width: 30px;
	height: 30px;
	background: #fff;
	border-radius: 90px;
	transition: 0.3s;
}

input:checked + label.toggle-switch {
	background: #5F62E2;
}

input:checked + label.toggle-switch:after {
	left: calc(100% - 5px);
	transform: translateX(-100%);
}

label.toggle-switch:active:after {
	width: 50px;
}
</style>
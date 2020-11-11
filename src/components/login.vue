<template>
    <main class="main-container" style="margin-top:30px;">
        <div class="sub-container-580">
            <span class="kanit" id="title" style="letter-spacing: 1px; font-size: 4.0rem; color: #5f62e2;">{{titles[tryLogin ? 0 : 1]}}</span>
            <section class="tabBtn spoqaHanSans bold">
                <div v-bind:class="{active : tryLogin}" id="tab_Login" @click="tryLogin=true">
                    회원 로그인
                </div>
                <div v-bind:class="{active : !tryLogin}" id="tab_Join" @click="tryLogin=false">
                    회원 가입
                </div>
            </section>

            <section v-show="tryLogin" class="center-box" id="loginBox">
                <div class="userInfo">
                    <input type="text" class="input-userInfo kanit h4-like light" placeholder="EMAIL" id="loginBox_email">
                    <input type="password" class="input-userInfo kanit h4-like light" placeholder="PW" id="loginBox_pw">
                </div>
                <div class="checkBox_oneItem spoqaHanSans h5-like regular">
                    <input type="checkbox" id="chk_autoLogin">
                    <label class="checkBox" for="chk_autoLogin" >로그인 상태 유지</label>
                </div>
                <input type="button" class="themeButton kanit h3-like regular" value="LOG IN" @click="login()">
                <span class="spoqaHanSans regular" style="margin-top: 3vh; cursor: pointer; font-size: 1.6rem; text-decoration: underline; color:#757575">비밀번호 찾기</span>
            </section>

            <section v-show="!tryLogin" class="center-box" id="joinBox">
                <div class="userInfo">
                    <input type="text" class="input-userInfo kanit h4-like light" placeholder="EMAIL" id="joinBox_email" @blur="idCheck()">
                    <input type="password" class="input-userInfo kanit h4-like light" placeholder="PW" id="joinBox_pw">
                    <!-- <input type="text" class="input-userInfo spoqaHanSans h4-like regular" placeholder="인증번호 입력"> -->
                </div>
                <div class="checkBox_oneItem spoqaHanSans h5-like regular">
                    <input type="checkbox" id="chk_receiveMail">
                    <label class="checkBox" for="chk_receiveMail">이메일 수신에 동의합니다.</label>
                </div>
                <input type="button" class="themeButton kanit h3-like regular" style="letter-spacing: 0.14rem;" value="SIGN IN" @click="join()">
            </section>
        </div>
    </main>
</template>

<script>
export default {
    data() {
        return {
            tryLogin : true,
            titles : ['LOG IN', 'SIGN IN'],
            idChecked : false
        }
    },
    methods: {
        login() {
            const input_email = document.querySelector('#loginBox_email');
            const email = input_email.value.trim();

            if (!email) { 
                alert('이메일을 입력해주세요.'); 
                return input_email.focus(); 
            }

            const input_password = document.querySelector('#loginBox_pw');
            const password = input_password.value.trim();

            if (!password) { 
                alert('비밀번호를 입력해주세요.'); 
                return input_password.focus();
            }

            this.$http.post('users/login', {email, password})
            .then(result => {
                if (!result.data.success) 
                    return alert(result.data.msg);

                const user = { email, project : result.data.details };
                this.$store.commit('setUser', user);
                this.$router.push(this.$store.getters.hasProject ? '/projects' : '/createProject');
            })
            .catch(err => {
                alert(this.$errMsg);
                console.log(err);
            })
        },
        
        idCheck() {
            const input_email = document.querySelector('#joinBox_email');
            const email = input_email.value.trim();

            if (!email) return;

            this.$http.get(`users/check/${email}`)
            .then(result => {
                if (result.data.success) {
                    this.idChecked = false;
                    return alert("이미 가입된 이메일입니다.");
                }
                this.idChecked = true;
            })
            .catch(err => {
                alert(this.$errMsg);
                console.log(err);
            })
        },

        join() {
            if (!this.idChecked)
                return alert("이미 가입된 이메일입니다.");

            const input_email = document.querySelector('#joinBox_email');
            const email = input_email.value.trim();
            if (!email) { 
                alert('이메일을 입력해주세요.'); 
                return input_email.focus(); 
            }

            const input_password = document.querySelector('#joinBox_pw');
            const password = input_password.value.trim();
            if (!password) { 
                alert('비밀번호를 입력해주세요.'); 
                return input_password.focus(); 
            }

            const receiveMail = document.querySelector('#chk_receiveMail').checked;

            this.$http.post('users/', {email, password, receiveMail})
            .then(result => {
                if (!result.data.success) 
                    return alert(result.data.msg);
                alert("성공적으로 가입되었습니다.");
                this.tryLogin = true;
            })
            .catch(err => {
                alert(this.$errMsg);
                console.log(err);
            })
        }
    },
}
</script>

<style scoped>

    .tabBtn {
        display:flex;
        flex-flow: row nowrap;
        margin-top : 1.5vh;
        color : #bdbdbd;
        width : 100%;
    }

    .tabBtn > div {
        border-top: solid 5px #bdbdbd;
        font-size: 2.0rem;
        text-align: center;
        width:100%;
        line-height: 7vh;
        cursor: pointer;
    }

    .tabBtn > .active {
        border-top: solid 5px #5F62E2;
        color: #5F62E2;
    }

    .userInfo {
        width:100%;
        margin-top: 4vh;
    }

    .userInfo > .input-userInfo {
        width: calc(100% - 2.5vh);
        margin-top: 1.3vh;
        letter-spacing: 0.14rem;
        padding: 2.5vh 0 2.5vh 2.5vh;
        border: none;
        border:solid 1.0px #bdbdbd;
        border-radius: 4px;
    }
    
    .checkBox_oneItem {
        display: flex;
        flex-flow: row nowrap;
        align-self: flex-start;
        justify-content: flex-start;
        align-items: flex-start;
        margin-top: 2vh;
        margin-bottom: 1.5vh;
    }

</style>
<template>
        <main>
        <span class="kanit" id="title" style="letter-spacing: 1px; font-size: 4.0rem;">{{titles[tryLogin ? 0 : 1]}}</span>
        <section class="tabBtn spoqaHanSans bold">
            <div v-bind:class="{active : tryLogin}" id="tab_Login" @click="tryLogin=true">
                회원 로그인
            </div>
            <div v-bind:class="{active : !tryLogin}" id="tab_Join" @click="tryLogin=false">
                회원 가입
            </div>
        </section>

        <section v-show="tryLogin" class="box" id="loginBox">
            <div class="userInfo">
                <input type="text" class="input-userInfo kanit h4-like light" placeholder="EMAIL" id="loginBox_email">
                <input type="password" class="input-userInfo kanit h4-like light" placeholder="PW" id="loginBox_pw">
            </div>
            <div class="checkBox_oneItem spoqaHanSans h5-like regular">
                <input type="checkbox" id="chk_autoLogin">
                <label for="chk_autoLogin">로그인 상태 유지</label>
            </div>
            <input type="button" class="kanit h3-like regular" value="LOG IN" @click="login()">
            <span class="spoqaHanSans regular" style="margin-top: 3vh; cursor: pointer; font-size: 1.6rem; text-decoration: underline; color:#757575">비밀번호 찾기</span>
        </section>

        <section v-show="!tryLogin" class="box" id="joinBox">
            <div class="userInfo">
                <input type="text" class="input-userInfo kanit h4-like light" placeholder="EMAIL" id="joinBox_email" @blur="idCheck()">
                <input type="password" class="input-userInfo kanit h4-like light" placeholder="PW" id="joinBox_pw">
                <!-- <input type="text" class="input-userInfo spoqaHanSans h4-like regular" placeholder="인증번호 입력"> -->
            </div>
            <div class="checkBox_oneItem spoqaHanSans h5-like regular">
                <input type="checkbox" id="chk_receiveMail">
                <label for="chk_receiveMail">이메일 수신에 동의합니다.</label>
            </div>
            <input type="button" class="kanit h3-like regular" value="SIGN IN" @click="join()">
        </section>
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
            var input_email = document.querySelector('#loginBox_email');
            var email = input_email.value.trim();

            if (!email) { 
                alert('이메일을 입력해주세요.'); 
                return input_email.focus(); 
            }

            var input_password = document.querySelector('#loginBox_pw');
            var password = input_password.value.trim();

            if (!password) { 
                alert('비밀번호를 입력해주세요.'); 
                return input_password.focus();
            }

            this.$http.post('users/login', {email, password})
            .then(result => {
                if (!result.data.success) 
                    return alert(result.data.msg);
            })
            .catch(err => {
                alert(this.$errMsg);
                console.log(err);
            })
        },

        idCheck() {
            var input_email = document.querySelector('#joinBox_email');
            var email = input_email.value.trim();

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

            var input_email = document.querySelector('#joinBox_email');
            var email = input_email.value.trim();
            if (!email) { 
                alert('이메일을 입력해주세요.'); 
                return input_email.focus(); 
            }

            var input_password = document.querySelector('#joinBox_pw');
            var password = input_password.value.trim();
            if (!password) { 
                alert('비밀번호를 입력해주세요.'); 
                return input_password.focus(); 
            }

            var receiveMail = document.querySelector('#chk_receiveMail').checked;

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
    main {
        position: absolute;
        top:23%;
        left:35%;
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: center;
        width: 30%;
    }

    main span {
        color : #5F62E2;
    }

    .box {
        width: 100%;
        display:flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: center;
    }

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

    input[type="button"] {
        margin-top : 3vh;
        letter-spacing: 0.14rem;
        background-color: #5F62E2;
        color: white;
        width: 100%;
        padding-top: 1vw;
        padding-bottom: 1vw;
        border-radius: 4px;
        border-style: none;
        cursor: pointer;
        outline: none;
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

    .checkBox_oneItem > input[type="checkbox"] {
        width : 30px;
        height: 30px;
        border: 1px solid #bcbcbc;
        border-radius: 4px;
        margin-right: 0.5vw;
        cursor: pointer;
    }

    .checkBox_oneItem > label {
        cursor: pointer;
    }

    input::placeholder {
        color : #9e9e9e
    }
</style>
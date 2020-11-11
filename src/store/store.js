import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex); //전역사용 선언

const storage = {
    autoLogin() {
        //autoLogin check..
        return null;
    }
}

export const store = new Vuex.Store({
    state: {
        user: storage.autoLogin()
    },
    getters: {
        isLogin(state) {
            return state.user === null ? false : true;
        },
        hasProject(state) {
            if (state.user === null)
                return false;
            if (state.user.project === undefined)
                return false;
            if (state.user.project.length === 0)
                return false;
            return true;
        },
        getEmail(state) {
            if (state.user === null)
                return '';
            const id = state.user.email.split('@')[0];
            return id.length < 6 ? id : id.substr(0, 5);            
        }
    },
    mutations: {
        setUser(state, payload) {
            state.user = payload;
        },
        addProject(state, payload) {
            state.user.project.push(payload);
        }
    },
    actions: {
        logout(context, payload) {
            payload.$http.post('users/logout')
            .then(result => {
                if (!result.data.success)
                    return alert("로그아웃에 실패하였습니다.");
                context.commit('setUser', null);
                payload.$router.push('/login');
            })
            .catch(err => {
                alert(this.$errMsg);
                console.log(err);
            })
        }
    },
    plugins: [
        createPersistedState({ storage: window.sessionStorage })
    ]
})
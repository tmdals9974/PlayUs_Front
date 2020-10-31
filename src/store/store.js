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
    plugins: [
        createPersistedState({ storage: window.sessionStorage })
    ]
})
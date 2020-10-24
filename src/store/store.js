import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex); //전역사용 선언

const storage = {
    loginCheck() {
        var isLogin = false;
        //autoLogin check
        return isLogin;
    }
}

export const store = new Vuex.Store({
    state : {
        isMainPage : true,
        isLogin : storage.loginCheck(),
        hasProject : false
    },
    // getters: {
    //     storedTodoItems(state) {
    //         return state.todoItems;
    //     }
    // },
    mutations : {
        // addTodoItem(state, newTodoItem) {
        //     const obj = {completed: false, item: newTodoItem};
        //     localStorage.setItem(newTodoItem, JSON.stringify(obj));
        //     state.todoItems.push(obj);
        // },
        // completeItem(state, payload) {
        //     state.todoItems[payload.index].completed = !state.todoItems[payload.index].completed;
        //     localStorage.setItem(payload.todoItem.item, JSON.stringify(payload.todoItem));
        // }
    }
})
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        appName: '',
        SStorage: null,
        goTo: null
    },
    getters: {
        appName(state) {
            return state.appName
        },
        SStorage(state) {
            return state.SStorage
        },
        goTo(state) {
            return state.goTo;
        }
    },
    // commit
    mutations: {
        setAppName(state, appName) {
            state.appName = appName
        },
        setSStorage(state, SStorage) {
            state.SStorage = SStorage
        },
        setGoTo(state, goTo) {
            state.goTo = goTo;
        }
    },
    // dispatch
    actions: {

    }
})

export default store
import { createStore } from 'vuex'
import getters from './getters'
import mutations from './mutations'
import modules from './modules'
import createPersistedState from "vuex-persistedstate"

const state = {
}

const PersistedState = createPersistedState({
    paths: ['auth']
})

export default createStore({
    state,
    getters,
    mutations,
    modules,
    plugins: [PersistedState]
})

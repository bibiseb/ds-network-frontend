import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import actions from './actions'
import mutations from './mutations'

const store = new Vuex.Store({
  state: {
    user: null
  },
  actions,
  mutations
})

export default store
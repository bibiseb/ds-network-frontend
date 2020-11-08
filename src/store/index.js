import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import getters from './getters'
import actions from './actions'
import mutations from './mutations'

const store = new Vuex.Store({
  state: {
    user: null,
    cart: [],
    order: null
  },
  getters,
  actions,
  mutations
})

export default store
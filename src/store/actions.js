import authApi from '../api/auth'
import checkoutApi from '../api/checkout'

export default {
  getUser({ commit }) {
    return new Promise((resolve, reject) => {
      authApi.get().then((user) => {
        commit('setUser', user)
        resolve()
      }).catch((error) => {
        reject(error)
      })
    })
  },
  login({ commit }, payload) {
    return new Promise((resolve, reject) => {
      authApi.login(payload).then((user) => {
        commit('setUser', user)
        resolve()
      }).catch((error) => {
        reject(error)
      })
    })
  },
  logout({ commit }) {
    return new Promise((resolve, reject) => {
      authApi.logout().then(() => {
        commit('setUser', null)
        resolve()
      }).catch((error) => {
        reject(error)
      })
    })
  },
  addToCart({ commit, state }, { _id, name, price, quantity }) {
    const item = state.cart.find((item) => item._id === _id)
    if (!item) {
      const cart = state.cart
      cart.push({ _id, name, price, quantity: quantity ? quantity : 1 })
      commit('setCart', cart)
    } else {
      item.quantity += quantity ? quantity : 1
      const index = state.cart.findIndex((item) => item._id === _id)
      const cart = state.cart
      cart.splice(index, 1, item)
      commit('setCart', cart)
    }
  },
  removeFromCart({ commit, state }, { _id }) {
    const item = state.cart.find((item) => item._id === _id)
    if (item) {
      const index = state.cart.findIndex((item) => item._id === _id)
      const cart = state.cart
      cart.splice(index, 1)
      commit('setCart', cart)
    }
  },
  checkout({ commit }, payload) {
    return new Promise((resolve, reject) => {
      checkoutApi.order(payload).then((order) => {
        commit('setOrder', order)
        resolve()
      }).catch((error) => {
        reject(error)
      })
    })
  }
}
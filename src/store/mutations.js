export default {
  setUser(state, user) {
    state.user = user
  },
  setCart(state, payload) {
    state.cart = payload
  },
  setOrder(state, payload) {
    state.order = payload
  }
}
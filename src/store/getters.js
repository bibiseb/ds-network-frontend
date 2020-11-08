export default {
  inCart: (state) => (video) => {
    return state.cart.find(item => item._id === video._id)
  }
}
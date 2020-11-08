import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters([
        'inCart'
    ]),
    ...mapState({
      cart: state => state.cart,
      order: state => state.order
    }),
    total() {
      return this.cart.reduce((accumulator, item) => accumulator + (item.price * item.quantity), 0)
    },
    empty() {
      return this.cart.length === 0
    },
    canCheckout() {
      return this.order === null
    }
  },
  methods: {
    ...mapActions([
      'addToCart',
      'removeFromCart',
      'checkout'
    ]),
    format(price) {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'EUR' }).format(price)
    }
  }
}
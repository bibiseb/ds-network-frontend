<template>
  <div id="cart">
    <h2>Cart</h2>
    <template v-if="!empty">
      <ul>
        <li v-for="item in cart" :key="item._id">
          {{ item.name }} x{{ item.quantity }}
          <button @click="removeFromCart(item)">x</button>
        </li>
      </ul>
      <p v-if="canCheckout">
        <button @click="setOrder" :disabled="busy">
          Order for {{ format(total) }}
        </button>
      </p>
    </template>
    <p v-else>Your cart is empty</p>
  </div>
</template>

<script>
import cartMixin from '../mixins/cart'

export default {
  name: 'Cart',
  mixins: [cartMixin],
  data() {
    return {
      busy: false
    }
  },
  methods: {
    setOrder() {
      this.busy = true
      const items = this.cart.map((item) => { return { _id: item._id, quantity: item.quantity } })
      this.checkout({ items }).
      then(() => {
        this.$router.push(`/checkout/${this.order._id}`)
      }).catch((error) => {
        console.error(error)
      }).finally(() => {
        this.busy = false
      })
    }
  }
}
</script>

<style>
#cart {
  padding: 15px;
  border-radius: 5px;
  border: 1px solid mediumaquamarine;
}
</style>
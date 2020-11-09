<template>
  <div id="checkout" class="box" v-if="!loading">
    <h2>Checkout</h2>
    <table>
      <thead>
        <tr>
          <th>Video</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in order.items" :key="item._id">
          <td>{{ item.name }} x{{ item.quantity }}</td>
          <td class="checkout__price">{{ format(item.total) }}</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <th>Total</th>
          <td>{{ format(order.total) }}</td>
        </tr>
      </tfoot>
    </table>
    <div v-if="!authenticated">
      <h2>Login</h2>
      <auth :location="location"></auth>
    </div>
    <div v-else-if="order.status !== 'PAID'" class="checkout__pay">
      <button @click="pay" :disabled="busy">
        Pay with Paypal
      </button>
    </div>
    <div v-else>
      <p>Thanks for you order!</p>
    </div>
  </div>
  <div id="checkout" class="box" v-else>
    <div class="loading__wrapper">
      <loading></loading>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Loading from './loading'
import Auth from './auth'
import authMixin from '../mixins/auth'
import cartMixin from '../mixins/cart'
import payApi from '../api/pay'

export default {
  name: 'Checkout',
  components: {
    Loading,
    Auth
  },
  mixins: [authMixin, cartMixin],
  data() {
    return {
      loading: false,
      busy: false
    }
  },
  computed: {
    ...mapState({
      order: state => state.order
    }),
    location() {
      return `/checkout/${this.order._id}`
    }
  },
  watch: {
    authenticated(newValue) {
      if (newValue && this.order && !this.order.userId) {
        this.ownOrder(this.order._id).catch((error) => {
          console.error(error)
        })
      }
    }
  },
  methods: {
    ...mapActions([
      'loadOrder',
      'ownOrder'
    ]),
    format(price) {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'EUR' }).format(price)
    },
    pay() {
      this.busy = true
      payApi.pay(this.order._id, { location: this.location }).then((result) => {
        window.location.replace(result.redirect)
      }).catch((error) => {
        console.error(error)
        this.busy = false
      })
    }
  },
  created() {
    if (!this.order) {
      this.loading = true
      this.loadOrder(this.$route.params.orderId).then(() => {
        if (this.authenticated && !this.order.userId) {
          this.ownOrder(this.order._id).catch((error) => {
            console.error(error)
          })
        }
        if (this.order.status === 'PAID') {
          this.resetCart()
        }
      }).catch((error) => {
        console.error(error)
      }).finally(() => {
        this.loading = false
      })
    }
  }
}
</script>

<style>
.checkout__price {
  width: 100px;
}
.checkout__pay {
  text-align: center;
  padding: 15px;
}
.checkout__pay button {
  background: mediumaquamarine;
  color: white;
}
#checkout .loading__wrapper {
  width: 100px;
  height: 100px;
  margin: auto;
}
</style>
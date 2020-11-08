<template>
  <div id="checkout" class="box">
    <h2>Checkout</h2>
    <table>
      <thead>
        <tr>
          <th>Label</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in order.items" :key="item._id">
          <td>{{ item.name }} x{{ item.quantity }}</td>
          <td>{{ format(item.total) }}</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <th>Total</th>
          <td>{{ format(order.total) }}</td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Checkout',
  computed: {
    ...mapState({
      order: state => state.order
    })
  },
  methods: {
    format(price) {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'EUR' }).format(price)
    }
  }
}
</script>
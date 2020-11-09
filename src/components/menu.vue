<template>
  <div id="menu" class="box">
    <cart v-if="showCart"></cart>
    <ul>
      <li><router-link to="/">Home</router-link></li>
      <li><router-link to="/todos">Objectives</router-link></li>
      <li><router-link to="/videos">Videos</router-link></li>
      <li><router-link to="/contact">Contact</router-link></li>
      <li>
        <a href="#" @click.prevent="logout" v-if="authenticated">Logout</a>
        <router-link to="/auth" v-else>Login</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import authMixin from '../mixins/auth'
import { mapActions } from 'vuex'
import Cart from './cart'

export default {
  name: 'User',
  mixins: [authMixin],
  components: {
    Cart
  },
  computed: {
    showCart() {
      return this.$route.name !== 'checkout'
    }
  },
  methods: {
    ...mapActions([
      'logout'
    ])
  }
}
</script>

<style>
#menu.box {
  text-align: center;
  flex-basis: 25%;
}
#menu li {
  border: none;
}
#menu a {
  display: block;
  color: #333;
  text-decoration: none;
  text-transform: uppercase;
  font-weight: bold;
  transition: background .1s ease-in-out,
              transform .1s ease-in-out,
              padding .1s ease-in-out,
              margin .1s ease-in-out;
}

#menu a:hover {
  color: #333;
  background: mediumaquamarine;
  transform: scale(1.5) rotate(-2deg);
  padding: 5px 0;
  margin: -5px 0;
}
</style>
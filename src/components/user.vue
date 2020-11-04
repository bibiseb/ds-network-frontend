<template>
  <div id="user" v-if="authenticated">
    Hello {{ user.name }}!<br>
    <a href="#" @click.prevent="logout">(logout)</a>
  </div>
  <router-link id="user" v-else to="/auth">(login)</router-link>
</template>

<script>
import authMixin from '../mixins/auth'
import { mapActions } from 'vuex'

export default {
  name: 'User',
  mixins: [authMixin],
  methods: {
    ...mapActions([
      'logout'
    ])
  }
}
</script>

<style>
#user {
  float: right;
  text-align: right;
}
</style>
<template>
  <div id="user" class="box" v-if="authenticated">
    Hello, {{ user.name }}
    <a href="#" @click.prevent="logout">(logout)</a>
  </div>
  <div id="user" class="box" v-else>
    <router-link to="/auth">(login)</router-link>
  </div>
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
  text-align: center;
}
</style>
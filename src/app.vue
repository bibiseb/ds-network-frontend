<template>
  <div id="app">
    <header>
      <user></user>
      <h1><router-link to="/">DS-Network</router-link></h1>
      <introduction></introduction>
    </header>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import User from './components/user'
import Introduction from './components/introduction'

export default {
  name: 'App',
  components: {
    User,
    Introduction
  },
  methods: {
    ...mapActions([
      'getUser'
    ])
  },
  created() {
    this.getUser().catch(() => {})
  }
}
</script>

<style>
html, body {
  margin: 0;
  padding: 10px;
  font-family: Arial, sans-serif;
  font-size: 14px;
  color: #333;
}
#app {
  margin: auto;
  max-width: 1024px;
}
#app > header {
  border: 1px solid lightgrey;
  border-radius: 5px;
  padding: 15px;
}
</style>
<template>
  <div id="app">
    <h1>
      <router-link to="/">
        DS <span>network</span>
      </router-link>
    </h1>
    <div class="row">
      <introduction></introduction>
      <router-view></router-view>
      <user></user>
    </div>
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
*, *::before, *::after {
  box-sizing: border-box;
}
html, body {
  margin: 0;
  padding: 15px;
  font-family: Arial, sans-serif;
  font-size: 16px;
  color: #333;
  background: #F0F0FF;
}
#app {
  margin: auto;
  max-width: 1024px;
}
h1 {
  font-size: 6rem;
  background: mediumaquamarine;
  width: 150px;
  height: 150px;
  text-align: center;
  margin: auto;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
}
h1 a {
  color: #333;
  text-decoration: none;
}
h1 span {
  display: block;
  font-size: 1rem;
}
a {
  color: aquamarine;
}
.row {
  display: flex;
  justify-content: center;
  padding-top: 15px;
  flex-direction: row;
}
.box {
  margin: 15px;
  border: 1px solid lightgrey;
  padding: 15px;
  border-radius: 5px;
  background: white;
  box-shadow: 0 0 15px 1px rgba(0, 0, 0, .2);
  flex-grow: 1;
  width: 100%;
}
h2 {
  text-transform: uppercase;
  margin: 0 0 15px 0;
}
ul {
  margin: 0;
  padding: 0;
  list-style: none;
}
li {
  border-bottom: 1px solid rgba(0, 0, 0, .1);
  padding: 15px 10px;
}
li:last-child {
  border: none;
}
button, .button {
  border: none;
  padding: 10px;
  background: lightgrey;
  border-radius: 3px;
  margin: 1px;
  color: #333;
}
.form {

}
.form > div {
  margin-bottom: 15px;
}
.form input, .form textarea {
  border: 1px solid lightgrey;
  padding: 10px;
  width: 100%;
  border-radius: 3px;
}
.form .error {
  display: block;
  padding: 5px 10px;
  color: red;
}
.form__actions {
  display: flex;
}
.form__actions > * {
  width: 100%;
  flex-grow: 1;
}
.form__actions [type=submit] {
  background: mediumaquamarine;
  color: white;
}
.separator {
  display: flex;
  justify-content: center;
  border-bottom: 1px solid rgba(0, 0, 0, .1);
  font-size: 1.5rem;
  height: 14px;
}
.separator span {
  background: white;
  height: 200%;
  padding: 0 15px;
}

@media only screen and (max-width: 767px) {
  .row {
    flex-direction: column;
  }
  .box {
    margin: 30px 0 0 0;
  }
}
</style>
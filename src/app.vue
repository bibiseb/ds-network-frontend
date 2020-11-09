<template>
  <div id="app">
    <h1>
      <router-link to="/">
        DS <span>network</span>
      </router-link>
    </h1>
    <div class="row">
      <router-view></router-view>
      <app-menu></app-menu>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import AppMenu from './components/menu'
import 'video.js/dist/video-js.css'

export default {
  name: 'App',
  components: {
    AppMenu
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
body {
  margin: 0;
  padding: 0 15px;
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
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  position: sticky;
  margin: 0;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
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
  padding: 15px;
  background: white;
  position: relative;
  flex-basis: 100%;
}
.box:before {
  content: '';
  background: mediumaquamarine;
  position: absolute;
  z-index: -1;
  top: -2px;
  right: -2px;
  bottom: -2px;
  left: -2px;
  transform: skew(1deg, 1deg);
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
  font-size: 16px;
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
table {
  width: 100%;
}
th {
  text-align: left;
}
th, td {
  padding: 15px;
  border-bottom: 1px solid rgba(0, 0, 0, .1);
}
tfoot th, tfoot td {
  border-bottom: none;
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
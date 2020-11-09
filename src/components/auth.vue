<template>
  <div id="auth">
    <form class="form" @submit.prevent="submit">
      <div>
        <input type="email" v-model="email" id="login-email" required placeholder="E-mail">
      </div>
      <div>
        <input type="password" v-model="password" id="login-password" required placeholder="Password">
      </div>
      <div class="form__actions">
        <button type="submit" :disabled="busy">Login</button>
      </div>
    </form>
    <p class="separator"><span>or</span></p>
    <a :href="googleSigninUrl" class="button google">Google Sign in</a>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import config from '../config'

export default {
  name: 'Auth',
  props: {
    location: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      email: '',
      password: '',
      busy: false
    }
  },
  methods: {
    ...mapActions([
      'login'
    ]),
    submit() {
      this.busy = true
      const payload = {
        email: this.email,
        password: this.password
      }
      this.login(payload).then(() => {
        this.$router.push(this.location ? this.location : '/')
      }).catch((error) => {
        console.error(error)
      }).finally(() => {
        this.busy = false
      })
    }
  },
  computed: {
    googleSigninUrl() {
      let url = `${config.api.baseURL}auth/google`
      if (this.location) {
        url += `?location=${this.location}`
      }
      return url
    }
  }
}
</script>

<style>
.google {
  display: block;
  background: mediumaquamarine;
  color: white;
  text-decoration: none;
  text-align: center;
}
</style>
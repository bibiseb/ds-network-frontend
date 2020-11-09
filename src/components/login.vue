<template>
  <div id="login" class="box">
    <h2>Login</h2>
    <auth></auth>
  </div>
</template>

<script>
import Auth from './auth';
export default {
  name: 'Login',
  components: {
    Auth
  }
}
</script>
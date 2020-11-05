<template>
  <div id="not-found" class="box">
    <h2>Oops!</h2>
    <p>It seems you're lost. Let's get back <router-link to="/">home</router-link>.</p>
  </div>
</template>

<script>
export default {
  name: 'NotFound'
}
</script>
<template>
  <div id="introduction" class="box">
    <p>Welcome to my website!</p>
    <p>
      Hello! I'm Sébastien.<br>
      I was born in Liège (Belgium) in 1982.<br>
      I am currently developer at <a href="https://www.infinity-mobile.io/" target="_blank">Infinity Mobile</a>.
    </p>
    <p>
      You can find my website source code on GitHub.<br>
      There is one repository for <a href="https://github.com/bibiseb/ds-network-frontend" target="_blank">the frontend</a>
      and another one for <a href="https://github.com/bibiseb/ds-network-api" target="_blank">the backend</a>.<br>
      The frontend is hosted on Amazon S3 and is delivered by CloudFront while the backend runs on Amazon Lambda and is forwarded through the Amazon API Gateway.
    </p>
    <p>I you like my work, or want to comment it, feel free to <router-link to="/contact">leave a message</router-link>!</p>
    <p>You can also have a look at my <a href="https://www.linkedin.com/in/sdevroye/" target="_blank">LinkedIn profile</a>.</p>
  </div>
</template>

<script>
export default {
  name: 'Introduction'
}
</script>

<style>
#introduction {
  line-height: 26px;
}
#introduction p {
  margin: 0 0 15px 0;
}
</style>
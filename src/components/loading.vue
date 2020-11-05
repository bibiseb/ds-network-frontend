<template>
  <div class="loading">
    <span></span>
    <span></span>
    <span></span>
    <span></span>
  </div>
</template>

<script>
export default {
  name: 'Loading'
}
</script>

<style>
.loading {
  width: 100%;
  height: 100%;
  position: relative;
  animation-name: loading-container;
  animation-duration: 1s;
  animation-iteration-count: infinite;
}
@keyframes loading-container {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.loading > span {
  position: absolute;
  width: 50%;
  height: 50%;
  background: mediumaquamarine;
  transform: scale(.25);
  animation-name: loading;
  animation-duration: 10s;
  animation-iteration-count: infinite;
  border-radius: 50%;
}
.loading > span:nth-child(1) {
  top: 0;
  left: 0;
  animation-delay: .25s;
}
.loading > span:nth-child(2) {
  top: 0;
  right: 0;
  animation-delay: .50s;
}
.loading > span:nth-child(3) {
  bottom: 0;
  right: 0;
  animation-delay: .75s;
}
.loading > span:nth-child(4) {
  bottom: 0;
  left: 0;
  animation-delay: 1s;
}
@keyframes loading {
  0% {
    transform: scale(.25);
    border-radius: 50%;
  }
  25% {
    transform: scale(.5);
    border-radius: 25%;
  }
  50% {
    transform: scale(.75);
    border-radius: 0;
  }
  100% {
    transform: scale(.25);
    border-radius: 50%;
  }
}
</style>
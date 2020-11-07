<template>
  <div id="videos" class="box" v-if="!loading">
    <h2>Sample videos!</h2>
    <ul>
      <li v-for="video in videos" :key="video.id">
        <router-link :to="'/videos/' + video.key">{{ video.name }}</router-link>
      </li>
    </ul>
    <router-view :videos="videos"></router-view>
  </div>
  <div id="videos" class="box" v-else>
    <div class="loading__wrapper">
      <loading></loading>
    </div>
  </div>
</template>

<script>
import videoApi from '../api/video'
import Loading from './loading'

export default {
  name: 'Videos',
  components: {
    Loading
  },
  data() {
    return {
      videos: [],
      loading: false
    }
  },
  created() {
    this.loading =  true
    videoApi.get().then((videos) => {
      this.videos = videos
    }).catch((error) => {
      console.error(error)
    }).finally(() => {
      this.loading = false
    })
  }
}
</script>

<style>
#videos .loading__wrapper {
  width: 100px;
  height: 100px;
  margin: auto;
}
#videos .video-js {
  width: 100%;
  height: auto;
}
</style>
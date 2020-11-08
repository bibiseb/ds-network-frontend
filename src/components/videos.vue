<template>
  <div id="videos" class="box" v-if="!loading">
    <h2>Sample videos!</h2>
    <router-view :videos="videos"></router-view>
    <ul>
      <li v-for="video in videos" :key="video.id">
        <img v-if="video.image" :src="video.image">
        <h3>{{ video.name }}</h3>
        <p v-if="video.description">{{ video.description }}</p>
        <router-link :to="'/videos/' + video.key">View</router-link>
        <template v-if="video.price && !inCart(video)">
          - <a href="#" @click.prevent="addToCart(video)">Add to cart</a>
        </template>
      </li>
    </ul>
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
import cartMixin from '../mixins/cart'

export default {
  name: 'Videos',
  components: {
    Loading
  },
  mixins: [cartMixin],
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
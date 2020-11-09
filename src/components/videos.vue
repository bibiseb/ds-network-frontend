<template>
  <div id="videos" class="box" v-if="!loading">
    <h2>Sample videos!</h2>
    <router-view :videos="videos"></router-view>
    <ul>
      <template v-for="video in videos">
        <li :key="video.id" v-if="currentKey !== video.key">
          <img v-if="video.image" :src="video.image">
          <h3>{{ video.name }}</h3>
          <p v-if="video.description">{{ video.description }}</p>
          <router-link class="button" :to="'/videos/' + video.key" v-if="!video.price || owned(video)">View</router-link>
          <template v-if="video.price && !inCart(video) && !owned(video)">
            <a class="button" href="#" @click.prevent="addToCart(video)">Add to cart</a>
          </template>
        </li>
      </template>
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
import authMixin from '../mixins/auth'
import cartMixin from '../mixins/cart'

export default {
  name: 'Videos',
  components: {
    Loading
  },
  mixins: [authMixin, cartMixin],
  data() {
    return {
      videos: [],
      loading: false
    }
  },
  computed: {
    currentKey() {
      return this.$route.params.key
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
#videos ul li {
  overflow: auto;
}
#videos ul li img {
  float: left;
}
#videos ul li a {
  display: inline-block;
  background: mediumaquamarine;
  color: white;
  margin-top: 15px;
}
</style>
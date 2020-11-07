<template>
  <div id="video">
    <button type="button" v-if="!authorized" @click="watch" :disabled="busy">Pay &amp; Play</button>
    <video-player v-else :video-src="playerSrc" :player-id="'player-' + this.key" :player-options="playerOptions"></video-player>
  </div>
</template>

<script>
import videoApi from '../api/video'
import config from '../config'
import VideoPlayer from './video-player'

export default {
  name: 'Video',
  components: {
    VideoPlayer
  },
  props: {
    videos: {
      type: Array
    }
  },
  data() {
    return {
      key: null,
      authorized: false,
      busy: false,
      playerOptions: {
        controls: true,
        fluid: true,
        html5: {
          vhs: {
            withCredentials: true
          }
        }
      }
    }
  },
  computed: {
    playerSrc() {
      return config.videos.baseURL + this.key + '/' + this.key + '.m3u8'
    }
  },
  methods: {
    watch() {
      const video = this.videos.find((video) => video.key === this.key)
      if (video) {
        this.busy = true
        videoApi.watch(video._id).then(() => {
          this.authorized = true
        }).catch((error) => {
          console.error(error)
        }).finally(() => {
          this.busy = false
        })
      }
    }
  },
  created() {
    this.key = this.$route.params.key
  },
  beforeRouteUpdate(to, from, next) {
    if (this.authorized) {
      this.authorized = false
    }
    this.key = to.params.key
    next()
  }
}
</script>
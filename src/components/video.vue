<template>
  <div id="video">
    <button id="watch-video" type="button" v-if="!authorized" @click="watch" :disabled="busy">
      <img v-if="video && video.poster" :src="video.poster">
      <span>Play</span>
    </button>
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
        autoplay: true,
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
    video() {
      return this.videos.find((video) => video.key === this.key)
    },
    playerSrc() {
      return config.videos.baseURL + this.key + '/' + this.key + '.m3u8'
    }
  },
  methods: {
    watch() {
      if (this.video) {
        this.busy = true
        videoApi.watch(this.video._id).then(() => {
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

<style>
#watch-video {
  display: flex;
  width: 100%;
  padding-bottom: 56.25%;
  background: transparent;
  position: relative;
  cursor: pointer;
}
#watch-video img {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1;
}
#watch-video span {
  position: absolute;
  z-index: 2;
  display: inline-block;
  background: mediumaquamarine;
  width: 100px;
  padding: 15px;
  border-radius: 5px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-weight: bold;
  transition: .1s ease-in-out;
}
#watch-video:hover span {
  transform: scale(2) translate(-25%, -25%);
}
</style>
<template>
  <div id="video">
    <button type="button" v-if="!paid" @click="pay" :disabled="busy">Pay &amp; Play</button>
    <video-player v-else :video-src="playerSrc" :player-id="'player-' + this.key" :player-options="playerOptions"></video-player>
  </div>
</template>

<script>
import payApi from '../api/pay'
import config from '../config'
import VideoPlayer from './video-player'

export default {
  name: 'Video',
  components: {
    VideoPlayer
  },
  data() {
    return {
      key: null,
      paid: false,
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
    pay() {
      this.busy = true
      payApi.pay({ key: this.key }).then(() => {
        this.paid = true
      }).catch((error) => {
        console.error(error)
      }).finally(() => {
        this.busy = false
      })
    }
  },
  created() {
    this.key = this.$route.params.key
  },
  beforeRouteUpdate(to, from, next) {
    if (this.paid) {
      this.paid = false
    }
    this.key = to.params.key
    next()
  }
}
</script>
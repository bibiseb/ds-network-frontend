<template>
  <div id="video" class="box">
    <h2>Sample video!</h2>
    <button type="button" v-if="!paid" @click="pay" :disabled="busy">Pay & Play</button>
    <video v-else id="player" class="video-js"></video>
  </div>
</template>

<script>
import Vue from 'vue'
import payApi from '../api/pay'
import videojs from 'video.js'
import 'video.js/dist/video-js.css'

export default {
  name: 'Video',
  data() {
    return {
      paid: false,
      busy: false,
      sources: [
        {
          key: 'sample1',
          url: 'https://videos.ds-network.be/sample1/sample1.m3u8'
        },
        {
          key: 'sample2',
          url: 'https://videos.ds-network.be/sample2/sample2.m3u8'
        }
      ],
      sourceIndex: null
    }
  },
  methods: {
    pay() {
      this.busy = true
      payApi.pay({ key: this.sources[this.sourceIndex].key }).then(() => {
        this.paid = true
        Vue.nextTick(this.enable)
      }).catch((error) => {
        console.error(error)
      }).finally(() => {
        this.busy = false
      })
    },
    enable() {
      const player = videojs('player', {
        controls: true,
        fluid: true,
        html5: {
          hls: {
            withCredentials: true
          }
        }
      });
      player.on('ready', () => {
        player.src({
          type: 'application/x-mpegURL',
          src: this.sources[this.sourceIndex].url
        })
      })
    }
  },
  created() {
    const length = this.sources.length
    this.sourceIndex = Math.round(Math.random() * (length - 1))
  }
}
</script>

<style>
#video .video-js {
  width: 100%;
  height: auto;
}
</style>
<template>
  <div id="video-player">
    <video :id="playerId" class="video-js"></video>
  </div>
</template>

<script>
import videojs from 'video.js'

export default {
  name: 'VideoPlayer',
  props: {
    videoSrc: {
      type: String
    },
    playerId: {
      type: String
    },
    playerOptions: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      player: null
    }
  },
  mounted() {
    this.player = videojs(this.playerId, this.playerOptions)
    this.player.on('ready', () => {
      this.player.src({
        type: 'application/x-mpegURL',
        src: this.videoSrc
      })
    })
  },
  beforeDestroy() {
    if (this.player) {
      this.player.dispose()
    }
  }
}
</script>
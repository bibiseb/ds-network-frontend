import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      user: state => state.user
    }),
    authenticated() {
      return this.user !== null
    },
    owned() {
      return (video) => {
        return this.user !== null && !!this.user.videos.find((item) => item._id === video._id)
      }
    }
  }
}
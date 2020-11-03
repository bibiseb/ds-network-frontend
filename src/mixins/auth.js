import { mapState } from 'vuex'

export default {
	computed: {
		...mapState({
			user: state => state.user
		}),
		authenticated() {
			return this.user !== null
		}
	}
}
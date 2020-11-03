<template>
	<div id="login">
		<h2>Login with your e-mail or <a :href="googleSigninUrl">with Google</a></h2>
		<form @submit.prevent="submit">
			<div>
				<input type="email" v-model="email" id="login-email" required placeholder="E-mail">
			</div>
			<div>
				<input type="password" v-model="password" id="login-password" required placeholder="Password">
			</div>
			<button type="submit" :disabled="busy">Login</button>
		</form>
	</div>
</template>

<script>
import { mapActions } from 'vuex'
import config from '../config'

export default {
	name: 'Login',
	data() {
		return {
			email: '',
			password: '',
			busy: false
		}
	},
	methods: {
		...mapActions([
			'login'
		]),
		submit() {
			this.busy = true
			const payload = {
				email: this.email,
				password: this.password
			}
			this.login(payload).then(() => {
				this.$router.push('/')
			}).catch((error) => {
				console.error(error)
			}).finally(() => {
				this.busy = false
			})
		}
	},
	computed: {
		googleSigninUrl() {
			return config.api.baseURL + 'auth/google'
		}
	}
}
</script>

<style>
#login {
	border: 1px solid lightgrey;
	border-radius: 5px;
	padding: 15px;
	margin-top: 15px;
}
#login > h2 {
	border-bottom: 1px solid lightgrey;
}
#login > form > div {
	margin-bottom: 15px;
}
#login > form > div > input {
	border: 1px solid lightgrey;
	border-radius: 3px;
}
#login > form > button {
	border: 1px solid lightgrey;
	border-radius: 3px;
	margin-right: 5px;
}
</style>
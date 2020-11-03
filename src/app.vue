<template>
	<div id="app">
		<header>
			<user></user>
			<h1>DS-Network</h1>
		</header>
		<router-view></router-view>
	</div>
</template>

<script>
import { mapActions } from 'vuex'
import User from './components/user'

export default {
	name: 'App',
	components: {
		User
	},
	methods: {
		...mapActions([
			'getUser'
		])
	},
	created() {
		this.getUser()
	}
}
</script>

<style>
html, body {
	margin: 0;
	padding: 0;
	font-family: Arial, sans-serif;
	font-size: 14px;
	color: #333;
}
#app {
	margin: auto;
	max-width: 1024px;
}
#app > header {
	border: 1px solid lightgrey;
	border-radius: 5px;
	padding: 15px;
	margin-top: 15px;
}
</style>
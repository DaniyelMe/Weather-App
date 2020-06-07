<template>
	<header>
		<router-link :to="{ name: 'home' }" class="logo">
			<img src="../assets/logo.svg" alt="weather app logo" />
		</router-link>
		
		<ol>
			<li>
				<router-link :to="{ name: 'home' }" :class="{ 'active-path': path == 'home' }">Home</router-link>
			</li>

			<li>
				<router-link :to="{ name: 'favorites' }" :class="{ 'active-path': path == 'favorites' }">Favorites</router-link>
			</li>
		</ol>
	</header>
</template>

<script>
export default {
	computed: {
		path: function() {
			return this.$route.name;
		}
	}
};
</script>

<style></style>

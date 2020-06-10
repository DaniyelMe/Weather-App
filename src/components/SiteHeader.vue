<template>
	<header class="site-header nonselected">
		<div class="site-header-nav">
			<router-link :to="{ name: 'home' }" class="logo nonselected">
				<img src="../assets/logo.svg" alt="weather app logo" />
			</router-link>

			<ol>
				<li>
					<router-link :to="{ name: 'home' }" :class="{ 'active-path': path == 'home' }">Home</router-link>
				</li>

				<li>
					<router-link :to="{ name: 'favorites' }" :class="{ 'active-path': path == 'favorites' }"
						>Favorites</router-link
					>
				</li>
			</ol>
		</div>

		<div class="add-city animated fadeIn">
			<div class="add-new-location-text">Add New Location</div>
			<button class="add-location nonselected button-hover-active" @click="isFindCity = true">
				<span class="material-icons">add</span>
			</button>
		</div>
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

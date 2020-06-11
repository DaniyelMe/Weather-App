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

		<div v-if="!getIsFindCity" class="add-city animated fadeIn">
			<div class="add-new-location-text">Add New Location</div>
			<button class="add-location nonselected button-hover-active" @click="isFindCity">
				<span class="material-icons">add</span>
			</button>
		</div>
	</header>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	computed: {
		...mapGetters(['getSearchResult', 'getIsFindCity']),

		path() {
			return this.$route.name;
		}
	},
	methods: {
		isFindCity() {
			this.$store.state.app.isFindCity = true;
		}
	}
};
</script>

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

		<div v-if="!isFind" class="add-city animated fadeIn">
			<button class="add-location nonselected button-hover-active" @click="isFindCity">
				<div class="add-new-location-text">Add Location</div>
				<span class="material-icons">add</span>
			</button>
		</div>
	</header>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	computed: {
		isFind() {
			return this.$store.state.app.isFindCity;
		},

		path() {
			return this.$route.name;
		}
	},
	methods: {
		isFindCity() {
			this.$store.commit('toggleFind', true);
		}
	}
};
</script>

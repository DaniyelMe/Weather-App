<template>
	<div class="favorite container">
		<SiteHeader></SiteHeader>
		<main>
			<div
				v-for="favorite in getFavorites"
				:key="favorite.key"
				class="location-info day-card nonselected"
				@click="selected(favorite)"
			>
				<h1>{{ favorite.name }}</h1>
				<h3>{{ favorite.country }}</h3>
			</div>
		</main>

		<SiteFooter />
	</div>
</template>

<script>
import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';

import { mapGetters } from 'vuex';
export default {
	components: {
		SiteHeader,
		SiteFooter
	},
	computed: {
		...mapGetters(['getFavorites'])
	},
	methods: {
		selected(favorite) {
			this.$store.dispatch('fetchFiveDaysForecast', favorite.key).then(() => {
				this.$router.push({ name: 'home' });
			});
		}
	}
};
</script>

<style></style>

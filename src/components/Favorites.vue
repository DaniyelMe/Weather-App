<template>
	<div class="favorite container">
		<SiteHeader></SiteHeader>
		<main>
			<div
				v-for="favorite in favorites"
				:key="favorite.key"
				class="location-info day-card nonselected"
				@click="selected(favorite)"
			>
				<h1>{{ favorite.name }}</h1>
				<h3>{{ favorite.country.name }}</h3>
			</div>
		</main>

		<SiteFooter />
	</div>
</template>

<script>
import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';

export default {
	components: {
		SiteHeader,
		SiteFooter
	},
	computed: {
		favorites() {
			return this.$store.state.app.favorites;
		}
	},
	methods: {
		selected(favorite) {
			this.$store.commit('setCurrentPosition', favorite);
			this.$store.dispatch('fetchFiveDaysForecast', favorite.key).then(() => {
				this.$router.push({ name: 'home' });
			});
		}
	}
};
</script>

<style></style>

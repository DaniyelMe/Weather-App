<template>
	<div class="container">
		<SiteHeader></SiteHeader>

		<Search></Search>

		<main class="main">
			<CityWeather></CityWeather>

			<CityWeekForcast></CityWeekForcast>
		</main>

		<SiteFooter></SiteFooter>
	</div>
</template>

<script>
import SiteHeader from './SiteHeader';
import Search from './Search';
import CityWeather from './CityWeather';
import CityWeekForcast from './CityWeekForcast';
import SiteFooter from './SiteFooter';

export default {
	name: 'home',
	components: { SiteHeader, Search, CityWeather, CityWeekForcast, SiteFooter },
	created() {
		this.$store.dispatch('fetchCurrentPosition');
	}
};
</script>

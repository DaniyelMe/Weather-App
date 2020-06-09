<template>
	<div class="container">
		<SiteHeader></SiteHeader>

		<Search></Search>

		<main class="main">
			<CityWeather></CityWeather>
			
			<CityWeekForcast></CityWeekForcast>
		</main>

		<footer>Made with ❤️ 2020</footer>
	</div>
</template>

<script>
import SiteHeader from './SiteHeader';
import Search from './Search';
import CityWeather from './CityWeather';
import CityWeekForcast from './CityWeekForcast';

export default {
	components: { SiteHeader, Search, CityWeather, CityWeekForcast }
};
</script>

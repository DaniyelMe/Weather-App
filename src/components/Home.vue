<template>
	<div class="container">
		<SiteHeader></SiteHeader>

		<Search></Search>

		<main class="main">
			<CityWeather></CityWeather>

			<CityWeekForcast></CityWeekForcast>
		</main>

		<footer class="site-footer">
			<div class="toggle toggle--daynight">
				<input type="checkbox" :checked="theme" id="toggle--daynight" class="toggle--checkbox" @click="toggleTheme" />
				<label class="toggle--btn" for="toggle--daynight">
					<span class="toggle--feature"></span>
				</label>
			</div>

			<span>Made with ❤️ 2020</span>

			<div class="toggle toggle--degree">
				<input type="checkbox" :checked="degree" id="toggle--degree" class="toggle--checkbox" @click="toggleDegree" />
				<label class="toggle--btn" for="toggle--degree">
					<span class="toggle--feature"></span>
				</label>
			</div>
		</footer>
	</div>
</template>

<script>
import SiteHeader from './SiteHeader';
import Search from './Search';
import CityWeather from './CityWeather';
import CityWeekForcast from './CityWeekForcast';

export default {
	components: { SiteHeader, Search, CityWeather, CityWeekForcast },
	data() {
		return {
			theme: true,
			degree: true
		};
	},
	methods: {
		toggleTheme() {
			this.theme = !this.theme;
			const theme = this.theme === true ? 'light-mode' : 'dark-mode';
			document.body.setAttribute('class', theme);
			this.$store.state.app.theme = theme;
		},
		toggleDegree() {
			this.degree = !this.degree;
			this.$store.state.app.degree = this.degree;
		}
	},
	created() {
		document.body.setAttribute('class', this.$store.state.app.theme);
		this.degree = this.$store.state.app.degree;

		// this.$store.dispatch('fetchCurrentPosition');
	}
};
</script>

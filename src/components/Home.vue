<template>
	<div class="container">
		<SiteHeader></SiteHeader>

		<Search></Search>

		<main class="main">
			<section class="weather-city">
				<h1 v-if="fiveDaysForecast.length == 0">Loading</h1>

				<h4 class="title">Current Weather at</h4>

				<div class="main-top">
					<div class="main-top-left">
						<div>
							<h1>{{location.name}}</h1>
							<h3>{{location.country}}</h3>
						</div>

						<div class="add-favorite">
							<button
								class="button-hover-active"
								:class="{ 'is-active': activeLove }"
								@click=" addToFav ;activeLove = !activeLove"
							>
								<span class="heart"></span>
							</button>
							<div>Add to favorite</div>
						</div>

						<div>
							<h3>{{phrase}}</h3>
							<h3>
								<span>{{ tempMin }} - {{ tempMax }}</span>
								<span class="day-card-degree-type">°F</span>
							</h3>
						</div>
					</div>

					<div class="main-top-right" @click="sun = !sun">
						<WeatherIcons :sun="sun"></WeatherIcons>
					</div>
				</div>
			</section>

			<section class="weather-city-forcast">
				<h4 class="title">Forecast for the next 5 days</h4>

				<div class="day-cards-container">
					<DayCard v-for="day in fiveDaysForecast" :key="day.dayName" :dayData="day"></DayCard>
				</div>
			</section>
		</main>

		<footer>Made with ❤️ 2020</footer>
	</div>
</template>

<script>
import SiteHeader from './SiteHeader';
import DayCard from './DayCard';
import Search from './Search';
import WeatherIcons from './WeatherIcons';

import { mapGetters, mapActions } from 'vuex';

export default {
	components: { SiteHeader, DayCard, Search, WeatherIcons },
	data() {
		return {
			fiveDaysForecast: [],
			date: '',
			tempMin: '',
			tempMax: '',
			phrase: '',
			location: { name: '', country: '' },
			activeLove: true,
			sun: true
		};
	},
	methods: {
		...mapActions(['asd'])
	},
	computed: {
		...mapGetters(['getFiveDaysForecast', 'getCurrentPosition'])
	},
	watch: {
		getFiveDaysForecast() {
			this.fiveDaysForecast = this.getFiveDaysForecast;

			this.date = this.getFiveDaysForecast[0].date;
			this.tempMin = this.getFiveDaysForecast[0].temperature.max;
			this.tempMax = this.getFiveDaysForecast[0].temperature.min;
			this.phrase = this.getFiveDaysForecast[0].day.IconPhrase;

			this.location.name = this.getCurrentPosition.name;
			this.location.country = this.getCurrentPosition.country.name;
		}
	},

	created() {
		const forecast = this.$store.state.app.fiveDaysForecast;
		const position = this.$store.state.app.currentPosition;
		if (forecast.length > 0) {
			this.fiveDaysForecast = forecast;
			this.date = forecast[0].date;
			this.tempMin = forecast[0].temperature.max;
			this.tempMax = forecast[0].temperature.min;
			this.phrase = forecast[0].day.IconPhrase;

			this.location.name = position.name;
			this.location.country = position.country.name;
		} else {
			// we retrive the key to 5days and fetch forecast
			this.$store.dispatch('fetchCurrentWeather');
		}
	}
};
</script>

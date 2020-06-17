<template>
	<section class="city-weather">
		<h4 class="title">Current Weather at</h4>

		<div class="main-top">
			<div class="main-top-left">
				<div class="location-info">
					<h1>{{ location.name }}</h1>
					<h3>{{ location.country }}</h3>
				</div>

				<div class="add-favorite">
					<button class="button-hover-active" :class="{ 'is-active': favorite}" @click="addToFav">
						<span class="heart"></span>
					</button>
					<div>Favorite</div>
				</div>

				<div class="location-temperature">
					<h1 class="day-card-degree">
						<span>{{ forecast.tempMin }}-{{ forecast.tempMax }}</span>

						<span v-if="getMetric" class="day-card-degree-type">°C</span>
						<span v-else class="day-card-degree-type">°F</span>
					</h1>
				</div>
			</div>

			<div class="main-top-right">
				<WeatherIcons :sun="sun"></WeatherIcons>
				<h3>{{ forecast.phrase }}</h3>
			</div>
		</div>
	</section>
</template>

<script>
import WeatherIcons from './WeatherIcons';
import tempeConvert from '../utils/tempeConvert.js';

import { mapGetters } from 'vuex';

export default {
	components: { WeatherIcons },
	data() {
		return {
			sun: true
		};
	},
	methods: {
		addToFav() {
			this.$store.commit('updateFavorite', { position: this.$store.state.app.currentPosition, action: !this.favorite });

			const status = !this.favorite;
			this.$store.commit('updateFavoriteSet', {
				key: this.$store.state.app.currentPosition.key,
				action: status
			});
		}
	},
	computed: {
		...mapGetters(['getMetric']),

		forecast() {
			const forecast = this.$store.state.app.fiveDaysForecast;

			if (forecast.length > 0) {
				let min = forecast[0].temperature.min;
				let max = forecast[0].temperature.max;

				if (!this.$store.state.app.metric) {
					min = tempeConvert.celsiusToFahrenheit(forecast[0].temperature.min);
					max = tempeConvert.celsiusToFahrenheit(forecast[0].temperature.max);
				}

				return {
					tempMin: max,
					tempMax: min,
					phrase: forecast[0].day.IconPhrase
				};
			}

			return {
				tempMin: '',
				tempMax: '',
				phrase: ''
			};
		},

		location() {
			const position = this.$store.state.app.currentPosition;

			return {
				name: position.name,
				country: position.country.name,
				key: position.key
			};
		},

		favorite() {
			if (this.$store.state.app.favoritesSet[this.location.key]) return true;
			return false;
		}
	}
};
</script>

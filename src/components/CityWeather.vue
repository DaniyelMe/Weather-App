<template>
	<section class="city-weather">
		<h1 v-if="getFiveDaysForecast.length == 0">Loading</h1>

		<h4 class="title">Current Weather at</h4>

		<div class="main-top">
			<div class="main-top-left">
				<div class="location-info">
					<h1>{{ location.name }}</h1>
					<h3>{{ location.country }}</h3>
				</div>

				<div class="add-favorite">
					<button class="button-hover-active" :class="{ 'is-active': activeLove }" @click="addToFav">
						<span class="heart"></span>
					</button>
					<div>Favorite</div>
				</div>

				<div class="location-temperature">
					<h1 class="day-card-degree">
						<span>{{ tempMin }}-{{ tempMax }}</span>
						<span v-if="getDegree" class="day-card-degree-type">°C</span>
						<span v-else class="day-card-degree-type">°F</span>
					</h1>
				</div>
			</div>

			<div class="main-top-right">
				<WeatherIcons :sun="sun"></WeatherIcons>
				<h3>{{ phrase }}</h3>
			</div>
		</div>
	</section>
</template>

<script>
import WeatherIcons from './WeatherIcons';
import tempeConvert from '../utils/tempeConvert.js';

import { mapGetters, mapActions } from 'vuex';

export default {
	components: { WeatherIcons },
	data() {
		return {
			fiveDaysForecast: [],

			date: '',
			tempMin: '',
			tempMax: '',
			phrase: '',
			location: { name: '', country: '' },

			activeLove: false,
			sun: true
		};
	},
	methods: {
		addToFav() {
			this.activeLove = !this.activeLove;
			const location = {
				name: this.location.name,
				country: this.location.country,
				key: this.getCurrentPosition.key,
				action: this.activeLove
			};

			this.$store.commit('addFavorite', location);
		},

		loadData() {
			const position = this.$store.state.app.currentPosition;

			this.location.name = this.getCurrentPosition.name;
			this.location.country = this.getCurrentPosition.country.name;

			this.activeLove = this.$store.state.app.favoritesSet.has(position.key);

			if (this.fiveDaysForecast.length > 0) {
				this.date = this.fiveDaysForecast[0].date;
				this.tempMin = this.fiveDaysForecast[0].temperature.max;
				this.tempMax = this.fiveDaysForecast[0].temperature.min;
				this.phrase = this.fiveDaysForecast[0].day.IconPhrase;
			}
		}
	},
	computed: {
		...mapGetters(['getFiveDaysForecast', 'getCurrentPosition', 'getFavorites', 'getDegree']),
		getDegree() {
			if (this.fiveDaysForecast.length < 1) return;

			if (!this.$store.state.app.degree) {
				this.tempMin = tempeConvert.celsiusToFahrenheit(this.fiveDaysForecast[0].temperature.min);
				this.tempMax = tempeConvert.celsiusToFahrenheit(this.fiveDaysForecast[0].temperature.max);
				return false;
			}

			this.tempMin = this.fiveDaysForecast[0].temperature.min;
			this.tempMax = this.fiveDaysForecast[0].temperature.max;
			return true;
		}
	},
	watch: {
		getFiveDaysForecast() {
			this.fiveDaysForecast = this.getFiveDaysForecast;
		}
	},
	created() {
		this.fiveDaysForecast = this.getFiveDaysForecast;
		this.loadData();
	}
};
</script>

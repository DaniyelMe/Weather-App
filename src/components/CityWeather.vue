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
					<div>Add to favorite</div>
				</div>

				<div class="location-temperature">
					<h3>{{ phrase }}</h3>
					<h1>
						<span>{{ tempMin }} - {{ tempMax }}</span>
						<span v-if="getDegree" class="day-card-degree-type">°C</span>
						<span v-else class="day-card-degree-type">°F</span>
					</h1>
				</div>
			</div>

			<div class="main-top-right" @click="sun = !sun">
				<WeatherIcons :sun="sun"></WeatherIcons>
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
		addToFav: function() {
			// this.$store.dispatch('addFavorite');
		}
	},
	computed: {
		...mapGetters(['getFiveDaysForecast', 'getCurrentPosition'])
	},

		loadData() {
			if (this.getFiveDaysForecast > 0) {
				this.date = this.getFiveDaysForecast[0].date;
				this.tempMin = this.getFiveDaysForecast[0].temperature.max;
				this.tempMax = this.getFiveDaysForecast[0].temperature.min;
				this.phrase = this.getFiveDaysForecast[0].day.IconPhrase;
				this.location.name = this.getCurrentPosition.name;
				this.location.country = this.getCurrentPosition.country.name;
				this.location.name = position.name;
				this.location.country = position.country.name;
			}
		}
	},
	computed: {
		...mapGetters(['getFiveDaysForecast', 'getCurrentPosition', 'getFavorites', 'getDegree']),
		getDegree() {
			if (!this.$store.state.app.degree) {
				this.tempMin = tempeConvert.celsiusToFahrenheit(this.getFiveDaysForecast[0].temperature.min);
				this.tempMax = tempeConvert.celsiusToFahrenheit(this.getFiveDaysForecast[0].temperature.max);
				return false;
			}
			this.tempMin = this.getFiveDaysForecast[0].temperature.min;
			this.tempMax = this.getFiveDaysForecast[0].temperature.max;
			return true;
		}
	},
	watch: {
		getFiveDaysForecast() {
			this.loadData();
		}
	},
	created() {
		const position = this.$store.state.app.currentPosition;
		this.loadData();
	}
};
</script>

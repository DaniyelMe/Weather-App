<template>
	<section class="city-week-forcast">
		<h4 class="title">Forecast for the next 5 days</h4>

		<div class="day-cards-container">
			<DayCard v-for="day in fiveDaysForecast" :key="day.dayName" :dayData="day"></DayCard>
		</div>
	</section>
</template>

<script>
import DayCard from './DayCard';

import { mapGetters, mapActions } from 'vuex';

export default {
	components: { DayCard },
	data() {
		return {
			fiveDaysForecast: []
		};
	},
	computed: {
		...mapGetters(['getFiveDaysForecast', 'getCurrentPosition'])
	},
	watch: {
		getFiveDaysForecast() {
			this.fiveDaysForecast = this.getFiveDaysForecast;
		}
	},

	created() {
		const forecast = this.$store.state.app.fiveDaysForecast;
		if (forecast.length > 0) {
			this.fiveDaysForecast = forecast;
			this.date = forecast[0].date;
			this.tempMin = forecast[0].temperature.max;
			this.tempMax = forecast[0].temperature.min;
			this.phrase = forecast[0].day.IconPhrase;
		} else {
			// we retrive the key to 5days and fetch forecast
			this.$store.dispatch('fetchCurrentWeather');
		}
	}
};
</script>

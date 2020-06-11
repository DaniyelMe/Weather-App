<template>
	<section class="city-week-forcast">
		<h4 class="title">Forecast for the next 5 days</h4>

		<div class="day-cards-container">
			<Loader v-if="forcast.length < 1"></Loader>
			<DayCard v-for="day in forcast" :key="day.dayName" :dayData="day"></DayCard>
		</div>
	</section>
</template>

<script>
import DayCard from './DayCard';
import Loader from './Loader';

export default {
	components: { DayCard, Loader },

	computed: {
		forcast() {
			return this.$store.state.app.fiveDaysForecast;
		}
	}
};
</script>

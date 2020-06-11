<template>
	<a :href="forecast.link" class="day-card nonselected">
		<span class="day-info">
			<h2 class="day-card-name">{{ forecast.dayName }}</h2>
			<p class="day-card-date">{{ forecast.date }}</p>
			<h1 class="day-card-degree">
				<span>{{ forecast.tempMin }}-{{ forecast.tempMax }}</span>

				<span v-if="getMetric" class="day-card-degree-type">°C</span>
				<span v-else class="day-card-degree-type">°F</span>
			</h1>
		</span>

		<div class="day-description weather-icon">
			<figure>
				<img :src="forecast.icon" :alt="forecast.phrase + `image`" />
			</figure>

			<span>{{ forecast.phrase }}</span>
		</div>
	</a>
</template>

<script>
import icons from '../utils/icons.js';
import tempeConvert from '../utils/tempeConvert.js';
import { mapGetters } from 'vuex';

export default {
	props: ['dayData'],
	computed: {
		...mapGetters(['getMetric']),

		forecast() {
			const forecast = this.dayData;

			let min = forecast.temperature.min;
			let max = forecast.temperature.max;

			if (!this.getMetric) {
				min = tempeConvert.celsiusToFahrenheit(forecast.temperature.max);
				max = tempeConvert.celsiusToFahrenheit(forecast.temperature.min);
			}

			return {
				tempMin: min,
				tempMax: max,
				dayName: forecast.dayName,
				date: forecast.date,
				phrase: forecast.IconPhrase,
				icon: icons.getIcons(forecast.day.Icon),
				link: forecast.link
			};
		}
	}
};
</script>

<style></style>

<template>
	<a :href="link" class="day-card nonselected">
		<span class="day-info">
			<h2 class="day-card-name">{{ dayName }}</h2>
			<p class="day-card-date">{{ date }}</p>
			<h1 class="day-card-degree">
				<span>{{ tempMin }}-{{ tempMax }}</span>
				<span v-if="getDegree" class="day-card-degree-type">°C</span>
				<span v-else class="day-card-degree-type">°F</span>
			</h1>
		</span>

		<div class="day-description weather-icon">
			<figure>
				<img :src="icon" :alt="phrase + `image`" />
			</figure>

			<span>{{ phrase }}</span>
		</div>
	</a>
</template>

<script>
import icons from '../utils/icons.js';
import tempeConvert from '../utils/tempeConvert.js';
import { mapGetters } from 'vuex';

export default {
	props: ['dayData'],
	data() {
		return {
			dayName: '',
			date: '',
			tempMin: '',
			tempMax: '',
			phrase: '',
			icon: '',
			link: '#'
		};
	},
	computed: {
		...mapGetters(['getDegree']),
		getDegree() {
			if (!this.$store.state.app.degree) {
				this.tempMin = tempeConvert.celsiusToFahrenheit(this.dayData.temperature.min);
				this.tempMax = tempeConvert.celsiusToFahrenheit(this.dayData.temperature.max);
				return false;
			}
			this.tempMin = this.dayData.temperature.min;
			this.tempMax = this.dayData.temperature.max;
			return true;
		}
	},

	created() {
		if (this.dayData) {
			this.dayName = this.dayData.dayName;
			this.date = this.dayData.date;
			this.phrase = this.dayData.day.IconPhrase;
			this.icon = icons.getIcons(this.dayData.day.Icon);
			this.link = this.dayData.link;
		}
	}
};
</script>

<style></style>

<template>
	<a :href="link" class="day-card nonselected">
		<span class="day-info">
			<h2 class="day-card-name">{{ dayName }}</h2>
			<p class="day-card-date">{{ date }}</p>
			<h1 class="day-card-degree">
				<span>{{ tempMin }}-{{ tempMax }}</span>
				<span class="day-card-degree-type">°F</span>
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
	created() {
		this.dayName = this.dayData.dayName;
		this.date = this.dayData.date;
		this.tempMin = this.dayData.temperature.min;
		this.tempMax = this.dayData.temperature.max;
		this.phrase = this.dayData.day.IconPhrase;
		this.icon = icons.getIcons(this.dayData.day.Icon);
		this.link = this.dayData.link;
	}
};
</script>

<style></style>

<template>
	<div class="day-card nonselected">
		<h2 class="day-card-name">{{ dayName }}</h2>
		<p class="day-card-date">{{ date }}</p>
		<h1 class="day-card-degree">
			<span>{{ tempMin }} - {{ tempMax }}</span>
			<span class="day-card-degree-type">°F</span>
		</h1>
		<span>{{ phrase }}</span>
	</div>
</template>

<script>
export default {
	props: ['dayData'],
	data() {
		return {
			dayName: '',
			date: '',
			tempMin: '',
			tempMax: '',
			phrase: ''
		};
	},
	created() {
		this.dayName = this.dayData.dayName;
		this.date = this.dayData.date;
		this.tempMin = this.dayData.temperature.min;
		this.tempMax = this.dayData.temperature.max;
		this.phrase = this.dayData.day.IconPhrase;
	}
};
</script>

<style></style>

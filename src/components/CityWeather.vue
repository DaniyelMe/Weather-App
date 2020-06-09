<template>
	<section class="city-weather">
		<h1 v-if="getFiveDaysForecast.length == 0">Loading</h1>

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
</template>

<script>
import WeatherIcons from './WeatherIcons';

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

			activeLove: true,
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
	watch: {
		getFiveDaysForecast() {
			this.date = this.getFiveDaysForecast[0].date;
			this.tempMin = this.getFiveDaysForecast[0].temperature.max;
			this.tempMax = this.getFiveDaysForecast[0].temperature.min;
			this.phrase = this.getFiveDaysForecast[0].day.IconPhrase;
			this.location.name = this.getCurrentPosition.name;
			this.location.country = this.getCurrentPosition.country.name;
		}
	},
	created() {
		const position = this.$store.state.app.currentPosition;

		this.location.name = position.name;
		this.location.country = position.country.name;
	}
};
</script>

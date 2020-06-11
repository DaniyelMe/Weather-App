<template>
	<div class="search-container" v-if="getIsFindCity || wating">
		<div class="add-city search animated fadeIn">
			<form v-if="!wating" @submit.prevent="getResult" class="search-form">
				<input
					type="text"
					name="search"
					v-model="search"
					class="search-form-input"
					placeholder="Start typing here..."
					@change="debouncedGetResult(getResult, 0.1)"
				/>
			</form>

			<button class="close-popup button-hover-active animated fadeIn" v-if="getIsFindCity" @click="isFindCity">
				<span class="material-icons">close</span>
			</button>
		</div>

		<div v-if="getIsFindCity && results.length > 0" class="search-results">
			<!-- Results Should Go Here -->
			<button v-for="result in results" :key="result.Key" @click="handleResult(result)" class="nonselected">
				<h2>{{ result.LocalizedName }}</h2>
				<h4>{{ result.Country.LocalizedName }}</h4>
				<span v-if="result.fav" class="material-icons">
					favorite
				</span>
			</button>
		</div>

		<Loader v-if="wating"></Loader>
	</div>
</template>

<script>
import Loader from './Loader';
import { mapGetters } from 'vuex';

export default {
	components: { Loader },
	data() {
		return {
			search: '',
			results: [],
			wating: false
		};
	},
	methods: {
		getResult() {
			if (this.search.length < 2) return;

			this.wating = true;

			(async () => {
				this.results = [];
				const payload = await this.$store.dispatch('fetchSearchResult', this.search);
				if (payload && payload.length > 0) this.results = payload;
				this.wating = '';
			})();
		},

		debouncedGetResult(func, wait) {
			let timeout;
			return function(...args) {
				clearTimeout(timeout);
				timeout = setTimeout(() => {
					func.apply(this, args);
				}, wait);
			};
		},

		async handleResult(selected) {
			this.wating = true;
			this.results = [];
			this.$store.state.app.isFindCity = false;

			this.$store.commit('setCurrentPosition', selected);
			await this.$store.dispatch('fetchFiveDaysForecast', selected.Key);

			this.$store.state.app.isFindCity = false;
			this.wating = '';
		},

		isFindCity() {
			this.$store.state.app.isFindCity = false;
		}
	},
	computed: {
		...mapGetters(['getSearchResult', 'getIsFindCity'])
	}
};
</script>

<style></style>

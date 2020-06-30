<template>
	<div class="search-container" v-if="isFind || wating">
		<div class="add-city search">
			<form @submit.prevent="getResult" @keyup.passive="getResult" class="search-form">
				<input
					type="text"
					name="search"
					v-model="search"
					class="search-form-input"
					placeholder="Start typing here..."
				/>
			</form>

			<button class="close-popup button-hover-active" v-if="isFind" @click="isFindCity">
				<span class="material-icons">close</span>
			</button>
		</div>

		<div v-if="isFind && searchResult.length > 0" class="search-results">
			<button v-for="result in searchResult" :key="result.Key" @click="handleResult(result)" class="nonselected">
				<h2>{{ result.LocalizedName }}</h2>
				<h4>{{ result.Country.LocalizedName }}</h4>
				<span v-if="result.fav" class="material-icons">favorite</span>
			</button>
		</div>

		<Loader v-if="wating"></Loader>
	</div>
</template>

<script>
import Loader from './Loader';

export default {
	components: { Loader },
	data() {
		return {
			wating: false,
			search: ''
		};
	},
	methods: {
		isFindCity() {
			this.$store.commit('toggleFind', false);
		},

		async getResult() {
			if (this.search.length < 2) return;

			this.wating = true;
			this.$store.commit('resetResult');
			await this.$store.dispatch('fetchSearchResult', this.search);
			this.wating = false;
		},

		async handleResult(selected) {
			this.wating = true;

			this.$store.commit('resetResult');

			// Senetaize uppercase
			const location = {
				name: selected.LocalizedName,
				key: selected.Key,
				country: { name: selected.Country.LocalizedName, id: selected.Country.ID }
			};

			this.$store.commit('setCurrentPosition', location);
			await this.$store.dispatch('fetchFiveDaysForecast', selected.Key);

			this.$store.commit('toggleFind', false);

			this.wating = false;
		}
	},
	computed: {
		searchResult() {
			return this.$store.state.app.searchResult;
		},
		isFind() {
			return this.$store.state.app.isFindCity;
		}
	}
};
</script>

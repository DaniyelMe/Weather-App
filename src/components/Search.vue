<template>
	<div class="search-container">
		<div v-if="!isFindCity" class="add-city animated fadeIn" :class="{'open-add-city': !isFindCity}">
			<div>
				<div>Add New Location</div>
				<button class="add-location nonselected button-hover-active" @click="isFindCity = true">
					<span class="material-icons">add</span>
				</button>
			</div>

			<div>
				<div>Find Me</div>
				<button class="add-location nonselected button-hover-active" @click="findMe">
					<span class="material-icons">location_on</span>
				</button>
			</div>
		</div>

		<div v-else class="add-city search animated fadeIn">
			<form action="#" class="search-form">
				<input type="text" name="search" class="search-form-input" placeholder="Start typing here" />
			</form>
			<div class="search-results">
				<!-- Results Should Go Here -->
			</div>

			<button
				class="close-popup button-hover-active animated fadeIn"
				v-if="isFindCity"
				@click="isFindCity = false"
			>
				<span class="material-icons">close</span>
			</button>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			isFindCity: false
		};
	},
	methods: {
		findMe: function() {
			this.$store.dispatch('fetchCurrentPosition');
		}
	}
};
</script>

<style>
</style>
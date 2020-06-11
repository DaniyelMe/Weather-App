<template>
	<footer class="site-footer">
		<div class="toggle toggle--daynight">
			<input type="checkbox" :checked="theme" id="toggle--daynight" class="toggle--checkbox" @click="toggleTheme" />
			<label class="toggle--btn" for="toggle--daynight">
				<span class="toggle--feature"></span>
			</label>
		</div>

		<span>Made with ❤️ 2020</span>

		<div class="toggle toggle--degree">
			<input type="checkbox" :checked="metric" id="toggle--degree" class="toggle--checkbox" @click="toggleMetric" />
			<label class="toggle--btn" for="toggle--degree">
				<span class="toggle--feature"></span>
			</label>
		</div>
	</footer>
</template>

<script>
export default {
	computed: {
		metric() {
			return this.$store.state.app.metric;
		},
		theme() {
			return this.$store.state.app.theme;
		}
	},
	methods: {
		toggleTheme() {
			this.$store.commit('toggleTheme');

			const theme = this.theme ? 'light-mode' : 'dark-mode';
			document.body.setAttribute('class', theme);
		},
		toggleMetric() {
			this.$store.commit('toggleMetric');
		}
	}
};
</script>

<style></style>

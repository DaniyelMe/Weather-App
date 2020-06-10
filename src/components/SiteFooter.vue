<template>
	<footer class="site-footer">
		<div class="toggle toggle--daynight">
			<input
				type="checkbox"
				:checked="theme"
				id="toggle--daynight"
				class="toggle--checkbox"
				@click="toggleTheme"
			/>
			<label class="toggle--btn" for="toggle--daynight">
				<span class="toggle--feature"></span>
			</label>
		</div>

		<span>Made with ❤️ 2020</span>

		<div class="toggle toggle--degree">
			<input
				type="checkbox"
				:checked="degree"
				id="toggle--degree"
				class="toggle--checkbox"
				@click="toggleDegree"
			/>
			<label class="toggle--btn" for="toggle--degree">
				<span class="toggle--feature"></span>
			</label>
		</div>
	</footer>
</template>

<script>
export default {
	data() {
		return {
			theme: true,
			degree: true
		};
	},
	methods: {
		toggleTheme() {
			this.theme = !this.theme;
			const theme = this.theme === true ? 'light-mode' : 'dark-mode';
			document.body.setAttribute('class', theme);
			this.$store.state.app.theme = theme;
		},
		toggleDegree() {
			this.degree = !this.degree;
			this.$store.state.app.degree = this.degree;
		}
	},
	created() {
		this.degree = this.$store.state.app.degree;
	}
};
</script>

<style>
</style>
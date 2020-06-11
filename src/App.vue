<template>
	<router-view></router-view>
</template>

<script>
export default {
	name: 'App',
	created() {
		const theme = this.$store.state.app.theme ? 'light-mode' : 'dark-mode';
		document.body.setAttribute('class', theme);
	}
};
</script>

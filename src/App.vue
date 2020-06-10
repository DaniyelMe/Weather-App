<template>
	<router-view></router-view>
</template>

<script>
export default {
	name: 'App',
	created() {
		document.body.setAttribute('class', this.$store.state.app.theme);
	}
};
</script>

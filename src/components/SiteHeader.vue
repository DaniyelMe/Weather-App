<template>
	<header class="site-header nonselected">
		<div class="site-header-nav">
			<span class="material-icons">place</span>
			<h4>{{ location.name }}</h4>
		</div>

		<div class="header-menu">
			<span class="material-icons" @click="openMenu = !openMenu">menu</span>
			<ol v-if="openMenu">
				<li v-for="item in menu" :key="item">{{ item }}</li>
			</ol>
		</div>
	</header>
</template>

<script>
export default {
	data() {
		return {
			openMenu: false,
			menu: ['metric', 'theme']
		};
	},
	computed: {
		location() {
			return this.$store.state.app.currentPosition;
		}
	}
};
</script>

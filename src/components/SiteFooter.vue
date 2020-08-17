<template>
	<footer class="site-footer">
		<ol>
			<li
				v-for="day in daysOfWeek"
				:key="day"
				:class="{today: selected === day }"
				@click="selected = day"
			>{{day}}</li>
		</ol>
	</footer>
</template>

<script>
export default {
	data() {
		return {
			selected: '',
		};
	},
	computed: {
		daysOfWeek() {
			const week = this.$store.state.app.daysOfWeek;
			this.selected = week[new Date().getDay()].substring(0, 2);

			return week.map((day) => {
				return day.substring(0, 2);
			});
		},
	},
};
</script>

<style></style>

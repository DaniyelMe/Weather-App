<template>
  <div class="home">
		<SiteHeader></SiteHeader>
    <div class="search-bar">
      <span>ICON</span>
      <span>Search Bar</span>
      <input type="text" />
    </div>

    <main class="home-main">
      <section class="home-main-top">
        <span class="location-card">location</span>

        <span class="location-card">degree</span>

        <button>Add to Favorites</button>
      </section>

      <section class="location-cards">
        <span v-for="(day) in nextFiveDays" :key="day" class="location-card">{{day}}</span>
      </section>
    </main>

    <footer></footer>
  </div>
</template>

<script>
import SiteHeader from './SiteHeader';
export default {
	components: { SiteHeader },
  data() {
    return {
      daysOfWeek: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ]
    };
  },
  computed: {
    nextFiveDays: function() {
      const todayIndex = new Date().getDay();
      let fiveDays = [];

      // From today till end of the week.
      for (let i = todayIndex; i < this.daysOfWeek.length; i++)
        fiveDays.push(this.daysOfWeek[i]);

      // From the start of the week till we have 5 days.
      for (let i = 0; fiveDays.length < 5; i++)
        fiveDays.push(this.daysOfWeek[i]);

      return fiveDays;
    }
  }
};
</script>

<style></style>

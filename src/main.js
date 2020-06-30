import Vue from 'vue';
import App from './App.vue';
import VueMeta from 'vue-meta';

import store from './store';
import router from './router';

Vue.use(VueMeta);

Vue.config.productionTip = false;

new Vue({
	el: '#app',
	store,
	router,
	render: h => h(App)
});

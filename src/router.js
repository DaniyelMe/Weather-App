import Router from 'vue-router';
import Vue from 'vue';

Vue.use(Router);

export default new Router({
	mode: 'history',
	routes: [
		{
			name: 'home',
			path: '/',
			component: () => import('./components/Home.vue')
		},
		{
			name: 'favorites',
			path: '/favorites',
			component: () => import('./components/Favorites.vue')
		}
	]
});

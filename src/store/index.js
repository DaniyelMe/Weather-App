import Vuex from 'vuex';
import Vue from 'vue';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

import app from './modules/app.js';

export default new Vuex.Store({
	modules: {
		app
	},
	plugins: [createPersistedState()]
});

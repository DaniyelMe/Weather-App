import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

import app from './modules/app.js';

export default new Vuex.Store({
	modules: {
		app
	}
});

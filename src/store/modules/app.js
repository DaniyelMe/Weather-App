import geoApi from '../../utils/geoApi.js';
import tempeConvert from '../../utils/tempeConvert.js';

const state = {
	position: { latitude: '32.0853', longitude: '34.7818' },

	currentPosition: { name: 'Tel Aviv', key: '215793', country: { name: 'Israel', id: 'IL' } },

	fiveDaysForecast: [],

	favorites: [],
	favoritesSet: {},

	searchResult: '',

	notifications: [],

	isFindCity: false,
	theme: true,
	metric: true
};

const getters = {
	getMetric: state => state.metric
};

const actions = {
	// Geolocation API - Web APIs
	fetchCurrentPosition({ commit, dispatch }) {
		if (!navigator.geolocation) {
			commit('addStatus', 'Geolocation is not supported by your browser');
		} else {
			navigator.geolocation.getCurrentPosition(
				position => {
					commit('setPosition', {
						lat: position.coords.latitude,
						long: position.coords.longitude
					});

					commit('addStatus', 'We found your location, processing...');

					dispatch('fetchCurrentWeather');
				},
				error => {
					commit('addStatus', 'Unable to retrieve your location');
				}
			);
		}
	},

	fetchCurrentWeather({ dispatch }) {
		geoApi.geoPosition(state.position.latitude, state.position.longitude).then(payload => {
			state.currentPosition = {
				name: payload.AdministrativeArea.EnglishName,
				key: payload.Key,
				country: { name: payload.Country.EnglishName, id: payload.Country.ID }
			};

			dispatch('fetchFiveDaysForecast', payload.Key);
		});
	},

	fetchFiveDaysForecast({ commit }, key) {
		geoApi.fiveDaysForecast(key).then(forecast => {
			forecast = forecast.DailyForecasts;

			const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

			const todayIndex = new Date().getDay();
			let fiveDays = [];
			let j = 0;

			// From today till end of the week.
			for (let i = todayIndex; i < 7 && fiveDays.length < 5; i++) {
				const { Temperature, Date, Day, Night, Link } = forecast[j++];

				// make sure it's celsius
				if (Temperature.Maximum.Unit == 'F') {
					Temperature.Maximum.Value = tempeConvert.fahrenheitToCelsius(Temperature.Maximum.Value);
					Temperature.Minimum.Value = tempeConvert.fahrenheitToCelsius(Temperature.Minimum.Value);
				}

				fiveDays.push({
					dayName: daysOfWeek[i],
					temperature: { max: Temperature.Maximum.Value, min: Temperature.Minimum.Value, type: Temperature.Unit },
					date: parseDate(Date),
					day: Day,
					night: Night,
					link: Link
				});
			}

			// From the start of the week till we have 5 days.
			for (let i = 0; fiveDays.length < 5; i++) {
				const { Temperature, Date, Day, Night, Link } = forecast[j++];

				// make sure it's celsius
				if (Temperature.Maximum.Unit == 'F') {
					Temperature.Maximum.Value = tempeConvert.fahrenheitToCelsius(Temperature.Maximum.Value);
					Temperature.Minimum.Value = tempeConvert.fahrenheitToCelsius(Temperature.Minimum.Value);
				}

				fiveDays.push({
					dayName: daysOfWeek[i],
					temperature: { max: Temperature.Maximum.Value, min: Temperature.Minimum.Value, type: Temperature.Unit },
					date: parseDate(Date),
					day: Day,
					night: Night,
					link: Link
				});
			}

			commit('setFiveDaysForecast', fiveDays);
		});
	},

	fetchSearchResult({ commit, state }, inputVal) {
		return geoApi.searchAutoComplete(inputVal).then(result => {
			const filterd = result.map(local => {
				if (state.favoritesSet[local.ey]) local.fav = true;
				return local;
			});

			commit('setSearchResult', filterd);
		});
	}
};

const mutations = {
	setPosition(state, { lat, long }) {
		state.position.latitude = lat;
		state.position.longitude = long;
	},

	setCurrentPosition(state, location) {
		state.currentPosition = {
			name: location.name,
			key: location.key,
			country: { name: location.country.name, id: location.country.id }
		};
	},

	setFiveDaysForecast(state, fiveDays) {
		state.fiveDaysForecast = fiveDays;
	},

	updateFavoriteSet(state, { key, action }) {
		if (action) {
			state.favoritesSet[key] = true;
		} else {
			delete state.favoritesSet[key];
		}
	},

	updateFavorite(state, { position, action }) {
		if (action) {
			//don't add if already added
			if (state.favoritesSet[position.key]) return;

			state.favorites.push(position);
		} else {
			const removeIndex = state.favorites
				.map(fav => {
					return fav.key;
				})
				.indexOf(position.key);
			state.favorites.splice(removeIndex, 1);
		}
	},

	toggleMetric(state) {
		state.metric = !state.metric;
	},

	toggleTheme(state) {
		state.theme = !state.theme;
	},

	toggleFind(state, status) {
		state.isFindCity = status;
	},

	resetResult(state) {
		state.searchResult = [];
	},

	setSearchResult(state, results) {
		state.searchResult = results;
	},

	addStatus(state, notification) {
		state.notifications.push(notification);
	}
};

export default {
	state,
	getters,
	actions,
	mutations
};

function parseDate(dataDate) {
	const monthNames = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
	];

	const date = dataDate.split('T')[0];
	let parseDate = date.split('-').reverse();
	parseDate[1] = parseDate[1].split('')[0] == 1 ? monthNames[parseDate[1]] : monthNames[parseDate[1].split('')[1]];

	return Array.from(parseDate).join(' ');
}

import geoApi from '../../utils/geoApi.js';
import tempeConvert from '../../utils/tempeConvert.js';

const state = {
	position: { latitude: '32.0853', longitude: '34.7818' },

	currentPosition: { name: 'Tel Aviv', key: '215793', country: { name: 'Israel', id: 'IL' } },

	fiveDaysForecast: [],

	favorites: [],
	favoritesSet: new Set(),

	searchResult: '',

	isFindCity: false,
	theme: 'light-mode',
	degree: true
};

const getters = {
	getFavorites: state => state.favorites,
	getFiveDaysForecast: state => state.fiveDaysForecast,
	getCurrentPosition: state => state.currentPosition,
	getSearchResult: state => state.searchResult,
	getDegree: state => state.degree,
	getIsFindCity: state => state.isFindCity
};

const actions = {
	// Geolocation API - Web APIs
	fetchCurrentPosition({ commit, dispatch }) {
		if (!navigator.geolocation) {
			// TODO: Show Toast message to the user
			console.log('Geolocation is not supported by your browser');
		} else {
			navigator.geolocation.getCurrentPosition(
				position => {
					commit('setPosition', {
						lat: position.coords.latitude,
						long: position.coords.longitude
					});

					dispatch('fetchCurrentWeather');
				},
				error => {
					console.log('Unable to retrieve your location');
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

	fetchFiveDaysForecast({ commit, state }, key) {
		const dataDate = state.fiveDaysForecast[0] ? state.fiveDaysForecast[0].date : false;
		//get the date in format yyyy-mm-dd
		const nowDate = new Date().toISOString().slice(0, 10);

		if (dataDate != nowDate) {
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
		}
	},

	fetchSearchResult({ commit, state }, inputVal) {
		return geoApi.searchAutoComplete(inputVal).then(result => {
			return result.map(local => {
				if (state.favoritesSet.has(parseInt(local.Key))) local.fav = true;

				return local;
			});
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
			name: location.LocalizedName,
			key: location.Key,
			country: { name: location.Country.LocalizedName, id: location.Country.ID }
		};
	},

	setFiveDaysForecast(state, fiveDays) {
		state.fiveDaysForecast = fiveDays;
	},

	addFavorite(state, location) {
		//will add to the set if action == true, and remove otherwise
		const action = location.action;
		//remove the action property from the object
		delete location['action'];

		if (action) {
			state.favorites.push(location);
			state.favoritesSet.add(location.key);
		} else {
			const removeIndex = state.favorites
				.map(fav => {
					return fav.key;
				})
				.indexOf(location.key);
			state.favorites.splice(removeIndex, 1);
			state.favoritesSet.delete(location.key);
		}
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

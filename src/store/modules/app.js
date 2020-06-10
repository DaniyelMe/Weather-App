import geoApi from '../../utils/geoApi.js';

const state = {
	position: { latitude: '32.0853', longitude: '34.7818' },

	currentPosition: { name: 'Tel Aviv', key: '215793', country: { name: 'Israel', id: 'IL' } },

	fiveDaysForecast: [],

	favorites: [],

	status: []
	theme: 'light-mode'
};

const getters = {
	getFavorites: state => state.favorites,
	getFiveDaysForecast: state => state.fiveDaysForecast,
	getCurrentPosition: state => state.currentPosition
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
					commit('setCurrentPosition', {
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
		// To spare Accuweather API calls. Pre LocalStorage solution
		return (state.fiveDaysForecast = DailyForecasts);

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
				commit('setFiveDaysForecast', forecast.DailyForecasts);
			});
		}
	}
};

const mutations = {
	setCurrentPosition(state, { lat, long }) {
		state.position.latitude = lat;
		state.position.longitude = long;
	},

	setFiveDaysForecast(state, forecast) {
		const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

		const todayIndex = new Date().getDay();
		let fiveDays = [];
		let j = 0;

		// From today till end of the week.
		for (let i = todayIndex; i < 7 && fiveDays.length < 5; i++) {
			const { Temperature, Date, Day, Night, Link } = forecast[j++];
			fiveDays.push({
				dayName: daysOfWeek[i],
				temperature: {
					max: Temperature.Maximum.Value,
					min: Temperature.Minimum.Value,
					type: Temperature.Unit
				},
				date: parseDate(Date),
				day: Day,
				night: Night,
				link: Link
			});
		}

		// From the start of the week till we have 5 days.
		for (let i = 0; fiveDays.length < 5; i++) {
			const { Temperature, Date, Day, Night } = forecast[j++];
			fiveDays.push({
				dayName: daysOfWeek[i],
				temperature: { max: Temperature.Maximum, min: Temperature.Minimum },
				date: parseDate(Date),
				day: Day,
				night: Night
			});
		}

		state.fiveDaysForecast = fiveDays;
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

const DailyForecasts = [
	{
		dayName: 'Tuesday',
		temperature: { max: 85, min: 68 },
		date: '09 July 2020',
		day: {
			Icon: 2,
			IconPhrase: 'Mostly sunny',
			HasPrecipitation: false,
			ShortPhrase: 'Mostly sunny and pleasant',
			LongPhrase: 'Mostly sunny and pleasant',
			PrecipitationProbability: 0,
			ThunderstormProbability: 0,
			RainProbability: 0,
			SnowProbability: 0,
			IceProbability: 0,
			Wind: {
				Speed: { Value: 6.9, Unit: 'mi/h', UnitType: 9 },
				Direction: { Degrees: 293, Localized: 'WNW', English: 'WNW' }
			},
			WindGust: {
				Speed: { Value: 13.8, Unit: 'mi/h', UnitType: 9 },
				Direction: { Degrees: 215, Localized: 'SW', English: 'SW' }
			},
			TotalLiquid: { Value: 0, Unit: 'in', UnitType: 1 },
			Rain: { Value: 0, Unit: 'in', UnitType: 1 },
			Snow: { Value: 0, Unit: 'in', UnitType: 1 },
			Ice: { Value: 0, Unit: 'in', UnitType: 1 },
			HoursOfPrecipitation: 0,
			HoursOfRain: 0,
			HoursOfSnow: 0,
			HoursOfIce: 0,
			CloudCover: 7
		},
		night: {
			Icon: 35,
			IconPhrase: 'Partly cloudy',
			HasPrecipitation: false,
			ShortPhrase: 'Patchy clouds',
			LongPhrase: 'Patchy clouds',
			PrecipitationProbability: 0,
			ThunderstormProbability: 0,
			RainProbability: 0,
			SnowProbability: 0,
			IceProbability: 0,
			Wind: {
				Speed: { Value: 4.6, Unit: 'mi/h', UnitType: 9 },
				Direction: { Degrees: 288, Localized: 'WNW', English: 'WNW' }
			},
			WindGust: {
				Speed: { Value: 10.4, Unit: 'mi/h', UnitType: 9 },
				Direction: { Degrees: 333, Localized: 'NNW', English: 'NNW' }
			},
			TotalLiquid: { Value: 0, Unit: 'in', UnitType: 1 },
			Rain: { Value: 0, Unit: 'in', UnitType: 1 },
			Snow: { Value: 0, Unit: 'in', UnitType: 1 },
			Ice: { Value: 0, Unit: 'in', UnitType: 1 },
			HoursOfPrecipitation: 0,
			HoursOfRain: 0,
			HoursOfSnow: 0,
			HoursOfIce: 0,
			CloudCover: 46
		}
	},
	{
		dayName: 'Wednesday',
		temperature: { max: 81, min: 70 },
		date: '10 July 2020',
		day: {
			Icon: 1,
			IconPhrase: 'Sunny',
			HasPrecipitation: false,
			ShortPhrase: 'Sunny and comfortable',
			LongPhrase: 'Sunny and comfortable',
			PrecipitationProbability: 0,
			ThunderstormProbability: 0,
			RainProbability: 0,
			SnowProbability: 0,
			IceProbability: 0,
			Wind: {
				Speed: { Value: 8.1, Unit: 'mi/h', UnitType: 9 },
				Direction: { Degrees: 275, Localized: 'W', English: 'W' }
			},
			WindGust: {
				Speed: { Value: 13.8, Unit: 'mi/h', UnitType: 9 },
				Direction: { Degrees: 298, Localized: 'WNW', English: 'WNW' }
			},
			TotalLiquid: { Value: 0, Unit: 'in', UnitType: 1 },
			Rain: { Value: 0, Unit: 'in', UnitType: 1 },
			Snow: { Value: 0, Unit: 'in', UnitType: 1 },
			Ice: { Value: 0, Unit: 'in', UnitType: 1 },
			HoursOfPrecipitation: 0,
			HoursOfRain: 0,
			HoursOfSnow: 0,
			HoursOfIce: 0,
			CloudCover: 9
		},
		night: {
			Icon: 33,
			IconPhrase: 'Clear',
			HasPrecipitation: false,
			ShortPhrase: 'Clear',
			LongPhrase: 'Clear',
			PrecipitationProbability: 0,
			ThunderstormProbability: 0,
			RainProbability: 0,
			SnowProbability: 0,
			IceProbability: 0,
			Wind: {
				Speed: { Value: 4.6, Unit: 'mi/h', UnitType: 9 },
				Direction: { Degrees: 276, Localized: 'W', English: 'W' }
			},
			WindGust: {
				Speed: { Value: 8.1, Unit: 'mi/h', UnitType: 9 },
				Direction: { Degrees: 340, Localized: 'NNW', English: 'NNW' }
			},
			TotalLiquid: { Value: 0, Unit: 'in', UnitType: 1 },
			Rain: { Value: 0, Unit: 'in', UnitType: 1 },
			Snow: { Value: 0, Unit: 'in', UnitType: 1 },
			Ice: { Value: 0, Unit: 'in', UnitType: 1 },
			HoursOfPrecipitation: 0,
			HoursOfRain: 0,
			HoursOfSnow: 0,
			HoursOfIce: 0,
			CloudCover: 1
		}
	},
	{
		dayName: 'Thursday',
		temperature: { max: 82, min: 70 },
		date: '11 July 2020',
		day: {
			Icon: 2,
			IconPhrase: 'Mostly sunny',
			HasPrecipitation: false,
			ShortPhrase: 'Mostly sunny and pleasant',
			LongPhrase: 'Mostly sunny and pleasant',
			PrecipitationProbability: 0,
			ThunderstormProbability: 0,
			RainProbability: 0,
			SnowProbability: 0,
			IceProbability: 0,
			Wind: {
				Speed: { Value: 9.2, Unit: 'mi/h', UnitType: 9 },
				Direction: { Degrees: 267, Localized: 'W', English: 'W' }
			},
			WindGust: {
				Speed: { Value: 13.8, Unit: 'mi/h', UnitType: 9 },
				Direction: { Degrees: 280, Localized: 'W', English: 'W' }
			},
			TotalLiquid: { Value: 0, Unit: 'in', UnitType: 1 },
			Rain: { Value: 0, Unit: 'in', UnitType: 1 },
			Snow: { Value: 0, Unit: 'in', UnitType: 1 },
			Ice: { Value: 0, Unit: 'in', UnitType: 1 },
			HoursOfPrecipitation: 0,
			HoursOfRain: 0,
			HoursOfSnow: 0,
			HoursOfIce: 0,
			CloudCover: 23
		},
		night: {
			Icon: 34,
			IconPhrase: 'Mostly clear',
			HasPrecipitation: false,
			ShortPhrase: 'Mainly clear',
			LongPhrase: 'Mainly clear',
			PrecipitationProbability: 0,
			ThunderstormProbability: 0,
			RainProbability: 0,
			SnowProbability: 0,
			IceProbability: 0,
			Wind: {
				Speed: { Value: 5.8, Unit: 'mi/h', UnitType: 9 },
				Direction: { Degrees: 215, Localized: 'SW', English: 'SW' }
			},
			WindGust: {
				Speed: { Value: 10.4, Unit: 'mi/h', UnitType: 9 },
				Direction: { Degrees: 273, Localized: 'W', English: 'W' }
			},
			TotalLiquid: { Value: 0, Unit: 'in', UnitType: 1 },
			Rain: { Value: 0, Unit: 'in', UnitType: 1 },
			Snow: { Value: 0, Unit: 'in', UnitType: 1 },
			Ice: { Value: 0, Unit: 'in', UnitType: 1 },
			HoursOfPrecipitation: 0,
			HoursOfRain: 0,
			HoursOfSnow: 0,
			HoursOfIce: 0,
			CloudCover: 13
		}
	},
	{
		dayName: 'Friday',
		temperature: { max: 83, min: 70 },
		date: '12 July 2020',
		day: {
			Icon: 1,
			IconPhrase: 'Sunny',
			HasPrecipitation: false,
			ShortPhrase: 'Sunny and pleasant',
			LongPhrase: 'Pleasant with plenty of sunshine',
			PrecipitationProbability: 0,
			ThunderstormProbability: 0,
			RainProbability: 0,
			SnowProbability: 0,
			IceProbability: 0,
			Wind: {
				Speed: { Value: 8.1, Unit: 'mi/h', UnitType: 9 },
				Direction: { Degrees: 267, Localized: 'W', English: 'W' }
			},
			WindGust: {
				Speed: { Value: 13.8, Unit: 'mi/h', UnitType: 9 },
				Direction: { Degrees: 302, Localized: 'WNW', English: 'WNW' }
			},
			TotalLiquid: { Value: 0, Unit: 'in', UnitType: 1 },
			Rain: { Value: 0, Unit: 'in', UnitType: 1 },
			Snow: { Value: 0, Unit: 'in', UnitType: 1 },
			Ice: { Value: 0, Unit: 'in', UnitType: 1 },
			HoursOfPrecipitation: 0,
			HoursOfRain: 0,
			HoursOfSnow: 0,
			HoursOfIce: 0,
			CloudCover: 1
		},
		night: {
			Icon: 33,
			IconPhrase: 'Clear',
			HasPrecipitation: false,
			ShortPhrase: 'Clear',
			LongPhrase: 'Clear',
			PrecipitationProbability: 0,
			ThunderstormProbability: 0,
			RainProbability: 0,
			SnowProbability: 0,
			IceProbability: 0,
			Wind: {
				Speed: { Value: 4.6, Unit: 'mi/h', UnitType: 9 },
				Direction: { Degrees: 167, Localized: 'SSE', English: 'SSE' }
			},
			WindGust: {
				Speed: { Value: 10.4, Unit: 'mi/h', UnitType: 9 },
				Direction: { Degrees: 21, Localized: 'NNE', English: 'NNE' }
			},
			TotalLiquid: { Value: 0, Unit: 'in', UnitType: 1 },
			Rain: { Value: 0, Unit: 'in', UnitType: 1 },
			Snow: { Value: 0, Unit: 'in', UnitType: 1 },
			Ice: { Value: 0, Unit: 'in', UnitType: 1 },
			HoursOfPrecipitation: 0,
			HoursOfRain: 0,
			HoursOfSnow: 0,
			HoursOfIce: 0,
			CloudCover: 1
		}
	},
	{
		dayName: 'Saturday',
		temperature: { max: 84, min: 70 },
		date: '13 July 2020',
		day: {
			Icon: 2,
			IconPhrase: 'Mostly sunny',
			HasPrecipitation: false,
			ShortPhrase: 'Mostly sunny and pleasant',
			LongPhrase: 'Mostly sunny and pleasant',
			PrecipitationProbability: 0,
			ThunderstormProbability: 0,
			RainProbability: 0,
			SnowProbability: 0,
			IceProbability: 0,
			Wind: {
				Speed: { Value: 8.1, Unit: 'mi/h', UnitType: 9 },
				Direction: { Degrees: 293, Localized: 'WNW', English: 'WNW' }
			},
			WindGust: {
				Speed: { Value: 12.7, Unit: 'mi/h', UnitType: 9 },
				Direction: { Degrees: 317, Localized: 'NW', English: 'NW' }
			},
			TotalLiquid: { Value: 0, Unit: 'in', UnitType: 1 },
			Rain: { Value: 0, Unit: 'in', UnitType: 1 },
			Snow: { Value: 0, Unit: 'in', UnitType: 1 },
			Ice: { Value: 0, Unit: 'in', UnitType: 1 },
			HoursOfPrecipitation: 0,
			HoursOfRain: 0,
			HoursOfSnow: 0,
			HoursOfIce: 0,
			CloudCover: 15
		},
		night: {
			Icon: 35,
			IconPhrase: 'Partly cloudy',
			HasPrecipitation: false,
			ShortPhrase: 'Partly cloudy',
			LongPhrase: 'Partly cloudy',
			PrecipitationProbability: 2,
			ThunderstormProbability: 1,
			RainProbability: 2,
			SnowProbability: 0,
			IceProbability: 0,
			Wind: {
				Speed: { Value: 4.6, Unit: 'mi/h', UnitType: 9 },
				Direction: { Degrees: 317, Localized: 'NW', English: 'NW' }
			},
			WindGust: {
				Speed: { Value: 10.4, Unit: 'mi/h', UnitType: 9 },
				Direction: { Degrees: 2, Localized: 'N', English: 'N' }
			},
			TotalLiquid: { Value: 0, Unit: 'in', UnitType: 1 },
			Rain: { Value: 0, Unit: 'in', UnitType: 1 },
			Snow: { Value: 0, Unit: 'in', UnitType: 1 },
			Ice: { Value: 0, Unit: 'in', UnitType: 1 },
			HoursOfPrecipitation: 0,
			HoursOfRain: 0,
			HoursOfSnow: 0,
			HoursOfIce: 0,
			CloudCover: 36
		}
	}
];

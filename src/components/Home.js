import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import geoApi from '../utils/geoApi';
import tempeConvert from '../utils/tempeConvert';
import dates from '../utils/dates';

import Search from './Search.js';
import CityWeather from './CityWeather.js';
import CityWeekForcast from './CityWeekForcast.js';

const Home = () => {
	const position = useSelector(state => state.position);
	const fiveDaysForecast = useSelector(state => state.fiveDaysForecast);

	const dispatch = useDispatch();

	useEffect(() => {
		// on create, fetch the data if we haven't already
		if (fiveDaysForecast.length < 1) fetchCurrentWeather(position);
		if (fiveDaysForecast.length < 1) fetchCurrentWeather(position);
	});

	const fetchCurrentWeather = position => {
		geoApi.geoPosition(position.latitude, position.longitude).then(payload => {
			dispatch({
				type: 'setCurrentPosition',
				newValue: {
					name: payload.AdministrativeArea.EnglishName,
					key: payload.Key,
					country: { name: payload.Country.EnglishName, id: payload.Country.ID }
				}
			});

			fetchFiveDaysForecast(payload.Key);
		});
	};

	const fetchFiveDaysForecast = key => {
		geoApi.fiveDaysForecast(key).then(forecast => {
			forecast = forecast.DailyForecasts;
			const result = [];
			//Reset the forecast array

			const todayIndex = new Date().getDay();
			let j = 0;

			// From today till end of the week.
			for (let i = todayIndex; i < 7 && j < 5; i++) {
				result.push(addDayOfForcast(forecast[j++], i));
			}

			// From the start of the week till we have 5 days.
			for (let i = 0; j < 5; i++) {
				result.push(forecast[j++], i);
			}

			dispatch({ type: 'setFiveDaysForecast', value: result });
			dispatch({ type: 'setFavoritesSet', value: false, index: currentPosition.key });
		});
	};

	const addDayOfForcast = (forecast, i) => {
		const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
		const { Temperature, Date, Day, Night, Link, Sun } = forecast;

		// make sure it's celsius
		if (Temperature.Maximum.Unit == 'F') {
			Temperature.Maximum.Value = tempeConvert.fahrenheitToCelsius(Temperature.Maximum.Value);
			Temperature.Minimum.Value = tempeConvert.fahrenheitToCelsius(Temperature.Minimum.Value);
		}

		return {
			dayName: daysOfWeek[i],
			temperature: { max: Temperature.Maximum.Value, min: Temperature.Minimum.Value, type: Temperature.Unit },
			date: dates.parseDate(Date),
			day: Day,
			night: Night,
			link: Link,
			sun: Sun
		};
	};

	return (
		<>
			<Search />

			<main className="main">
				<CityWeather fiveDaysForecast={fiveDaysForecast} />

				<CityWeekForcast fiveDaysForecast={fiveDaysForecast} />
			</main>
		</>
	);
};

export default Home;

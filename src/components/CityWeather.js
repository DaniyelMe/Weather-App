import React from 'react';
import tempeConvert from '../utils/tempeConvert.js';
import { useSelector, useDispatch } from 'react-redux';

const CityWeather = ({ fiveDaysForecast }) => {
	const metric = useSelector(state => state.metric);
	const favorites = useSelector(state => state.favorites);
	const favoritesSet = useSelector(state => state.favoritesSet);
	const currentPosition = useSelector(state => state.currentPosition);

	const dispatch = useDispatch();

	const location = {
		name: currentPosition.name,
		country: currentPosition.country.name,
		key: currentPosition.key
	};

	const forecast = (() => {
		if (fiveDaysForecast.length > 0) {
			let min = fiveDaysForecast[0].temperature.min;
			let max = fiveDaysForecast[0].temperature.max;

			if (!metric) {
				min = tempeConvert.celsiusToFahrenheit(fiveDaysForecast[0].temperature.min);
				max = tempeConvert.celsiusToFahrenheit(fiveDaysForecast[0].temperature.max);
			}

			return {
				tempMin: max,
				tempMax: min,
				phrase: fiveDaysForecast[0].day.IconPhrase
			};
		}

		return {
			tempMin: '',
			tempMax: '',
			phrase: ''
		};
	})();

	const isFavorite = () => {
		if (favoritesSet[location.key]) return true;
		return false;
	};

	// Toogle favorite
	function addToFav() {
		//don't add if already added
		if (!favoritesSet[location.key]) {
			// Add it to favorites
			dispatch({ type: 'setFavorites', value: currentPosition });
			dispatch({ type: 'setFavoritesSet', index: currentPosition.key, value: true });
		} else {
			// Remove it
			dispatch({ type: 'removeFavorites', value: currentPosition });
			dispatch({ type: 'setFavoritesSet', index: currentPosition.key, value: false });
		}
	}
	return (
		<section className="city-weather">
			<h4 className="title">Current Weather at</h4>

			<div className="main-top">
				<div className="main-top-left">
					<div className="location-info">
						<h1>{location.name}</h1>
						<h3>{location.country}</h3>
					</div>

					<div className="add-favorite">
						<button className={'button-hover-active ' + `${isFavorite() ? 'is-active' : ''}`} onClick={addToFav}>
							<span className="heart"></span>
						</button>
						<div>Favorite</div>
					</div>

					<div className="location-temperature">
						<h1 className="day-card-degree">
							<span>
								{forecast.tempMin}-{forecast.tempMax}
							</span>

							<span className="day-card-degree-type">{metric ? '°C' : '°F'}</span>
						</h1>
					</div>
				</div>

				<div className="main-top-right">
					<h3>{forecast.phrase}</h3>
				</div>
			</div>
		</section>
	);
};

export default CityWeather;

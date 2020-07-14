import React from 'react';
import icons from '../utils/icons.js';
import tempeConvert from '../utils/tempeConvert.js';
import { useSelector } from 'react-redux';

const DayCard = ({ day }) => {
	const metric = useSelector(state => state.metric);

	const forecast = (() => {
		let min = day.temperature.min;
		let max = day.temperature.max;

		if (!metric) {
			min = tempeConvert.celsiusToFahrenheit(day.temperature.max);
			max = tempeConvert.celsiusToFahrenheit(day.temperature.min);
		}

		return {
			tempMin: min,
			tempMax: max,
			dayName: day.dayName,
			date: day.date,
			phrase: day.IconPhrase,
			icon: icons.getIcons(day.day.Icon),
			link: day.link
		};
	})();

	return (
		<a href={forecast.link} className="day-card nonselected">
			<span className="day-info">
				<h2 className="day-card-name"> {forecast.dayName} </h2>
				<p className="day-card-date">{forecast.date}</p>
				<h1 className="day-card-degree">
					<span>
						{forecast.tempMin} - {forecast.tempMax}
					</span>

					<span className="day-card-degree-type"> {metric ? '°C' : '°F'}</span>
				</h1>
			</span>

			<div className="day-description weather-icon">
				<figure>
					<img src={forecast.icon} alt={forecast.phrase + `image`} />
				</figure>

				<span>{forecast.phrase}</span>
			</div>
		</a>
	);
};

export default DayCard;

import React, { useState } from 'react';

import DayCard from './DayCard';
import Loader from './Loader';

const CityWeekForcast = ({ fiveDaysForecast, metric }) => {
	return (
		<section className="city-week-forcast">
			<h4 className="title">Forecast for the next 5 days</h4>
			{
				<div className="day-cards-container">
					{fiveDaysForecast.length < 1 && <Loader />}
					{fiveDaysForecast.map(day => {
						return <DayCard key={day.dayName} day={day} />;
					})}
				</div>
			}
		</section>
	);
};

export default CityWeekForcast;

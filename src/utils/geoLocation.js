const apiKey = 'YFWtanEKLIJf8jbhQFxpJ1DInelAzxVY';

/* Locations API */

// Geolocation API - Web APIs
const getCurrentPosition = async function() {
	if (!navigator.geolocation) {
		return 'Geolocation is not supported by your browser';
	} else {
		navigator.geolocation.getCurrentPosition(
			position => {
				return {
					lot: position.coords.latitude,
					long: position.coords.longitude
				};
			},
			error => {
				return 'Unable to retrieve your location';
			}
		);
	}
	return 'Unable to retrieve your location';
};

// Returns information about a specific location, by GeoPosition (Latitude and Longitude).
const geoPosition = async function(lat, long) {
	const url = 'https://dataservice.accuweather.com/locations/v1/cities/geoposition/search';
	const params = `?apikey=${apiKey}&q=${lat},${long}&language=en-us HTTP/1.1`;

	return await fetch(`${url}${params}`)
		.then(res => res.json())
		.then(out => {
			return out;
		});
};

// Returns basic information about locations matching an autocomplete of the search text.
const searchAutoComplete = async function(inputVal) {
	const url = 'https://dataservice.accuweather.com/locations/v1/cities/autocomplete';
	const params = `?apikey=${apiKey}&q=${inputVal}&language=en-us HTTP/1.1`;

	return await fetch(`${url}${params}`)
		.then(res => res.json())
		.then(out => {
			return out;
		});
};

/* Forecast API */

// Returns an array of daily forecasts for the next 5 days for a specific location.
const fiveDaysForecast = async function(key) {
	const url = 'https://dataservice.accuweather.com/forecasts/v1/daily/5day/';
	// const isDetailed = false ? '' : '&details=true';
	const params = `${key}?apikey=${apiKey}&language=en-us&details=true&metric=true HTTP/1.1`;

	return await fetch(`${url}${params}`)
		.then(res => res.json())
		.then(out => {
			return out;
		});
};

export default {
	getCurrentPosition,
	geoPosition,
	searchAutoComplete,
	fiveDaysForecast
};

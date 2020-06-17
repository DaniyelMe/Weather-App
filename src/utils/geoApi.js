// const apiKey = 'YFWtanEKLIJf8jbhQFxpJ1DInelAzxVY';
const apiKey = 'Qreim9VCvrWQGiTlRBoTZAHe85gGIGwD';

const urlOrigin = 'https://dataservice.accuweather.com';
const paramsStart = `?apikey=${apiKey}&q=`;

/* Locations API */

// Returns information about a specific location, by GeoPosition (Latitude and Longitude).
const geoPosition = async (lat, long) => {
	const url = urlOrigin + '/locations/v1/cities/geoposition/search';
	const params = `${paramsStart}${lat},${long}&language=en-us HTTP/1.1`;

	return await fetch(`${url}${params}`)
		.then(res => res.json())
		.then(out => {
			return out;
		})
		.catch(error => {
			console.log(error);
			return error;
		});
};

// Returns basic information about locations matching an autocomplete of the search text.
const searchAutoComplete = async inputVal => {
	const url = urlOrigin + '/locations/v1/cities/autocomplete';
	const params = `${paramsStart}${inputVal}&language=en-us HTTP/1.1`;

	return await fetch(`${url}${params}`)
		.then(res => res.json())
		.then(out => {
			return out;
		})
		.catch(error => {
			console.log(error);
			return error;
		});
};

/* Forecast API */

// Returns an array of daily forecasts for the next 5 days for a specific location.
const fiveDaysForecast = async key => {
	const url = urlOrigin + '/forecasts/v1/daily/5day/';
	const params = `${key}?apikey=${apiKey}&language=en-us&details=true&metric=true HTTP/1.1`;

	return await fetch(`${url}${params}`)
		.then(res => res.json())
		.then(out => {
			return out;
		})
		.catch(error => {
			console.log(error);
			return error;
		});
};

export default {
	geoPosition,
	searchAutoComplete,
	fiveDaysForecast
};

// (0°C × 9/5) + 32 = 32°F
const celsiusToFahrenheit = celsius => {
	return Math.round(celsius * (9 / 5) + 32);
};

//(32°F − 32) × 5/9 = 0°C
const fahrenheitToCelsius = fahrenheit => {
	return Math.round((fahrenheit - 32) * (5 / 9));
};

export default {
	celsiusToFahrenheit,
	fahrenheitToCelsius
};

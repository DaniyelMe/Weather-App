const getIcons = function(id) {
	const origin = 'https://developer.accuweather.com/sites/default/files/';
	const number = id < 10 ? `0${id}` : id;

	return origin + number + '-s.png';
};

export default {
	getIcons
};

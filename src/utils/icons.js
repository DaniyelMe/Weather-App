const getIcons = function(id) {
	const origin = 'https://developer.accuweather.com/sites/default/files/';
	//Adds zero before numbers from 1-9
	const number = id < 10 ? `0${id}` : id;

	return origin + number + '-s.png';
};

export default {
	getIcons
};

// Reducers
const fiveDaysForecast = (state = [], action) => {
	switch (action.type) {
		case 'setFiveDaysForecast':
			state = action.value;
			return state;

		default:
			return state;
	}
};

const favorites = (state = [], action) => {
	switch (action.type) {
		case 'setFavorites':
			state = [...state, action.value];
			return state;
			break;
		case 'removeFavorites':
			return (state = state.filter(fav => fav.key !== action.value.key));
		default:
			return state;
	}
};

const favoritesSet = (state = {}, action) => {
	switch (action.type) {
		case 'setFavoritesSet':
			const temp = JSON.parse(JSON.stringify(state));
			temp[action.index] = action.value;
			state = temp;

			return state;
		default:
			return state;
	}
};

// Reducer
const metric = (state = true, action) => {
	switch (action.type) {
		case 'setMetric':
			return !state;
		default:
			return state;
	}
};

const theme = (state = true, action) => {
	switch (action.type) {
		case 'setTheme':
			return !state;

		default:
			return state;
	}
};

const isFindCity = (state = false, action) => {
	switch (action.type) {
		case 'setIsFindCity':
			state = action.value;
			return state;
		default:
			return state;
	}
};

const position = (state = { latitude: '32.0853', longitude: '34.7818' }, action) => {
	switch (action.type) {
		case 'setPosition':
			return (state = action.newItem);
		default:
			return state;
	}
};

const currentPosition = (
	state = {
		name: 'Tel Aviv',
		key: '215793',
		country: { name: 'Israel', id: 'IL' }
	},
	action
) => {
	switch (action.type) {
		case 'setCurrentPosition':
			state = action.newValue;
			return state;
		default:
			return state;
	}
};

export default {
	fiveDaysForecast,
	favorites,
	favoritesSet,
	metric,
	theme,
	isFindCity,
	position,
	currentPosition
};

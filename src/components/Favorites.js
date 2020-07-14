import React from 'react';

import { useSelector, useDispatch } from 'react-redux';

const Favorites = () => {
	const favorites = useSelector(state => state.favorites);
	const dispatch = useDispatch();

	function selected(e, favorite) {
		console.log('selected -> favorite', favorite);
		e.preventDefault();

		dispatch({ type: 'setCurrentPosition', newValue: favorite });

		Promise.resolve(dispatch({ type: 'fetchCurrentWeather', value: selected.Key })).then(() => {
			window.location.href = '/';
		});
	}

	return (
		<main>
			{favorites.map(favorite => {
				return (
					<div key={favorite.key} className="location-info day-card nonselected" onClick={e => selected(e, favorite)}>
						<h1>{favorite.name}</h1>
						<h3>{favorite.country.name}</h3>
					</div>
				);
			})}
		</main>
	);
};

export default Favorites;

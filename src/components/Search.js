import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import geoApi from '../utils/geoApi';

import Loader from './Loader';

const Search = () => {
	const [search, setSearch] = useState('');
	const [wating, setWating] = useState(false);
	const favoritesSet = useSelector(state => state.favoritesSet);
	const [searchResult, setSearchResult] = useState([
		{
			Version: 1,
			Key: '210841',
			Type: 'City',
			Rank: 20,
			LocalizedName: 'Tehran',
			Country: { ID: 'IR', LocalizedName: 'Iran' },
			AdministrativeArea: { ID: '07', LocalizedName: 'Tehran' }
		},
		{
			Version: 1,
			Key: '60592',
			Type: 'City',
			Rank: 23,
			LocalizedName: 'Tengzhou',
			Country: { ID: 'CN', LocalizedName: 'China' },
			AdministrativeArea: { ID: 'SD', LocalizedName: 'Shandong' }
		},
		{
			Version: 1,
			Key: '188046',
			Type: 'City',
			Rank: 30,
			LocalizedName: 'Tegucigalpa',
			Country: { ID: 'HN', LocalizedName: 'Honduras' },
			AdministrativeArea: { ID: 'FM', LocalizedName: 'Francisco Morazán' }
		},
		{
			Version: 1,
			Key: '45253',
			Type: 'City',
			Rank: 31,
			LocalizedName: 'Teresina',
			Country: { ID: 'BR', LocalizedName: 'Brazil' },
			AdministrativeArea: { ID: 'PI', LocalizedName: 'Piauí' }
		},
		{
			Version: 1,
			Key: '215854',
			Type: 'City',
			Rank: 31,
			LocalizedName: 'Tel Aviv',
			Country: { ID: 'IL', LocalizedName: 'Israel' },
			AdministrativeArea: { ID: 'TA', LocalizedName: 'Tel Aviv' }
		},
		{
			Version: 1,
			Key: '234337',
			Type: 'City',
			Rank: 31,
			LocalizedName: 'Tepic',
			Country: { ID: 'MX', LocalizedName: 'Mexico' },
			AdministrativeArea: { ID: 'NAY', LocalizedName: 'Nayarit' }
		},
		{
			Version: 1,
			Key: '246100',
			Type: 'City',
			Rank: 32,
			LocalizedName: 'Tetouan',
			Country: { ID: 'MA', LocalizedName: 'Morocco' },
			AdministrativeArea: { ID: '01', LocalizedName: 'Tanger-Tétouan-Al Hoceïma' }
		},
		{
			Version: 1,
			Key: '61484',
			Type: 'City',
			Rank: 33,
			LocalizedName: 'Tengchong',
			Country: { ID: 'CN', LocalizedName: 'China' },
			AdministrativeArea: { ID: 'YN', LocalizedName: 'Yunnan' }
		},
		{
			Version: 1,
			Key: '3558994',
			Type: 'City',
			Rank: 35,
			LocalizedName: 'Tecámac',
			Country: { ID: 'MX', LocalizedName: 'Mexico' },
			AdministrativeArea: { ID: 'MEX', LocalizedName: 'México' }
		},
		{
			Version: 1,
			Key: '234828',
			Type: 'City',
			Rank: 35,
			LocalizedName: 'Tehuacán',
			Country: { ID: 'MX', LocalizedName: 'Mexico' },
			AdministrativeArea: { ID: 'PUE', LocalizedName: 'Puebla' }
		}
	]);
	const isFindCity = useSelector(state => state.isFindCity);

	const dispatch = useDispatch();

	const toggleIsFindCity = () => {
		dispatch({ type: 'setIsFindCity', value: false });
	};

	const getResult = async e => {
		e.preventDefault();
		if (search.length < 2) return;

		setWating(true);
		setSearchResult([]);

		await geoApi.searchAutoComplete(e.target.value).then(result => {
			const filterd = result.map(local => {
				if (favoritesSet[local.Key]) local.fav = true;
				return local;
			});
			setSearchResult(filterd);
		});

		setWating(false);
	};

	async function handleResult(e, selected) {
		e.preventDefault();
		setWating(true);
		setSearchResult([]);

		// Senetaize uppercase
		const location = {
			name: selected.LocalizedName,
			key: selected.Key,
			country: { name: selected.Country.LocalizedName, id: selected.Country.ID }
		};

		dispatch({
			type: 'setCurrentPosition',
			newValue: {
				name: location.name,
				key: location.key,
				country: { name: location.country.name, id: location.country.id }
			}
		});

		 dispatch({ type: 'fetchCurrentWeather', value: selected.Key });

		dispatch({ type: 'isFindCity', newValue: false });
		setWating(false);
	}

	return (
		<>
			{(isFindCity || wating) && (
				<div className="search-container">
					<div className="add-city search animated fadeIn">
						<form onSubmit={getResult} onKeyUp={getResult} className="search-form">
							<input
								type="text"
								name="search"
								value={search}
								onChange={e => setSearch(e.target.value)}
								className="search-form-input"
								placeholder="Start typing here..."
							/>
						</form>

						{isFindCity && (
							<button className="close-popup button-hover-active animated fadeIn" onClick={toggleIsFindCity}>
								<span className="material-icons">close</span>
							</button>
						)}
					</div>

					{searchResult.length > 0 && (
						<div className="search-results">
							{searchResult.map(result => (
								<button key={result.Key} className="nonselected" onClick={e => handleResult(e, result)}>
									<h2>{result.LocalizedName}</h2>
									<h4>{result.Country.LocalizedName}</h4>

									{result.fav && <span className="material-icons">favorite</span>}
								</button>
							))}
						</div>
					)}
				</div>
			)}

			{wating && <Loader />}
		</>
	);
};

export default Search;

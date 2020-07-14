import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

const SiteHeader = ({}) => {
	const path = () => {
		return window.location.href;
	};

	const isFindCity = useSelector(state => state.isFindCity);

	const dispatch = useDispatch();

	const toggleIsFindCity = () => {
		dispatch({ type: 'setIsFindCity', value: true });
	};

	return (
		<header className="site-header nonselected">
			<div className="site-header-nav">
				<a href="/" className="logo nonselected">
					<img src="../assets/logo.svg" alt="weather app logo" />
				</a>

				<ol>
					<li>
						<a href="/" className={path == 'home' ? 'active-path' : undefined}>
							Home
						</a>
					</li>

					<li>
						<a href="/favorites" className={path == 'favorites' ? 'active-path' : undefined}>
							Favorites
						</a>
					</li>
				</ol>
			</div>

			{!isFindCity && (
				<div className="add-city animated fadeIn">
					<button className="add-location nonselected button-hover-active" onClick={toggleIsFindCity}>
						<div className="add-new-location-text">Add Location</div>
						<span className="material-icons">add</span>
					</button>
				</div>
			)}
		</header>
	);
};

export default SiteHeader;

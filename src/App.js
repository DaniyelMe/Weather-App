import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Home from './components/Home.js';
import Favorites from './components/Favorites.js';

import SiteHeader from './components/SiteHeader.js';
import SiteFooter from './components/SiteFooter.js';

const App = () => {
	const theme = useSelector(state => state.theme);
	const metric = useSelector(state => state.metric);
	const isFindCity = useSelector(state => state.isFindCity);

	const dispatch = useDispatch();

	const handler = function(type, value) {
		switch (type) {
			case 'setIsFindCity':
				setIsFindCity(value);
				break;
			case 'setTheme':
				dispatch({ type: 'setTheme' });
				break;
			case 'setMetric':
				dispatch({ type: 'setMetric' });
				break;

			default:
				break;
		}
	};

	return (
		<Router>
			<div className="container">
				<SiteHeader handler={handler} isFindCity={isFindCity} />

				{/* main */}
				<Switch>
					<Route path="/" exact>
						<Home text={handler} />
					</Route>

					<Route path="/home">
						<Home />
					</Route>

					<Route path="/favorites">
						<Favorites />
					</Route>
				</Switch>

				<SiteFooter handler={handler} theme={theme} metric={metric} />
			</div>
		</Router>
	);
};

export default App;

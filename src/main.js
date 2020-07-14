import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import storage from 'redux-persist/lib/storage';

import reducers from './store/reducers.js';

const persistConfig = {
	key: 'root',
	storage
};

const allReducers = combineReducers({
	...reducers
});
const persistedReducer = persistReducer(persistConfig, allReducers);
console.dir(persistedReducer);

const store = createStore(persistedReducer);
const persistor = persistStore(store);

import App from './App.js';

render(
	<BrowserRouter>
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<App />
			</PersistGate>
		</Provider>
	</BrowserRouter>,
	document.getElementById('app')
);

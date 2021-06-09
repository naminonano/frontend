import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { createStore, combineReducers, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";

import searchreducer from "../src/store/reducer/search/searchreducer";
import logininforeducer from "./store/reducer/userlogin/logininforeducer";
import itineraryreducer from "./store/reducer/itinerary/itineraryreducer";
import { watchlogin, watchsearchbox } from "./store/saga";
const sagamiddleware = createSagaMiddleware();

const combinereducer = combineReducers({
	search: searchreducer,
	itinerary: itineraryreducer,

	logininfo: logininforeducer
});

const store = createStore(combinereducer, applyMiddleware(sagamiddleware));
sagamiddleware.run(watchlogin);
sagamiddleware.run(watchsearchbox);
ReactDOM.render(
	<Provider store={store}>
		<React.StrictMode>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</React.StrictMode>
	</Provider>,
	document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

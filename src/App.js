import "./App.css";
import Search from "../src/container/search";
import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import Navigationbar from "./UI/navbar/navbar";
import Attraction from "./container/attraction";
// import { validateBattlefield } from "./test";
function App() {
	let route = (
		<Switch>
			<Route path="/attraction" component={Attraction} />
			<Route path="/" component={Search} />
		</Switch>
	);

	return (
		<div className="App">
			<Navigationbar />
			{route}

			{/* <Suspense fallback={<p>Loading...</p>}>{route}</Suspense> */}
		</div>
	);
}

export default withRouter(App);

import "./App.css";
import Search from "../src/container/search";
import Ordering from "../src/container/ordering";
import React, { Suspense } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import Ordercomplete from "./container/complete";
import Navigationbar from "./UI/navbar/navbar";
import Myorder from "./container/myorder";
import Attraction from "./container/attraction";
// import { validateBattlefield } from "./test";
function App() {
	let route = (
		<Switch>
			<Route path="/myorder" component={Myorder} />
			<Route path="/order" exact component={Ordering} />
			<Route path="/ordercomplete" component={Ordercomplete} />
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

import React from "react";
import classes from "./searchbox.module.css";
import * as action from "../../../store/action";
import { connect } from "react-redux";
const Filterdeparture = (props) => {
	let filteredcitybox = null;
	const updateinputhandler = (value) => {
		props.changedeparture(value, "click");
	};

	const filteredcity = props.availablecityarray.filter((i) => {
		return i.toLowerCase().includes(props.value);
	});

	filteredcitybox = filteredcity.map((i) => {
		const value = i;

		return (
			<h5
				className={classes.Filterlist}
				key={i}
				onClick={() => updateinputhandler(value)}
			>
				{i.toUpperCase()}
			</h5>
		);
	});

	//return <div>{touch ? filteredcitybox : null}</div>;
	if (props.show && filteredcity.length !== 0) {
		return <div className={classes.Filterbox}>{filteredcitybox}</div>;
	} else {
		return null;
	}
};
const matchstate = (state) => {
	return {
		value: state.search.departure,
		availablecityarray: state.search.availablecity,
		loading: state.search.loading,
		show: state.search.showdeparturefilter
	};
};
const matchdispatch = (dispatch) => {
	return {
		changedeparture: (value, click) =>
			dispatch(action.changedeparture(value, click))
	};
};
export default connect(matchstate, matchdispatch)(Filterdeparture);

import React from "react";
import * as action from "../../../store/action";
import { connect } from "react-redux";
import classes from "./searchbox.module.css";
const Filterarrival = (props) => {
	let filteredcitybox = null;

	const updateinputhandler = (value) => {
		props.changearrival(value, "click");
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
		show: state.search.showarrivalfilter,
		value: state.search.arrival,
		availablecityarray: state.search.availablecity,
		loading: state.search.loading
	};
};
const matchdispatch = (dispatch) => {
	return {
		changearrival: (value, click) =>
			dispatch(action.changearrival(value, click))
	};
};
export default connect(matchstate, matchdispatch)(Filterarrival);

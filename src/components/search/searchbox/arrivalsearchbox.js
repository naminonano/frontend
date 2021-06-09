import React from "react";
import classes from "./searchbox.module.css";
import { connect } from "react-redux";

import * as action from "../../../store/action";
//import Arrivalfilter from "./filterarrival";
const Arrivalsearchbox = (props) => {
	const val = props.arrival;
	const inputchange = (event) => {
		props.changear(event.target.value.toLowerCase());
	};
	return (
		<div className={classes.Arrivalbox}>
			<input
				className={classes.Arrival}
				type={"text"}
				placeholder={"ARRIVAL"}
				value={val.toUpperCase()}
				onChange={inputchange}
				onClick={() => props.arrivalclick()}
			/>
		</div>
	);
};

const matchstate = (state) => {
	return {
		arrival: state.search.arrival
	};
};
const matchdispatch = (dispatch) => {
	return {
		changear: (changes) => dispatch(action.changearrival(changes)),
		arrivalclick: () => dispatch(action.arrivalclick())
	};
};
export default connect(matchstate, matchdispatch)(Arrivalsearchbox);

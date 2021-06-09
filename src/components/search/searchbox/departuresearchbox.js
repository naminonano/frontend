import classes from "./searchbox.module.css";
import React from "react";
import { connect } from "react-redux";
import * as action from "../../../store/action";
// import Filterdeparture from "./filterdeparture";

const Departuresearchbox = (props) => {
	const val = props.departure;
	const inputchange = (event) => {
		props.changede(event.target.value.toLowerCase());
	};

	return (
		<div className={classes.Departurebox}>
			<input
				onClick={() => {
					props.departureclick();
				}}
				className={classes.Departure}
				type={"text"}
				placeholder={"DEPARTURE"}
				// value={val.toUpperCase()}
				value="Bangkok"
				onChange={inputchange}
			/>

			{/* {props.departure ? <Filterdeparture val={val} /> : null} */}
		</div>
	);
};

const matchstate = (state) => {
	return {
		departure: state.search.departure
	};
};
const matchdispatch = (dispatch) => {
	return {
		departureclick: () => dispatch(action.departureclick()),
		changede: (changes) => dispatch(action.changedeparture(changes))
	};
};
export default connect(matchstate, matchdispatch)(Departuresearchbox);

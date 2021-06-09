import React from "react";
import { connect } from "react-redux";
import * as action from "../../../store/action";
import classes from "./date.module.css";
const Date = (props) => {
	const showcalendar = () => {
		props.calendarclick();
	};
	const fromclass = [classes.Datebox, classes.From].join(" ");
	const toclass = [classes.Datebox, classes.To].join(" ");
	const from = `${props.from.date}/${props.from.month}/${props.from.year}`;
	const to = `${props.to.date}/${props.to.month}/${props.to.year}`;

	return (
		<div className={classes.Dateoutsidebox}>
			<div
				//placeholder={"DATE"}
				className={fromclass}
				onClick={() => showcalendar()}
			>
				<h6 className={classes.Placeholder}>FROM</h6>
				<h3 className={classes.Text}>{props.from ? from : "DATE"}</h3>
			</div>
			<div
				placeholder={"DATE"}
				className={toclass}
				onClick={() => showcalendar()}
			>
				<h6 className={classes.Placeholder}>To</h6>
				<h3 className={classes.Text}>{props.to ? to : "DATE"}</h3>
			</div>
		</div>
	);
};
const matchstate = (state) => {
	return {
		showcalendar: state.search.showcalendar,
		from: state.search.from,
		to: state.search.to
	};
};
const matchdispatch = (dispatch) => {
	return {
		calendarclick: () => dispatch(action.calendarclick())
	};
};
export default connect(matchstate, matchdispatch)(Date);

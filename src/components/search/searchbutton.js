import React from "react";
import Button from "../../UI/button/button";
import { connect } from "react-redux";
import axios from "axios";
import * as action from "../../store/action/index";
import classes from "./search.module.css";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const A = (props) => {
	const click = () => {
		props.setplan();
		props.click();
	};
	let buttons = (
		<Button text="Search" addclass={"search"} onclick={() => click()} />
	);

	return <div className={classes.Buttonbox}>{buttons}</div>;
};
const matchstate = (state) => {
	return {
		departure: state.search.departure,
		arrival: state.search.arrival
	};
};
const matchdispatch = (dispatch) => {
	return {
		setplan: () => dispatch(action.updateplan([], true)),
		setsearch: () => dispatch(action.startload()),
		setsearchnotloading: () => dispatch(action.stopload()),
		updateroute: (route) => dispatch(action.updateroute(route))
	};
};
export default connect(matchstate, matchdispatch)(A);

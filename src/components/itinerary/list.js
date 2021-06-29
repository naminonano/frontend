import React from "react";
import classes from "./list.module.css";
import { connect } from "react-redux";
import * as action from "../../store/action";

import {
	faStar,
	faStarHalf,
	faPlusCircle,
	faMinusCircle
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const List = (props) => {
	let star = [0, 0, 0, 0, 0];
	const score = parseFloat(props["rating"]);
	for (let i = 0; i < score - 1; i++) {
		star[i] = 1;
	}
	if (score % 1 >= 0.5) {
		star[Math.floor(score)] = 0.5;
	}

	let st = (
		<div className={classes.row}>
			{star.map((i, j) => (
				<div key={j}>
					<FontAwesomeIcon
						// onClick={() => {
						//     tonextmonth();
						// }}
						icon={i !== 0.5 ? faStar : faStarHalf}
						size={"sm"}
						className={i > 0 ? classes.yellow : classes.grey}
					/>
				</div>
			))}
		</div>
	);
	let icon = (
		<FontAwesomeIcon
			onClick={() => {
				props.removeselected(props.name);
			}}
			icon={faMinusCircle}
			size={"2x"}
			// className={i > 0 ? classes.yellow : classes.grey}
		/>
	);
	// console.log(props.selectedattractions);
	if (!props.selectedattractions.includes(props.name)) {
		icon = (
			<FontAwesomeIcon
				onClick={() => {
					props.addselected(props.name);
				}}
				icon={faPlusCircle}
				size={"2x"}
				// className={i > 0 ? classes.yellow : classes.grey}
			/>
		);
	}

	return (
		<div className={classes.listrow}>
			<div className={classes.list} key={props.name}>
				{score}
				<div>{props.name}</div>
				<div>{st}</div>
				<div> {props.totalreview}</div>
			</div>
			<div className={classes.addbutton}>{icon}</div>
		</div>
	);
};
const matchstate = (state) => {
	return {
		selectedattractions: state.itinerary.selected
	};
};
const matchdispatch = (dispatch) => {
	return {
		addselected: (name) => dispatch(action.addselected(name)),
		removeselected: (name) => dispatch(action.removeselected(name))
	};
};

export default connect(matchstate, matchdispatch)(List);

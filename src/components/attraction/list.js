import React from "react";
import classes from "./list.module.css";
import { faStar, faStarHalf } from "@fortawesome/free-solid-svg-icons";
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
			{star.map((i) => (
				<div>
					<FontAwesomeIcon
						icon={i !== 0.5 ? faStar : faStarHalf}
						size={"sm"}
						className={i > 0 ? classes.yellow : classes.grey}
					/>
				</div>
			))}
		</div>
	);

	return (
		<div className={classes.list}>
			{score}
			<div>{props.name}</div>
			<div>{props.website}</div>
			<div>{st}</div>
			<div> {props.totalreview}</div>
			<button className={classes.cat}>Add to favorites</button>
		</div>
	);
};

export default List;

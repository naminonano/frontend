import React from "react";
import classes from "./list.module.css";
const Plan = (props) => {
	let a = props.plan.map((i, j) => (
		<div>
			<h3>Day:{j + 1}</h3>
			{i[2].map((k) => (
				<div>{k}</div>
			))}
			<h3>Stay:{i[0]}</h3>
			<h3>Transportation:{i[1]}</h3>
		</div>
	));

	return <div>{a}</div>;
};

export default Plan;

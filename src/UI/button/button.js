import React from "react";
import classes from "./button.module.css";
const BUTTON = (props) => {
	let disabled = null;
	console.log(props.disabled);
	if (props.disabled === true) {
		disabled = classes.disabled;
	}

	let classe = [classes.button, disabled, classes[props.addclass]].join(" ");

	return (
		<button
			className={classe}
			onClick={props.onclick}
			disabled={props.disabled}
		>
			{props.text}
		</button>
	);
};
export default BUTTON;

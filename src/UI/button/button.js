import React from "react";
import classes from "./button.module.css";
const BUTTON = (props) => {
	let disabled = null;
	if (props.disabled === true) {
		disabled = classes.disabled;
	}

	let classe = [classes.button, classes[props.addclass], disabled].join(" ");

	return (
		<button className={classe} onClick={props.onclick}>
			{props.text}
		</button>
	);
};
export default BUTTON;

import React, { useEffect, useState } from "react";
import classes from "./list.module.css";
import List from "./list";
const Listbox = (props) => {
	const [content, setcontent] = useState();

	let ar = [];
	
	let a = props.list.map((i) => {
		if (props.category==="All"){
			return (
				<List
					onClick={() => alert("cc")}
					name={i["name"]}					
					finaltype={i["finaltype"]}
					totalreview={i["totalreview"]}
					rating={i["rating"]}
				/>
			);
		}
		else if (i["finaltype"].includes(props.category.replaceAll("_", " "))) {
			return (
				<List
					onClick={() => alert("cc")}
					name={i["name"]}					
					finaltype={i["finaltype"]}
					totalreview={i["totalreview"]}
					rating={i["rating"]}
				/>
			);
		}
	});
	return (
		<div>
			{props.category}
			<div className={classes.listbox}>{a}</div>;
		</div>
	);
};

export default Listbox;

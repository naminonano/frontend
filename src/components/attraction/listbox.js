import React, { useEffect, useState } from "react";
import classes from "./list.module.css";
import List from "./list";
const Listbox = (props) => {
	const [content, setcontent] = useState();

	let ar = [];

	let a = props.list.map((i) => (
		<List
			onClick={() => alert("cc")}
			name={i["name"]}
			website={i["website"]}
			finaltype={i["finaltyoe"]}
			totalreview={i["totalreview"]}
			rating={i["rating"]}
		/>
	));
	return <div className={classes.listbox}>{a}</div>;
};

export default Listbox;

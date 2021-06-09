import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import classes from "./list.module.css";
import List from "./list";
import Createbutton from "./createitinerary";
import Autocreatebutton from "./autocreate";
import Plan from "./plan";
import Spinner from "../../UI/spinner/spinner";
const Listbox = (props) => {
	// const [plan, setplan] = useState(props.plan);
	let ar = [];

	let a = props.list.map((i) => (
		<List
			key={i["name"]}
			onClick={() => alert("cc")}
			name={i["name"]}
			website={i["website"]}
			finaltype={i["finaltyoe"]}
			totalreview={i["totalreview"]}
			rating={i["rating"]}
		/>
	));
	return (
		<div>
			{props.loading ? (
				<Spinner />
			) : (
				<div className={classes.listbox}>
					<div className={classes.selected}>
						{props.selected}
						<Createbutton selected={props.selected} />
						<Autocreatebutton selected={props.list} />
					</div>
					{props.plan.length > 0 ? <Plan plan={props.plan} /> : a}
				</div>
			)}
		</div>
	);
};
const matchstate = (state) => {
	return {
		loading: state.search.loading,
		plan: state.itinerary.plan
	};
};
export default connect(matchstate)(Listbox);

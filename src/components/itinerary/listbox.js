import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import classes from "./list.module.css";
import List from "./list";
import Createbutton from "./createitinerary";
import Autocreatebutton from "./autocreate";
import Plan from "./plan";
import Spinner from "../../UI/spinner/spinner";

import TimePicker from "react-time-picker";
const Listbox = (props) => {
	const [start, changestart] = useState("10:00");
	const [end, changeend] = useState("20:00");

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
	const converttomin = (s) => {
		let m = 0;
		if (s) {
			s = s.split(":");
			m += parseInt(s[0]) * 60;
			m += parseInt(s[1]);
		}
		return m;
	};
	console.log(props.selected);
	return (
		<div>
			{props.loading ? (
				<Spinner />
			) : (
				<div className={classes.listbox}>
					<div className={classes.selected}>
						<div>
							Start
							<TimePicker
								onChange={changestart}
								disableClock={true}
								value={start}
							/>
						</div>
						<div>
							End
							<TimePicker
								onChange={changeend}
								disableClock={true}
								value={end}
							/>
						</div>
						<Createbutton
							selected={props.selected}
							start={converttomin(start)}
							end={converttomin(end)}
						/>
						{/* <Autocreatebutton
							selected={props.list}
							start={converttomin(start)}
							end={converttomin(end)}
						/> */}
					</div>
					{props.selected.length > 0
						? props.selected.map((i) => <div>{i}</div>)
						: null}
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

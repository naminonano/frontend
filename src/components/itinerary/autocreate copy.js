import React from "react";
import Button from "../../UI/button/button";
import { connect } from "react-redux";
import axios from "axios";
import * as action from "../../store/action/index";
import classes from "./list.module.css";

import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const A = (props) => {
	let selected = props.top.map((i) => i["name"]);
	const x = JSON.stringify(selected);

	const q = {
		query: `
        {
          
            getduration(selected:${x}){
                from to distance duration
            }
			
        }
        `
	};
	let info = null;
	let durationlist = null;
	let test = {};
	for (let i in selected) {
		test[selected[i]] = Math.floor(Math.random() * 120) + 60;
	}
	const click = () => {
		props.startload();
		axios
			.post("http://localhost:8000/graphql", q)
			.then((res) => {
				durationlist = res.data.data.getduration;
				props.updateplan(create(test, 500));
				props.stopload();
			})
			.catch((err) => console.log(err));
	};
	const converttomin = (s) => {
		let m = 0;
		if (s.includes("hours")) {
			s = s.split("hours");
			m = parseInt(s[0]) * 60 + (parseInt(s[1].split("mins")[0]) || 0);
			return m;
		} else if (s.includes("hour")) {
			s = s.split("hour");
			m = parseInt(s[0]) * 60 + (parseInt(s[1].split("mins")[0]) || 0);
			return m;
		} else if (s.includes("mins")) {
			return parseInt(s.split("mins")[0]);
		} else {
			return parseInt(s.split("min")[0]);
		}
	};

	const create = (d, maxminute) => {
		let daydict = {};
		let unselected = { ...d };
		let day = 1;
		while (Object.keys(unselected).length > 0) {
			let cat = {};
			let usemin = 0;
			let f = Object.keys(unselected)[0];
			daydict[day] = [f];
			usemin += d[f];
			let latest = f;
			let stay = d[f];
			let travel = 0;
			while (true && Object.keys(unselected).length > 0) {
				if (latest in unselected) {
					delete unselected[latest];
				}

				let dlist = durationlist.filter((i) => {
					return (
						i["from"] === latest && Object.keys(unselected).includes(i["to"])
					);
				});
				dlist = dlist.sort((a, b) => {
					a = converttomin(a["duration"]);
					b = converttomin(b["duration"]);
					return a - b;
				});
				let shouldnextday = null;
				for (let l in dlist) {
					l = dlist[l];
					let m = converttomin(l["duration"]);
					if (unselected[l["to"]] + m + usemin <= maxminute) {
						usemin += m;
						usemin += unselected[l["to"]];
						stay += unselected[l["to"]];
						travel += m;
						let a = [...daydict[day]];
						a.push(l["to"]);
						daydict[day] = a;
						delete unselected[l["to"]];
						shouldnextday = false;
						break;
					}
					shouldnextday = true;
				}
				if (shouldnextday) {
					break;
				}

				// durationlist;
				// catdict;
			}
			daydict[day] = [stay, travel, daydict[day]];
			console.log(daydict[day]);

			day += 1;
		}
		let pp = [];
		for (let i in daydict) {
			pp.push(daydict[i]);
		}
		console.log(daydict, "rr");
		return pp;
	};
	let buttons = (
		<Button
			text="Auto-create Itinerary"
			addclass={"search"}
			onclick={() => click()}
		/>
	);

	return <div className={classes.Buttonbox}>{buttons}</div>;
};
const matchstate = (state) => {
	return {
		departure: state.search.departure,
		arrival: state.search.arrival,
		top: state.itinerary.top
	};
};
const matchdispatch = (dispatch) => {
	return {
		startload: () => dispatch(action.startload()),
		stopload: () => dispatch(action.stopload()),
		updateplan: (plan) => dispatch(action.updateplan(plan)),
		updateroute: (route) => dispatch(action.updateroute(route))
	};
};
export default connect(matchstate, matchdispatch)(A);

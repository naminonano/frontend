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
            getinfo(selected:${x}) {
                name open0
				close0
				open1
				close1
				open2
				close2
				open3
				close3
				open4
				close4
				open5
				close5
				open6
				close6
            }
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
		console.log(props.selected);
		props.startload();
		axios
			.post("http://localhost:8000/graphql", q)
			.then((res) => {
				info = res.data.data.getinfo;
				let newinfo = {};
				for (let i in info) {
					let d = info[i];

					newinfo[d["name"]] = d;
				}
				info = { ...newinfo };

				durationlist = res.data.data.getduration;
				props.updateplan(create(test, props.start, props.end));
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
	const isopen = (time, name, date, spend) => {
		console.log(name);

		let open = 0;
		let close = 0;
		let o = info[name]["open" + date.toString()];
		let c = info[name]["close" + date.toString()];
		if (o === null || c === null) {
			console.log(name);
			return false;
		}
		o = o.split(" ");
		c = c.split(" ");
		open += parseInt(o[0]) * 60 + parseInt(o[1]);
		close += parseInt(c[0]) * 60 + parseInt(c[1]);
		if (time >= open && time + spend <= close) {
			return true;
		}
		return false;
	};
	const createtimestring = (s, e) => {
		const h = (s) => {
			if (Math.floor(s / 60) < 10) {
				return "0" + Math.floor(s / 60).toString();
			}
			return Math.floor(s / 60).toString();
		};
		const m = (s) => {
			if (Math.floor(s % 60) < 10) {
				return "0" + Math.floor(s % 60).toString();
			}
			return Math.floor(s % 60).toString();
		};
		s = h(s) + ":" + m(s);

		e = h(e) + ":" + m(e);
		return s + "-" + e;
	};
	const create = (d, start, maxtime) => {
		let daydict = {};
		let unselected = { ...d };
		let day = 1;
		let time = start;
		let timeout = 15;
		let timeout_start = Date.now();

		while (
			Object.keys(unselected).length > 0 &&
			Date.now() <= timeout_start + timeout
		) {
			let cat = {};
			let usemin = 0;

			let f = null;
			for (let i in unselected) {
				if (isopen(start, i, day, unselected[i])) {
					f = i;
					break;
				}
			}
			daydict[day] = [[f, createtimestring(time, time + d[f])]];
			time += d[f];
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
					if (
						unselected[l["to"]] + m + time <= maxtime &&
						isopen(time, l["to"], day, unselected[l["to"]])
					) {
						let a = [...daydict[day]];
						a.push(["transport", createtimestring(time, time + m)]);
						time += m;
						a.push([
							l["to"],
							createtimestring(time, time + unselected[l["to"]])
						]);
						time += unselected[l["to"]];
						stay += unselected[l["to"]];
						travel += m;
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
			}
			daydict[day] = [stay, travel, daydict[day]];
			time = start;
			day += 1;
		}
		let pp = [];
		for (let i in daydict) {
			pp.push(daydict[i]);
		}
		console.log(pp);
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

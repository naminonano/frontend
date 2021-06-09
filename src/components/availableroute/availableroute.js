import React from "react";
import Auxi from "../../HOC/Auxi";
import { connect } from "react-redux";
import * as action from "../../store/action";
import { useHistory } from "react-router-dom";
import classes from "./availableroute.module.css";
import Sort from "./sort/sort";
const AVROUTE = (props) => {
	var array = [];
	const history = useHistory();
	for (let i in props.route) {
		array.push({
			id: i,
			price: props.route[i].price,
			seatleft: props.route[i].seatleft,
			time: props.route[i].time
		});
	}
	const sortbylowprice = [...array].sort((a, b) => a.price - b.price);
	const sortbyhighprice = [...array].sort((a, b) => b.price - a.price);
	const sortbytime = [...array].sort((a, b) => a.time - b.time);
	const sortbyseatleft = [...array].sort((a, b) => b.seatleft - a.seatleft);

	const selectedroutehandler = (route) => {
		history.push("/order");
		props.updateselectedroutehandler(route);
	};
	let avialable = null;

	const showroute = (array) => {
		if (array.length !== 0) {
			avialable = (
				<Auxi>
					<Sort />
					{[...array].map((i) => {
						if (i.seatleft > 0) {
							return (
								<div
									className={classes.box}
									key={i.time}
									onClick={() => selectedroutehandler(i)}
								>
									<h6>
										TIME :{i.time}
										<span className={classes.tab}>PRICE :{i.price}</span>
									</h6>
								</div>
							);
						}
						return i;
					})}
				</Auxi>
			);
			return { avialable };
		}

		if (array.length === 0 && props.searched) {
			avialable = <h1>NO ROUTE AVAILABLE</h1>;
			return { avialable };
		}
	};

	switch (props.sortby) {
		case "lowerprice":
			showroute(sortbylowprice);
			break;
		case "higherprice":
			showroute(sortbyhighprice);
			break;
		case "time":
			showroute(sortbytime);
			break;
		case "recommended":
			showroute(sortbyseatleft);
			break;
		default:
			showroute(sortbylowprice);
	}
	return <Auxi>{avialable}</Auxi>;
};

const matchstate = (state) => {
	return {
		searched: state.search.searched,
		route: state.search.availableroute,
		sortby: state.search.sortby
	};
};
const matchdispatch = (dispatch) => {
	return {
		updateselectedroutehandler: (route) =>
			dispatch(action.updateselectedroute(route))
	};
};
export default connect(matchstate, matchdispatch)(AVROUTE);

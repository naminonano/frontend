import React, { useEffect } from "react";
import { connect } from "react-redux";
import classes from "./myorderbox.module.css";
import Spinner from "../../UI/spinner/spinner";
import * as action from "../../store/action";
const Myorderbox = (props) => {
	const { fetchmyorder, loading, userid, myorderinfo } = props;
	let myorderbox = null;

	useEffect(() => {
		console.log("myorderboxrerender");
		fetchmyorder(userid);
	}, [fetchmyorder, userid]);

	if (loading) {
		myorderbox = <Spinner />;
	}
	if (myorderinfo) {
		myorderbox = myorderinfo.map((i) => {
			return (
				<div key={i.orderid}>
					<h2>ORDER ID : {i.orderid}</h2>
					<h3>ROUTE ID : {i.routeid}</h3>
					<h3>
						FROM :{i.departure}
						<span className={classes.tab} /> TO :{i.arrival}
					</h3>
					<h3>DEPARTURE TIME : {i.time}</h3>
					<h3>PRICE : {i.price}</h3>
				</div>
			);
		});
	}

	return <div>{myorderbox}</div>;
};
const matchstate = (state) => {
	return {
		userid: state.logininfo.userid,
		loading: state.logininfo.loading,
		myorderinfo: state.logininfo.myorder
	};
};
const matchdispatch = (dispatch) => {
	return {
		fetchmyorder: (userid) => dispatch(action.fetchmyorder(userid))
	};
};
export default connect(matchstate, matchdispatch)(Myorderbox);

import React, { useState } from "react";
import { connect } from "react-redux";
import classes from "./navbar.module.css";
import { useHistory } from "react-router-dom";
import * as action from "../../store/action";
import Authentication from "../../components/Authentication/auth";
import Auxi from "../../HOC/Auxi";
const NAVBAR = (props) => {
	const history = useHistory();
	const [showlogin, setshowlogin] = useState(false);

	return (
		<Auxi>
			<div className={classes.navbar}>
				<h3
					onClick={() => {
						history.replace("/");
					}}
				>
					HOME
				</h3>
				<h3
					onClick={() => {
						history.replace("/attraction");
					}}
				>
					ATTRACTIONS
				</h3>
				<h3 onClick={() => setshowlogin(true)}>LOGIN</h3>
			</div>
			{showlogin ? (
				<Authentication
					show={showlogin}
					backgroundclick={() => {
						setshowlogin(false);
						props.setlogintouch(false);
					}}
				/>
			) : null}
		</Auxi>
	);
};
const matchdispatch = (dispatch) => {
	return {
		resetstate: () => dispatch(action.resetstate()),
		setlogintouch: (t) => dispatch(action.setlogintouch(t))
	};
};
export default connect(null, matchdispatch)(NAVBAR);

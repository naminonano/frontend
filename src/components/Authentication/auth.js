import Signup from "./signup/signup";
import Login from "./login/login";
import Forgotpassword from "./forgotpassword/forgotpassword";
import Aux from "../../HOC/Auxi";
import { connect } from "react-redux";
import classes from "./authentication.module.css";
const Auth = (props) => {
	return (
		<Aux>
			<div className={classes.Background} onClick={props.backgroundclick}></div>
			{props.authmode === "signup" ? (
				<Signup />
			) : props.authmode === "forgotpassword" ? (
				<Forgotpassword />
			) : (
				<Login />
			)}
		</Aux>
	);
};
const matchstate = (state) => {
	return { authmode: state.logininfo.authmode };
};

export default connect(matchstate)(Auth);

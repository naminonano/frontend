import * as yup from "yup";
import { Formik, Form, Field } from "formik";
import classes from "../authentication.module.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Spinner from "../../../UI/spinner/spinner";
import { connect } from "react-redux";
import * as action from "../../../store/action";
const RegisterSchema = yup.object().shape({
	email: yup.string().required("required"),
	password: yup
		.string()

		.required("Password is Required")
});
const Login = (props) => {
	const [loading, setloading] = useState(false);
	const [shouldtransition, setshoultransition] = useState(null);
	const { logintouch, setlogintouch } = props;
	const storedjwt = localStorage.getItem("token");
	const [jwt, setjwt] = useState(storedjwt || null);
	useEffect(() => {
		if (!logintouch) {
			setlogintouch(true);
			setshoultransition(classes.Transition);
		}
	}, [logintouch, setlogintouch]);
	// axios.interceptors.request.use((config) => {
	// 	console.log(config);
	// });

	const loginuser = (email, password) => {
		setloading(true);
		axios
			.post(
				"https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCXdQHbG0mlL22TCJtUswdIMFLuTyTpxA4",
				{ email: email, password: password, returnSecureToken: true }
			)
			.then((res) => {
				localStorage.setItem("token", res.data.idToken);
				setjwt(res.data.idToken);
				console.log(jwt);
				setloading(false);
			})
			.catch((err) => {
				setloading(false);
				console.log(err);
			});
	};
	return (
		<Formik
			validationSchema={RegisterSchema}
			initialValues={{
				email: "",
				password: ""
			}}
			onSubmit={(value) => {
				loginuser(value.email, value.password);
			}}
		>
			{({ errors, touched }) => {
				const field = (name, placeholder, type, noerror) => (
					<Field
						className={
							noerror
								? classes.Input
								: errors[name] && touched[name]
								? [classes.Input, classes.Error].join(" ")
								: classes.Input
						}
						placeholder={placeholder}
						id={name}
						name={name}
						type={type}
					/>
				);

				return (
					// // <Aux>
					// 	{/* <Form id="b">
					// 		<button type="submit">b</button>
					// 	</Form> */}
					// 	// <Form id="a">
					<Form id="a">
						{!shouldtransition && !props.logintouch ? null : (
							<div
								className={[
									classes.Loginbox,
									classes.slidein,
									shouldtransition
								].join(" ")}
							>
								<h2>LOG IN</h2>

								{field("email", "Email", "email", "noerror")}
								{field("password", "Password", "password", "noerror")}
								{loading ? (
									<Spinner />
								) : (
									<button type="submit" className={classes.Button}>
										LOG IN
									</button>
								)}
								<div>
									<span>
										<b
											onClick={() => {
												props.selectauth("forgotpassword");
											}}
										>
											Forgot password?
										</b>
									</span>
								</div>
								<div>
									<span>
										{`Don't have an account?`}
										<span className={classes.tab} />
										<b
											onClick={() => {
												props.selectauth("signup");
											}}
										>
											Sign up
										</b>
									</span>
								</div>
							</div>
						)}
					</Form>
					// </Aux>
				);
			}}
		</Formik>
	);
};
const matchstate = (state) => {
	return {
		logintouch: state.logininfo.logintouch,
		authmode: state.logininfo.authmode
	};
};
const matchdispatch = (dispatch) => {
	return {
		setlogintouch: (trueorfalse) => dispatch(action.setlogintouch(trueorfalse)),
		selectauth: (authmode) => dispatch(action.selectauth(authmode))
	};
};
export default connect(matchstate, matchdispatch)(Login);

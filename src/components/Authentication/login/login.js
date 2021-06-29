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
		const q = {
			query: `
		    query UserLogin($email: String!, $password: String!) {
		      login(email: $email, password: $password) {
			token
			userId
		      }
		    }
		  `,
			variables: {
				email: email,
				password: password
			}
		};
		// setloading(true);
		axios
			.post("http://localhost:8000/graphql", q)
			.then((res) => {
				console.log(res);
				return res.data.data.login;
			})
			.then((resData) => {
				//     if (resData.errors && resData.errors[0].status === 422) {
				//       throw new Error(
				// 	"Validation failed. Make sure the email address isn't used yet!"
				//       );
				//     }
				//     if (resData.errors) {
				//       throw new Error('User login failed!');
				//     }
				console.log(resData);
				//     this.setState({
				//       isAuth: true,
				//       token: resData.data.login.token,
				//       authLoading: false,
				//       userId: resData.data.login.userId
				//     });
				localStorage.setItem("token", resData.token);
				localStorage.setItem("userId", resData.userId);
				const remainingMilliseconds = 60 * 60 * 1000;
				const expiryDate = new Date(
					new Date().getTime() + remainingMilliseconds
				);
				localStorage.setItem("expiryDate", expiryDate.toISOString());
				//     this.setAutoLogout(remainingMilliseconds);
			})
			.catch((err) => {
				console.log(err);
				// this.setState({
				// 	isAuth: false,
				// 	authLoading: false,
				// 	error: err
				// });
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

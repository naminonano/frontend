import * as yup from "yup";
import { Formik, Form, Field } from "formik";
import classes from "../authentication.module.css";
import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import * as action from "../../../store/action";
import Spinner from "../../../UI/spinner/spinner";
const RegisterSchema = yup.object().shape({
	firstname: yup.string().required("Please enter your first name"),
	lastname: yup.string().required("Pleas enter your last name"),
	email: yup.string().email("Invalid email").required("required"),
	password: yup
		.string()
		.min(8, "Please Enter more than 8 letters")
		.required("Password is Required"),
	confirmpassword: yup
		.string()
		.min(8)
		.required("Pleas confirm your password")
		.when("password", {
			is: (password) => (password && password.length > 0 ? true : false),
			then: yup.string().oneOf([yup.ref("password")], "Password doesn't match")
		})
});
const Signup = (props) => {
	const [loading, setloading] = useState(false);
	const his = useHistory();

	const signupuser = (email, password) => {
		const q = {
			query: `
			 mutation CreateNewUser($email: String!, $password: String!) {
			    createuser(email: $email, password: $password)
			 }
			`,
			variables: {
				email: email,
				password: password
			}
		};
		setloading(true);
		axios
			.post("http://localhost:8000/graphql", q)
			.then((res) => {
				console.log(res);
				his.replace("/");
				setloading(false);
			})
			.catch((err) => console.log(err));
	};

	return (
		<div>
			<Formik
				validationSchema={RegisterSchema}
				initialValues={{
					firstname: "",
					lastname: "",
					email: "",
					password: "",
					confirmpassword: ""
				}}
				onSubmit={(value) => {
					console.log(value);
					signupuser(value.email, value.password);
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
						<Form>
							<div className={[classes.Signupbox, classes.slidein].join(" ")}>
								<h2>SIGN UP</h2>
								{field("firstname", "First Name", "text")}
								{/* {errors.firstname && touched.firstname ? (
									<p>{errors.firstname}</p>
								) : null} */}

								{field("lastname", "Last Name", "text")}
								{/* {errors.lastname && touched.lastname ? (
									<p>{errors.lastname}</p>
								) : null} */}

								{/* <label htmlFor="email">EMAIL</label> */}
								{field("email", "Email", "email")}
								{errors.email && touched.email ? <p>{errors.email}</p> : null}

								{/* <label htmlFor="password">PASSWORD</label> */}
								{field("password", "Password", "password")}
								{/* <label htmlFor="confirmpassword">CONFIRM PASSWORD</label> */}
								{errors.password && touched.password ? (
									<p>{errors.password}</p>
								) : null}
								{field("confirmpassword", "Confirm Password", "password")}
								{errors.confirmpassword && touched.confirmpassword ? (
									<p>{errors.confirmpassword}</p>
								) : null}
								{loading ? (
									<Spinner />
								) : (
									<button
										type="submit"
										className={classes.Button}
										disabled={
											errors.email || errors.password || errors.confirmpassword
										}
									>
										SIGN UP
									</button>
								)}
								<div>
									<span>
										{`Already have an account?`}
										<span className={classes.tab} />
										<b
											onClick={() => {
												props.selectauth("login");
											}}
										>
											Log in
										</b>
									</span>
								</div>
							</div>
						</Form>
					);
				}}
			</Formik>
		</div>
	);
};
const matchdispatch = (dispatch) => {
	return { selectauth: (authmode) => dispatch(action.selectauth(authmode)) };
};
export default connect(null, matchdispatch)(Signup);

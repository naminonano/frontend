import * as yup from "yup";
import { Formik, Form, Field } from "formik";
import classes from "../authentication.module.css";
import axios from "axios";
import React from "react";
// import Spinner from "../../../UI/spinner/spinner";
import * as action from "../../../store/action";
import { connect } from "react-redux";

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
const Forgotpassword = (props) => {
	// const [loading, setloading] = useState(false);
	const loginuser = (email, password) => {
		//setloading(true);
		axios
			.post(
				"https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCXdQHbG0mlL22TCJtUswdIMFLuTyTpxA4",
				{ email: email, password: password, returnSecureToken: true }
			)
			.then((res) => {
				//	setloading(false);
				console.log(res);
			})
			.catch((err) => {
				console.log(err);
			});
	};
	return (
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
					<Form>
						<div
							className={[classes.Forgotpasswordbox, classes.slidein].join(" ")}
						>
							<h4>Please enter your email</h4>

							{field("email", "Email", "email", "noerror")}

							<button type="submit" className={classes.Button}>
								Send reset password link
							</button>
							<div>
								<span>
									<b
										onClick={() => {
											props.selectauth("signin");
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
	);
};
const matchdispatch = (dispatch) => {
	return { selectauth: (authmode) => dispatch(action.selectauth(authmode)) };
};

export default connect(null, matchdispatch)(Forgotpassword);

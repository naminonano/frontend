import React, { useState, useMemo } from "react";
import { connect } from "react-redux";
import { checkValidity, updateObject } from "../../shared/utility/utility";
import { useHistory } from "react-router-dom";
import Input from "../../UI/input/input";
import Button from "../../UI/button/button";
import Auxi from "../../HOC/Auxi";
import axios from "axios";
import Spinner from "../../UI/spinner/spinner";

const A = (props) => {
	const history = useHistory();
	if (!props.selectedroute || !props.userid) {
		history.replace("/");
	}
	const selectedroute = useMemo(() => {
		const selectedroutearray = [];
		if (props.selectedroute)
			for (let i in props.selectedroute) {
				let a = props.selectedroute[i];
				if (i !== "seatleft") {
					selectedroutearray.push(i.toUpperCase() + ":");
					if (i === "id") {
						selectedroutearray.push(a.toUpperCase() + "  ");
					} else {
						selectedroutearray.push(a + "  ");
					}
				}
			}

		console.log("run");

		return selectedroutearray;
	}, [props.selectedroute]);

	const [data, setdata] = useState({
		name: {
			elementType: "input",
			elementConfig: {
				type: "text",
				placeholder: "NAME"
			},
			value: "",
			validation: {
				required: true
			},
			valid: false,
			touched: false
		},
		street: {
			elementType: "input",
			elementConfig: {
				type: "text",
				placeholder: "Street"
			},
			value: "",
			validation: {
				required: true
			},
			valid: false,
			touched: false
		},
		zipCode: {
			elementType: "input",
			elementConfig: {
				type: "text",
				placeholder: "ZIP Code"
			},
			value: "",
			validation: {
				required: true,
				minLength: 5,
				maxLength: 5,
				isNumeric: true
			},
			valid: false,
			touched: false
		},
		country: {
			elementType: "input",
			elementConfig: {
				type: "text",
				placeholder: "COUNTRY"
			},
			value: "",
			validation: {
				required: true
			},
			valid: false,
			touched: false
		},
		email: {
			elementType: "input",
			elementConfig: {
				type: "email",
				placeholder: " E-MAIL"
			},
			value: "",
			validation: {
				required: true,
				isEmail: true
			},
			valid: false,
			touched: false
		},
		phone: {
			elementType: "input",
			elementConfig: {
				type: "text",
				placeholder: "PHONE"
			},
			value: "",
			validation: {
				required: true,
				minLength: 10,
				maxLength: 10,
				isNumeric: true
			},
			valid: false,
			touched: false
		}
	});
	const [loading, setloading] = useState(false);
	const [formvalid, setvalid] = useState(false);
	const purchasehandler = (event) => {
		event.preventDefault();
		const formdata = {};
		for (let i in data) {
			formdata[i] = data[i].value;
		}
		const orderinfo = {
			route: props.selectedroute,
			departure: props.departure,
			arrival: props.arrival,
			customerdata: formdata
		};
		setloading(true);
		axios
			.post(
				"https://niras-a363e-default-rtdb.firebaseio.com/order.json",
				orderinfo
			)
			.then((res) => {
				setloading(false);
				history.replace("/ordercomplete");
			});
		axios.post(
			`https://niras-a363e-default-rtdb.firebaseio.com/customerorderhistory/${props.userid}.json`,
			orderinfo
		);
	};
	const isArray = [];
	for (let key in data) {
		isArray.push({
			id: key,
			config: data[key]
		});
	}
	const inputchangehandler = (event, type) => {
		const updateformelemnt = updateObject(data[type], {
			value: event.target.value,
			valid: checkValidity(event.target.value, data[type].validation),
			touched: true
		});

		const updateform = updateObject(data, { [type]: updateformelemnt });

		setdata(updateform);

		let formisvalid = true;
		for (let i in updateform) {
			formisvalid = updateform[i].valid && formisvalid;
		}

		setvalid(formisvalid);
	};

	let form = (
		<Auxi>
			<h1>{props.departure}</h1>
			{props.selectedroute ? (
				<Auxi>
					<h1> {selectedroute}</h1>
				</Auxi>
			) : null}
			<form onSubmit={purchasehandler}>
				{isArray.map((i) => {
					return (
						<Input
							key={i.id}
							elementType={i.config.elementType}
							elementConfig={i.config.elementConfig}
							value={i.config.value}
							invalid={!i.config.valid}
							shouldValidate={i.config.validation}
							touched={i.config.touched}
							changed={(event) => inputchangehandler(event, i.id)}
						/>
					);
				})}
				<Button disabled={!formvalid} addclass={"order"} text={"ORDER"}>
					order
				</Button>
			</form>
		</Auxi>
	);
	return <div>{loading ? <Spinner /> : form}</div>;
};
const matchstate = (state) => {
	return {
		departure: state.search.departure,
		selectedroute: state.search.selectedroute,
		arrival: state.search.arrival,
		userid: state.logininfo.userid
	};
};
export default connect(matchstate)(A);

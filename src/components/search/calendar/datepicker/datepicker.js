import React from "react";
import { connect } from "react-redux";
import * as action from "../../../../store/action/index";
import classes from "./datepicker.module.css";
const Calendar = (props) => {
	const dayarray = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
	const dayinmonth = (month, year) => {
		return new Date(year, month, 0).getDate();
	};
	console.log("run");
	const now = new Date();
	const firstdayofmonth = new Date(props.year, props.month - 1, 1).getDay() + 1; //1;sunday
	let restrow = {};
	const datearray = [];
	let date = 1;
	for (let row = 1; row < 8; row++) {
		let dayinrow = [];
		let week = row - 1;

		if (row !== 1) {
			restrow[row] = {};
			for (let day = 1; day < 8; day++) {
				if (week === 1 && day < firstdayofmonth) {
					dayinrow.push(" ");
				} else if (date > dayinmonth(props.month, props.year && row === 6)) {
					dayinrow.push(" ");
					console.log(dayinrow);
					break;
				} else {
					dayinrow.push(date);
					date++;
				}
			}
		}
		restrow[row] = dayinrow;
	}

	for (let i in restrow) {
		datearray.push(restrow[i]);
	}
	const selecteddate = (value) => {
		const now = new Date(props.year, props.month - 1, value);
		const date = now.getDate();
		const month = now.getMonth() + 1;
		const year = now.getFullYear();
		const finaldate = { date: date, month: month, year: year };
		console.log(value, "val");
		console.log(now);
		props.addselecteddate(finaldate);
	};

	const removeselecteddate = (value) => {
		const now = new Date(props.year, props.month - 1, value);
		const date = now.getDate();
		const month = now.getMonth() + 1;
		const year = now.getFullYear();
		const finaldate = { date: date, month: month, year: year };

		props.removeselecteddate(finaldate);
	};
	console.log(props.selecteddate);
	console.log(props.from, "from");
	console.log(props.to, "to");
	const selecteddateinmonth = props.selecteddate.filter((i) => {
		return i.month === props.month && i.year === props.year;
	});
	const lastarray = selecteddateinmonth.map((i) => i.date);
	const getdate = (date) => new Date(props.year, props.month - 1, date);
	return (
		<table>
			<thead>
				<tr>
					{dayarray.map((i) => (
						<th key={i}>{i}</th>
					))}
				</tr>
			</thead>
			<tbody>
				{props.selecteddate.length === 0
					? datearray.map((i, index) =>
							index > 0 ? (
								<tr key={index}>
									{i.map((a, index) => {
										//index = no.ofday

										if (a > 28) {
											console.log(i);
											console.log(a);
										}
										return a === " " ? ( //emptyday
											<td key={index}></td> //isempty
										) : new Date(props.year, props.month - 1, a) < now ? ( //is notempty previous day?
											<td key={index} className={classes.Yesterday}>
												{a}
											</td>
										) : (
											//haveselectedday? isnotiempty&isnotprevious
											//havnt selected isnotiempty&isnotprevious
											<td
												id={a}
												key={index}
												onClick={() => selecteddate(a)}
												className={classes.Realdate}
											>
												{a}
											</td>
										);
									})}
								</tr>
							) : null
					  )
					: //start point

					  datearray.map((i, index) =>
							index > 0 ? (
								<tr key={index}>
									{i.map((a, index) => {
										//index = no.ofday
										return a === " " ? ( //emptyday
											<td key={index}>{a}</td> //isempty
										) : new Date(props.year, props.month - 1, a) < now ? ( //is notempty previous day?
											<td key={index} className={classes.Yesterday}>
												{a}
											</td>
										) : lastarray.includes(a) ? (
											//haveselectedday? isnotiempty&isnotprevious
											//havnt selected isnotiempty&isnotprevious
											a === props.from.date &&
											props.month === props.from.month &&
											props.year === props.from.year ? (
												<td
													id={a}
													key={index}
													onClick={() => removeselecteddate(a)}
													className={[classes.Selecteddate, classes.From].join(
														" "
													)}
												>
													{a}
												</td>
											) : (
												<td
													id={a}
													key={index}
													onClick={() => removeselecteddate(a)}
													className={[classes.Selecteddate, classes.To].join(
														" "
													)}
												>
													{a}
												</td>
											)
										) : getdate(a) >
												new Date(
													props.from.year,
													props.from.month - 1,
													props.from.date
												) &&
										  getdate(a) <
												new Date(
													props.to.year,
													props.to.month - 1,
													props.to.date
												) &&
										  a !== " " ? (
											<td
												id={a}
												key={index}
												onClick={() => selecteddate(a)}
												className={classes.Rangedate}
											>
												{/* <div className={classes.Rangedate}>{a}</div> */}
												{a}
											</td>
										) : (
											<td
												id={a}
												key={index}
												onClick={() => selecteddate(a)}
												className={classes.Realdate}
											>
												{a}
											</td>
										);
									})}
								</tr>
							) : null
					  )}
			</tbody>
		</table>

		//haveselected isnotiempty&isnotprevious
		// props.selecteddate.map((obj, index) => {
		// 	return obj.month === props.month &&
		// 		obj.year === props.year &&
		// 		obj.date === a ? (
		// 		//console.log(document.getElementById(a).className)
		// 		(document.getElementById(a).className = "ABC")
		// 	) : // parentNode.replaceChild(
		// 	// 	// <td
		// 	// 	// 	key={index}
		// 	// 	// 	onClick={() => {
		// 	// 	// 		selecteddate(a);
		// 	// 	// 	}}
		// 	// 	// 	className={classes.Selecteddate}
		// 	// 	// >
		// 	// 	// 	{a}
		// 	// 	// </td>,
		// 	// 	document.createElement("td"),
		// 	// 	document.getElementById(a)
		// 	// )
		// 	index === 0 ? (
		// 		<td // haveselected notisselected
		// 			key={index}
		// 			onClick={() => {
		// 				selecteddate(a);
		// 			}}
		// 			className={classes.Realdate}
		// 		>
		// 			{console.log("run")}
		// 			{a}
		// 		</td>
		// 	) : null;
		// })
	);
};
const matchstate = (state) => {
	return {
		selecteddate: state.search.selecteddate,
		from: state.search.from,
		to: state.search.to
	};
};
const matchdispatch = (dispatch) => {
	return {
		addselecteddate: (date) => dispatch(action.addselecteddate(date)),
		removeselecteddate: (date) => dispatch(action.removeselecteddate(date))
	};
};

export default connect(matchstate, matchdispatch)(Calendar);

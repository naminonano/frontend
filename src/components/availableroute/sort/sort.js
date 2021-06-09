import React from "react";
import { connect } from "react-redux";
import * as action from "../../../store/action";
const SORT = (props) => {
	const touch = (event) => {
		props.changesort(event.target.value);
	};
	const sort = (
		<div>
			<label htmlFor="sort">SORT </label>
			<select id="Sort" onChange={(event) => touch(event)}>
				<option value="recommended">RECOMMENDED</option>
				<option value="lowerprice">LOWER PRICE FIRST</option>

				<option value="higherprice">HIGHER PRICE FIRST</option>
				<option value="time">TIME</option>
			</select>
		</div>
	);

	return <div>{sort}</div>;
};
const matchdispatch = (dispatch) => {
	return {
		changesort: (sort) => dispatch(action.changesort(sort))
	};
};
export default connect(null, matchdispatch)(SORT);

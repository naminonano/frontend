import React, { useEffect, useState } from "react";
import axios from "axios";
import classes from "../components/search/search.module.css";

import Departuresearchbox from "../components/search/searchbox/departuresearchbox";
import Searchbutton from "../components/search/searchbutton";
import Auxi from "../HOC/Auxi";
import * as action from "../store/action";
import Spinner from "../UI/spinner/spinner";
import { connect } from "react-redux";
import Date from "../components/search/date/date";
import Calendar from "../components/search/calendar/calendar";
import Departurefilter from "../components/search/searchbox/filterdeparture";
import Arrivalfilter from "../components/search/searchbox/filterarrival";
import Timeselector from "../components/search/timeselector/timeselector";
import Listbox from "../components/itinerary/listbox";

const Search = (props) => {
	const [content, setcontent] = useState();
	const [searchloading, setsearchloading] = useState(false);

	const { fetchavialablecity } = props;
	const search = () => {
		setsearchloading(true);
		// const q = {
		// 	query: `
		// 	 query Getsim($email: String!) {
		// 		getsim(email:$email) {
		// 			name finaltype totalreview rating
		// 		}
		// 	 }
		// 	`,
		// 	variables: {
		// 		email: 'najullawat@gmail.com',
				
		// 	}
		// };
		const q={
			query: `
			
				
				query Getsim($email:String!){
				getsim(email:$email){
					name finaltype totalreview rating
				}
			}
				
			
			`
			,
			variables: {
				email: 'najullawat@gmail.com',
			}}

	

		axios.post("http://localhost:8000/graphql", q).then((response) => {
			console.log(response.data.data)
			props.settopsim(response.data.data.getsim);
			setcontent(response.data.data.getsim);
			setsearchloading(false);
		}).catch(e=>console.log(e))

		// .then((res) => props.setsearchnotloading());
	};

	useEffect(() => {
		fetchavialablecity();
	}, [fetchavialablecity]);
	let selected = [];
	if (props.selectedattractions.length > 0) {
		selected = props.selectedattractions;
	}
	return (
		<Auxi>
			{!props.loading ? (
				<Auxi>
					<div className={classes.Box}>
						<div className={classes.Searchcontent}>
							<Departuresearchbox />

							<Date />
						</div>

						<Searchbutton click={search} />
					</div>
				</Auxi>
			) : (
				<Spinner />
			)}
			<div>
				{props.departure ? <Departurefilter val={props.departure} /> : null}

				{props.arrival ? <Arrivalfilter val={props.arrival} /> : null}
				{props.showcalendar ? <Calendar /> : null}
			</div>
			{searchloading ? (
				<Spinner />
			) : content ? (
				<Listbox list={content} selected={selected} />
			) : null}
		</Auxi>
	);
};
const matchstate = (state) => {
	return {
		departure: state.search.departure,
		arrival: state.search.arrival,
		loading: state.search.loading,
		showcalendar: state.search.showcalendar,
		searchloading: state.search.searchloading,
		selectedattractions: state.itinerary.selected
	};
};
const matchdispatch = (dispatch) => {
	return {
		settopsim: (s) => dispatch(action.settopsim(s)),
		swapsearch: () => dispatch(action.swapdeparturearrival()),
		fetchavialablecity: () => dispatch(action.fetchavialablecity()),
		calendarclick: () => dispatch(action.calendarclick())
	};
};

export default connect(matchstate, matchdispatch)(Search);

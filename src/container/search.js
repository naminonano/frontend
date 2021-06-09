import React, { useEffect, useState } from "react";
import axios from "axios";
import classes from "../components/search/search.module.css";

import Departuresearchbox from "../components/search/searchbox/departuresearchbox";
import Arrivalsearchbox from "../components/search/searchbox/arrivalsearchbox";
import Searchbutton from "../components/search/searchbutton";
import Availableroute from "../components/availableroute/availableroute";
import Auxi from "../HOC/Auxi";
import * as action from "../store/action";
import Spinner from "../UI/spinner/spinner";
import { connect } from "react-redux";
import Date from "../components/search/date/date";
import Calendar from "../components/search/calendar/calendar";
import Departurefilter from "../components/search/searchbox/filterdeparture";
import Arrivalfilter from "../components/search/searchbox/filterarrival";
import Listbox from "../components/itinerary/listbox";
const Search = (props) => {
	const [content, setcontent] = useState();
	const [searchloading, setsearchloading] = useState();
	const { fetchavialablecity } = props;
	const search = () => {
		setsearchloading(true);

		const q = {
			query: `
			{
				getsim(name:"nano",len:15) {
					name finaltype totalreview website rating
				}
			}
			`
		};

		axios.post("http://localhost:8000/graphql", q).then((response) => {
			props.settopsim(response.data.data.getsim);
			setcontent(response.data.data.getsim);
			// props.updateroute(response.data);
			setsearchloading(false);
		});

		// .then((res) => props.setsearchnotloading());
	};

	useEffect(() => {
		fetchavialablecity();
	}, [fetchavialablecity]);
	let selected = "selected attraction you want to visit";
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
				{/* {props.showcalendar ? <Datepicker /> : null} */}
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

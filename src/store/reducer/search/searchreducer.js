import * as actiontype from "../../action/actiontypes";
import { updateObject } from "../../../shared/utility/utility";

const initstate = {
	departure: "",
	arrival: "",
	date: "",
	availableroute: [],
	selectedroute: "",
	sortby: "recommended",
	loading: false,
	searchloading: false,
	availablecity: null,
	searched: false,
	showdeparturefilter: true,
	showarrivalfilter: true,
	showcalendar: false,
	selecteddate: [],
	from: "",
	to: ""
};
const updatesearchedhandler = (state) => {
	return updateObject(state, {
		searched: true,
		showarrivalfilter: false,
		showdeparturefilter: false,
		showcalendar: false,
		loading: true
	});
};
const setsearchnotloainghandler = (state) => {
	return updateObject(state, { loading: false });
};
const changesorthandler = (state, action) => {
	return updateObject(state, { sortby: action.sort });
};
const updateroutehandler = (state, action) => {
	return updateObject(state, { availableroute: action.route });
};
const changedeparturehandler = (state, action) => {
	if (action.click) {
		return updateObject(state, {
			departure: action.changes,
			showdeparturefilter: false
		});
	} else {
		return updateObject(state, {
			departure: action.changes,
			showdeparturefilter: true
		});
	}
};
const changearrivalhandler = (state, action) => {
	if (action.click) {
		return updateObject(state, {
			arrival: action.changes,
			showarrivalfilter: false
		});
	} else {
		return updateObject(state, {
			arrival: action.changes,
			showarrivalfilter: true
		});
	}
};
const swapdeparturearrivalhandler = (state, action) => {
	return updateObject(state, {
		arrival: state.departure,
		departure: state.arrival
	});
};
const updateselectedroutehandler = (state, action) => {
	return updateObject(state, {
		selectedroute: action.route
	});
};

const fetchavialablecitystarthandler = (state) => {
	return updateObject(state, { loading: true });
};
const fetchavialablecityfinishhandler = (state) => {
	return updateObject(state, { loading: false });
};
const fetchavialablecityupdateinfohandler = (state, action) => {
	return updateObject(state, { availablecity: action.info });
};
const resetstatehandler = (state) => {
	return updateObject(state, {
		departure: "",
		arrival: "",
		date: "",
		availableroute: [],
		selectedroute: "",
		sortby: "recommended",
		loading: false,
		searched: false,
		showdeparturefilter: true,
		showarrivalfilter: true,
		showcalendar: false
	});
};
const departureclickhandler = (state) => {
	return updateObject(state, {
		showdeparturefilter: true,
		showcalendar: false,
		showarrivalfilter: false
	});
};
const arrivalclickhandler = (state) => {
	return updateObject(state, {
		showdeparturefilter: false,
		showcalendar: false,
		showarrivalfilter: true
	});
};
const calendarclickhandler = (state) => {
	return updateObject(state, {
		showdeparturefilter: false,
		showcalendar: !state.showcalendar,
		showarrivalfilter: false
	});
};
const addselecteddate = (state, action) => {
	const dates = action.date;
	const updatearray = [...state.selecteddate];
	// const updatestate = { ...state };
	updatearray.push(dates);
	if (updatearray.length === 1) {
		return updateObject(state, { selecteddate: updatearray, from: dates });
	}
	if (updatearray.length === 3) {
		const firstdate = new Date(
			state.from.year,
			state.from.month,
			state.from.date
		);
		let from = null;
		let to = null;
		const seconddate = new Date(
			updatearray[2].year,
			updatearray[2].month,
			updatearray[2].date
		);
		if (firstdate > seconddate) {
			from = updatearray[2];
			to = "";
			updatearray.splice(0, 2);
		} else {
			to = updatearray[2];
			from = state.from;
			updatearray.splice(1, 1);
		}
		return updateObject(state, {
			selecteddate: updatearray,
			from: from,
			to: to
		});
	}

	if (updatearray.length === 2) {
		const firstdate = new Date(
			state.from.year,
			state.from.month,
			state.from.date
		);
		let from = null;
		let to = null;
		const seconddate = new Date(
			updatearray[1].year,
			updatearray[1].month,
			updatearray[1].date
		);
		if (firstdate > seconddate) {
			from = updatearray[1];
			to = state.from;
		} else {
			to = updatearray[1];
			from = state.from;
		}
		return updateObject(state, {
			selecteddate: updatearray,
			from: from,
			to: to
		});
	}
};
const removerselecteddate = (state, action) => {
	const dates = action.date;
	const index = state.selecteddate.indexOf(dates);
	const updatearray = [...state.selecteddate];
	updatearray.splice(index, 1);
	return updateObject(state, { selecteddate: updatearray });
};
const reducer = (state = initstate, action) => {
	switch (action.type) {
		case actiontype.SETSEARCHED:
			return updatesearchedhandler(state);
		case actiontype.SETSEARCHNOTLOADING:
			return setsearchnotloainghandler(state);
		case actiontype.FETCHAVIALABLECITYSTART:
			return fetchavialablecitystarthandler(state);
		case actiontype.FETCHAVIALABLECITYFINISH:
			return fetchavialablecityfinishhandler(state);
		case actiontype.FETCHAVIALABLECITYUPDATEINFO:
			return fetchavialablecityupdateinfohandler(state, action);
		case actiontype.CHANGEDEPARTURE:
			return changedeparturehandler(state, action);
		case actiontype.CHANGEARRIVAL:
			return changearrivalhandler(state, action);
		case actiontype.UPDATEROUTE:
			return updateroutehandler(state, action);
		case actiontype.UPDATESELECTEDROUTE:
			return updateselectedroutehandler(state, action);
		case actiontype.SWAPDEPARTUREARRIVAL:
			return swapdeparturearrivalhandler(state, action);
		case actiontype.CHANGESORT:
			return changesorthandler(state, action);
		case actiontype.RESETSTATE:
			return resetstatehandler(state);
		case actiontype.SHOWCALENDAR:
			return calendarclickhandler(state);
		case actiontype.SHOWDEPARTUREFILTER:
			return departureclickhandler(state);
		case actiontype.SHOWARRIVALFILTER:
			return arrivalclickhandler(state);
		case actiontype.ADDSELECTEDDATE:
			return addselecteddate(state, action);
		case actiontype.REMOVESELECTEDDATE:
			return removerselecteddate(state, action);
		default:
			return state;
	}
};
export default reducer;

import * as action from "./actiontypes";
export const changedeparture = (changes, click) => {
	return { type: action.CHANGEDEPARTURE, changes: changes, click: click };
};
export const changearrival = (changes, click) => {
	return { type: action.CHANGEARRIVAL, changes: changes, click: click };
};
export const changesort = (sort) => {
	return { type: action.CHANGESORT, sort: sort };
};

export const updateroute = (route) => {
	return { type: action.UPDATEROUTE, route: route };
};
export const updateselectedroute = (route) => {
	return { type: action.UPDATESELECTEDROUTE, route: route };
};
export const swapdeparturearrival = () => {
	return { type: action.SWAPDEPARTUREARRIVAL };
};

export const fetchavialablecitystart = () => {
	return { type: action.FETCHAVIALABLECITYSTART };
};
export const fetchavialablecity = () => {
	return { type: action.FETCHAVIALABLECITY };
};
export const fetchavialablecityupdateinfo = (info) => {
	return { type: action.FETCHAVIALABLECITYUPDATEINFO, info: info };
};
export const fetchavialablecityfinish = () => {
	return { type: action.FETCHAVIALABLECITYFINISH };
};
export const startload = () => {
	return { type: action.SETSEARCHED };
};
export const stopload = () => {
	return { type: action.SETSEARCHNOTLOADING };
};

export const resetstate = () => {
	return { type: action.RESETSTATE };
};
export const departureclick = () => {
	return { type: action.SHOWDEPARTUREFILTER };
};
export const arrivalclick = () => {
	return { type: action.SHOWARRIVALFILTER };
};
export const calendarclick = () => {
	return { type: action.SHOWCALENDAR };
};

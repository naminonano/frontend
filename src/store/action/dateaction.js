import * as action from "./actiontypes";
export const addselecteddate = (date) => {
	return { type: action.ADDSELECTEDDATE, date: date };
};
export const removeselecteddate = (date) => {
	return { type: action.REMOVESELECTEDDATE, date: date };
};

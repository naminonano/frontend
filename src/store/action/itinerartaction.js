import * as actiontype from "./actiontypes";
export const addselected = (name) => {
	return { type: actiontype.ADDSELECTED, name: name };
};

export const removeselected = (name) => {
	return { type: actiontype.REMOVESELECTED, name: name };
};
export const updateplan = (plan, clear) => {
	return { type: actiontype.UPDATEPLAN, plan: plan, clear: clear };
};
export const settopsim = (top) => {
	return { type: actiontype.SETTOPSIM, top: top };
};

import * as actiontype from "../../action/actiontypes";
import { updateObject } from "../../../shared/utility/utility";

const initstate = {
	selected: [],
	plan: [],
	top: []
};

const addselected = (state, action) => {
	let updatearray = [...state.selected];
	updatearray.push(action.name);
	return updateObject(state, { selected: updatearray });
};
const removeselected = (state, action) => {
	let updatearray = [...state.selected];
	updatearray = updatearray.filter((i) => i !== action.name);
	return updateObject(state, { selected: updatearray });
};
const updateplan = (state, action) => {
	if (action.clear) {
		return updateObject(state, { plan: [], selected: [] });
	}
	return updateObject(state, { plan: action.plan });
};
const settopsim = (state, action) => {
	return updateObject(state, { top: action.top });
};
const reducer = (state = initstate, action) => {
	switch (action.type) {
		case actiontype.ADDSELECTED:
			return addselected(state, action);
		case actiontype.REMOVESELECTED:
			return removeselected(state, action);
		case actiontype.UPDATEPLAN:
			return updateplan(state, action);
		case actiontype.SETTOPSIM:
			return settopsim(state, action);

		default:
			return state;
	}
};
export default reducer;

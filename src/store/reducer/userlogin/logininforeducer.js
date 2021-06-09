import * as actiontype from "../../action/actiontypes";
import { updateObject } from "../../../shared/utility/utility";
const initstate = {
	login: true,
	userid: 1,
	loading: false,
	myorder: null,
	authmode: "login",
	logintouch: false
};
const fetchorderstarthandler = (state) => {
	return updateObject(state, { loading: true });
};
const fetchorderfinishhandler = (state) => {
	return updateObject(state, { loading: false });
};
const fetchorderupdateinfohandler = (state, action) => {
	return updateObject(state, { myorder: action.info });
};
const selectauthhandler = (state, action) => {
	return updateObject(state, { authmode: action.authmode });
};
const setlogintouchhandler = (state, action) => {
	let updateauthmode = state.authmode;
	if (!action.trueorfalse) {
		updateauthmode = "login";
	}
	return updateObject(state, {
		logintouch: action.trueorfalse,
		authmode: updateauthmode
	});
};
const userloginreducer = (state = initstate, action) => {
	switch (action.type) {
		case actiontype.FETCHMYORDERSTART:
			return fetchorderstarthandler(state);
		case actiontype.FETCHMYORDERFINISH:
			return fetchorderfinishhandler(state);
		case actiontype.FETCHMYORDERUPDATEINFO:
			return fetchorderupdateinfohandler(state, action);
		case actiontype.SELECTAUTH:
			return selectauthhandler(state, action);
		case actiontype.SETLOGINTOUCH:
			return setlogintouchhandler(state, action);
		default:
			return state;
	}
};
export default userloginreducer;

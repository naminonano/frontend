import * as actiontype from "./actiontypes";

export const fetchmyorderstart = () => {
	return { type: actiontype.FETCHMYORDERSTART };
};
export const fetchmyorder = (userid) => {
	return { type: actiontype.FETCHMYORDER, userid: userid };
};
export const fetchmyorderupdateinfo = (info) => {
	return { type: actiontype.FETCHMYORDERUPDATEINFO, info: info };
};
export const fetchmyorderfinish = () => {
	return { type: actiontype.FETCHMYORDERFINISH };
};
export const selectauth = (authmode) => {
	return { type: actiontype.SELECTAUTH, authmode: authmode };
};
export const setlogintouch = (trueorfalse) => {
	return { type: actiontype.SETLOGINTOUCH, trueorfalse: trueorfalse };
};

export const updatefav=fav=>{
	return{type:"UPDATEFAV",favorite:fav}}
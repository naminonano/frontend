import * as actions from "../action";
import axios from "axios";
import { put } from "redux-saga/effects";
import { interceptor } from "../../shared/interceptor";

export function* fetchmyordersaga(action) {
	yield put(actions.fetchmyorderstart());

	try {
		const response = yield axios.get(
			`https://niras-a363e-default-rtdb.firebaseio.com/customerorderhistory/${action.userid}.json`
		);
		const myorderarray = [];
		let myorderobject = {};
		for (let i in response.data) {
			myorderobject = {
				...myorderobject,
				orderid: i,
				departure: response.data[i].departure,
				arrival: response.data[i].arrival,
				routeid: response.data[i].route["id"],
				price: response.data[i].route["price"],
				time: response.data[i].route["time"]
			};
			myorderarray.push(myorderobject);
			yield put(actions.fetchmyorderupdateinfo(myorderarray));
		}
	} catch (error) {
		console.log(error);
	}

	yield put(actions.fetchmyorderfinish());
}

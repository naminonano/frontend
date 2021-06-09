import * as actions from "../action";
import axios from "axios";
import { put } from "redux-saga/effects";

export function* fetchavialablecitysaga() {
	yield put(actions.fetchavialablecitystart());

	try {
		const response = yield axios.get(
			"https://niras-a363e-default-rtdb.firebaseio.com/availablestation.json"
		);
		const availablecityarray = [];
		for (let i in response.data) {
			// (availablestation.push({ [i]: response.data[i] });)
			availablecityarray.push(i);

			yield put(actions.fetchavialablecityupdateinfo(availablecityarray));
		}
	} catch (error) {
		console.log(error);
	}

	yield put(actions.fetchavialablecityfinish());
}
// const departurevalue = (state) => state.search.departure;
// // const shows = (state) => state.search.showdeparturefilter;
// export function* updatedeparturefiltersaga(action) {
// 	// const oldvalue = yield select(departurevalue);
// 	yield put(actions.changedeparture(action.value));

// 	// if (action.value !== oldvalue) {
// 	yield put(actions.updateshowdeparturefiltertotrue());
// 	// }

// 	if (action.click === "click") {
// 		yield put(actions.updateshowdeparturefiltertofalse());
// 	}
// 	// const show = yield select(shows);

// 	// yield put(actions.updateshowdeparturefiltertofalse);

// 	// {
// 	// 	yield put(actions.updateshowdeparturefiltertotrue());
// 	// }
// }

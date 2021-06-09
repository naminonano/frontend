import * as actiontype from "../action/actiontypes";
import { takeEvery } from "redux-saga/effects";
import { fetchmyordersaga } from "./logininfosaga";
import { fetchavialablecitysaga } from "./searchsaga";
export function* watchlogin() {
	yield takeEvery(actiontype.FETCHMYORDER, fetchmyordersaga);
}

export function* watchsearchbox() {
	yield takeEvery(actiontype.FETCHAVIALABLECITY, fetchavialablecitysaga);
	// yield takeEvery(actiontype.UPDATEDEPARTUREFILTER, updatedeparturefiltersaga);
}

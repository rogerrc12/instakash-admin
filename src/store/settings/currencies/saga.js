import { put, all, takeEvery, fork } from "redux-saga/effects";
import * as actionTypes from "./actionTypes";
import * as actions from "./actions";
import { clientInstance as axios } from "../../../helpers/AuthType/axios";

function* getCurrencies() {
  try {
    const res = yield axios.get("/Moneda/ObtenerMonedas");
    if (res.status === 200) yield put(actions.getCurrenciesSuccess(res.data));
  } catch (error) {
    yield put(actions.apiError(error.message));
  }
}

export function* watchGetCurrencies() {
  yield takeEvery(actionTypes.GET_CURRENCIES, getCurrencies);
}

export default function* () {
  yield all([fork(watchGetCurrencies)]);
}

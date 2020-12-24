import { fork, all, put, takeEvery, call, delay } from "redux-saga/effects";
import * as actionTypes from "./actionTypes";
import * as actions from "./actions";
import { clientInstance as axios } from "../../../helpers/AuthType/axios";

function* addCurrencyPrice({ payload }) {
  const { values, update } = payload;

  const currencyValues = {
    totalBuy: +`${values.toBuy1}.${values.toBuy2}${values.toBuy3}${values.toBuy4}`,
    totalSale: +`${values.toSell1}.${values.toSell2}${values.toSell3}${values.toSell4}`,
    idCurrencyType: 2,
  };

  try {
    const res = yield axios.post("/HistorialMoneda/NuevoHistorial", currencyValues);
    if (res.status === 200) {
      yield call(update);
      yield put(actions.addCurrencyPriceSuccess("Precio actualizado correctamente!"));
    }
  } catch (error) {
    yield put(actions.apiError(error.message));
  } finally {
    yield delay(4000);
    yield put(actions.clearAlert());
  }
}

export function* watchAddCurrencyPrice() {
  yield takeEvery(actionTypes.ADD_CURRENCY_PRICE_INIT, addCurrencyPrice);
}

export default function* () {
  yield all([fork(watchAddCurrencyPrice)]);
}

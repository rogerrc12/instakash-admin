import { all, put, fork, takeEvery, delay, call } from "redux-saga/effects";
import * as actionTypes from "./actionTypes";
import * as actions from "./actions";
import { clientInstance as axios } from "../../../helpers/AuthType/axios";

function* getLimits() {
  try {
    const res = yield axios.get("/Limite/ObtenerLimites");
    yield put(actions.getLimitsSuccess(res.data));
  } catch (error) {
    yield put(actions.apiError(error.message));
  }
}

function* editLimits({ payload }) {
  const { values, limitsData, reset } = payload;
  const newLimits = {
    idLimitCurrency: limitsData.idLimit,
    limit: values.transactionLimit ? +values.transactionLimit : 0,
    limitForUser: values.limitPerDay ? +values.limitPerDay : 0,
    minimumAmount: values.transactionMinimum ? +values.transactionMinimum : 0,
  };

  try {
    const res = yield axios.post("/Limite/EditarLimite", newLimits);

    if (res.status === 200) {
      yield put(actions.editLimitsSuccess("Limites actualizados correctamente"));
      yield put(actions.getLimits());
      yield call(reset, null);
      yield delay(4000);
      yield put(actions.clearSuccessLimitsAlert());
    }
  } catch (error) {
    yield put(actions.apiError(error.message));
    yield put(actions.clearErrorLimitsAlert());
  }
}

export function* watchGetLimits() {
  yield takeEvery(actionTypes.GET_LIMITS, getLimits);
}

export function* watchEditLimits() {
  yield takeEvery(actionTypes.EDIT_LIMITS, editLimits);
}

export default function* () {
  yield all([fork(watchGetLimits), fork(watchEditLimits)]);
}

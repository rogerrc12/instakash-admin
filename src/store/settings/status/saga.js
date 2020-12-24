import { put, all, takeEvery, fork, delay, call } from "redux-saga/effects";
import * as actionTypes from "./actionTypes";
import * as actions from "./actions";
import { clientInstance as axios } from "../../../helpers/AuthType/axios";

function* getStatus() {
  try {
    const res = yield axios.get("/Estado/ObtenerEstados");
    if (res.status === 200) yield put(actions.getStatusSuccess(res.data));
  } catch (error) {
    yield put(actions.apiError(error.message));
  }
}

function* editStatus({ payload }) {
  const { values, id, reset } = payload;

  const newValues = {
    ...values,
    idTransactionState: id,
  };

  try {
    const res = yield axios.post("/Estado/EditarEstado", newValues);
    if (res.status === 200) {
      yield put(actions.editStatusSuccess("Estado actualizado correctamente!"));
      yield put(actions.getStatus());
      yield call(reset, null);
    }
  } catch (error) {
    yield put(actions.apiError(error.message));
  } finally {
    yield delay(4000);
    yield put(actions.clearAlert());
  }
}

export function* watchEditStatus() {
  yield takeEvery(actionTypes.EDIT_STATUS, editStatus);
}

export function* watchGetStatus() {
  yield takeEvery(actionTypes.GET_STATUS, getStatus);
}

export default function* () {
  yield all([fork(watchGetStatus), fork(watchEditStatus)]);
}

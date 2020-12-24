import { put, takeEvery, all, fork } from "redux-saga/effects";
import * as actions from "./actions";
import * as actionTypes from "./actionTypes";
import { clientInstance as axios } from "../../../helpers/AuthType/axios";

function* getNotifications() {
  try {
    const res = yield axios.get("/Notificacion/ObtenerNotificaciones");
    if (res.status === 200) yield put(actions.getNotificationsSuccess(res.data));
  } catch (error) {
    yield put(actions.apiError(error.message));
  }
}

export function* watchGetNotifications() {
  yield takeEvery(actionTypes.GET_NOTIFICATIONS, getNotifications);
}

export default function* () {
  yield all([fork(watchGetNotifications)]);
}

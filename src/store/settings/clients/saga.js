import { put, all, fork, takeEvery, delay } from "redux-saga/effects";
import * as actionTypes from "./actionTypes";
import * as actions from "./actions";
import { clientInstance as axios } from "../../../helpers/AuthType/axios";

function* getClientDetails({ payload }) {
  const { id } = payload;

  try {
    const res = yield axios.get(`/Cliente/ObtenerCliente?Id=${id}`);
    if (res.status === 200) yield put(actions.getClientDetailsSuccess(res.data));
  } catch (error) {
    yield put(actions.apiError(error.message));
  }
}

function* getClientActivity({ payload }) {
  const { id } = payload;

  try {
    const res = yield axios.get(`/Cliente/ObtenerTransacciones?IdUsuario=${id}`);
    if (res.status === 200) yield put(actions.getClientActivitySuccess(res.data));
  } catch (error) {
    yield put(actions.apiError(error.message));
  }
}

function* updateClient({ payload }) {
  const { values, id } = payload;

  const newValues = {
    ...values,
    dateBirth: values.dateBirth || null,
    id: +id,
    isDisabled: values.isDisabled === "true" ? true : false,
  };

  console.log(newValues);

  try {
    const res = yield axios.post("/Cliente/EditarCliente", newValues);
    if (res.status === 200) {
      yield put(actions.updateClientSuccess("Usuario actualizado correctamente!"));
      yield put(actions.getClientDetails(+id));
    }
  } catch (error) {
    yield put(actions.apiError(error.message));
  } finally {
    yield delay(4000);
    yield put(actions.clearAlert());
  }
}

export function* watchGetClientActivity() {
  yield takeEvery(actionTypes.GET_CLIENT_ACTIVITY, getClientActivity);
}

export function* watchGetClientDetails() {
  yield takeEvery(actionTypes.GET_CLIENT_DETAILS, getClientDetails);
}

export function* watchUpdateClient() {
  yield takeEvery(actionTypes.UPDATE_CLIENT, updateClient);
}

export default function* () {
  yield all([fork(watchGetClientDetails), fork(watchUpdateClient), fork(watchGetClientActivity)]);
}

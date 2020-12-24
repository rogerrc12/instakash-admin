import { fork, all, put, delay, select, takeEvery } from "redux-saga/effects";
import { clientInstance as clientAxios } from "../../../helpers/AuthType/axios";

import * as actions from "./actions";
import * as actionTypes from "./actionTypes";

function* getSettings() {
  try {
    const res = yield clientAxios.get("Ajustes/ObtenerAjustes");
    if (res.status === 200) yield put(actions.getSettingsSuccess(res.data));
  } catch (error) {
    yield put(actions.apiError(error.message));
  }
}

function* updateSettings({ payload }) {
  const { values } = payload;

  const settings = yield select((state) => state.Settings.settings);

  const newSettings = {
    id: 1,
    showRealStadistic: typeof values.showRealStadistic !== "undefined" ? values.showRealStadistic : settings.showRealStadistic,
    contUsers: values.contUsers || settings.contUsers,
    contOps: values.contOps || settings.contOps,
    contSolesTransfer: values.contSolesTransfer || settings.contSolesTransfer,
    timeToResponse: values.timeToResponse || null,
    minutesToCancelOp: values.minutesToCancelOp || settings.minutesToCancelOp,
    merchantComment: values.merchantComment || null,
  };

  try {
    const res = yield clientAxios.post("/Ajustes/ActualizarAjustes", newSettings);
    if (res.status === 200) yield put(actions.updateSettingsSuccess("Ajustes actualizados correctamente!"));
  } catch (error) {
    yield put(actions.apiError(error.message));
  } finally {
    yield delay(4000);
    yield put(actions.clearMessage());
  }
}

export function* watchGetSettings() {
  yield takeEvery(actionTypes.GET_SETTINGS, getSettings);
}

export function* watchUpdateSettings() {
  yield takeEvery(actionTypes.UPDATE_SETTINGS, updateSettings);
}

export default function* () {
  yield all([fork(watchGetSettings), fork(watchUpdateSettings)]);
}

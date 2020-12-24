import { put, all, fork, takeEvery } from "redux-saga/effects";
import * as actionTypes from "./actionTypes";
import * as actions from "./actions";
import { clientInstance as axios } from "../../../helpers/AuthType/axios";

function* getDocumentTypes() {
  try {
    const res = yield axios.get("/Cliente/ObtenerTipoDocumentos");
    if (res.status === 200) yield put(actions.getDocumentTypesSuccess(res.data));
  } catch (error) {
    yield put(actions.apiError(error.message));
  }
}

export function* watchGetDocumentTypes() {
  yield takeEvery(actionTypes.GET_DOCUMENT_TYPES, getDocumentTypes);
}

export default function* () {
  yield all([fork(watchGetDocumentTypes)]);
}

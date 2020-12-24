import { put, all, fork, call, takeEvery } from "redux-saga/effects";
import * as actionTypes from "./actionTypes";
import * as actions from "./actions";
import { clientInstance as axios } from "../../../helpers/AuthType/axios";
import Swal from "sweetalert2";

function* getAdvanceDetails({ payload }) {
  const { id } = payload;

  try {
    const res = yield axios.get(`/AvanceEfectivo/ObtenerAvanceEfectivo?Id=${id}`);
    if (res.status === 200) yield put(actions.getAdvanceDetailsSuccess(res.data));
  } catch (error) {
    yield put(actions.apiError(error.message));
  }
}

function* approveCashAdvance({ payload }) {
  const { id, status, connection, close, invoice } = payload;

  try {
    const result = yield Swal.fire({
      title: `¿Desea ${status === 7 ? "validar" : "abrobar"} la transacción?`,
      text: "Esta acción no puede ser revertida.",
      icon: "warning",
      confirmButtonText: status === 7 ? "validar" : "abrobar",
      confirmButtonColor: "#5cb85c",
      showCancelButton: true,
      cancelButtonText: "cancelar",
      cancelButtonColor: "#d9534f",
    });

    if (result.isConfirmed) {
      let formData = new FormData();

      formData.append("IdActividad", id);
      formData.append("Factura", invoice);

      const res = yield axios.post(`AvanceEfectivo/AprovarAvanceEfectivo`, formData);

      if (res.status === 200) {
        if (connection.connectionStarted) yield connection.invoke(status === 1 ? "AprobarAE" : "CambioStatusAE");
        yield Swal.fire(`Transacción ${status === 7 ? "validada" : "aprobada"}`, `La transacción fue ${status === 7 ? "validada" : "aprobada"} exitosamente.`, "success");
        yield call(close);
        yield put(actions.approveCashAdvanceSuccess());
      }
    } else yield put(actions.approveCashAdvanceCancel());
  } catch (error) {
    yield put(actions.apiError(error.message));
  }
}

export function* watchGetAdvanceDetails() {
  yield takeEvery(actionTypes.GET_ADVANCE_DETAILS, getAdvanceDetails);
}

export function* watchApproveCashAdvance() {
  yield takeEvery(actionTypes.APPROVE_CASH_ADVANCE, approveCashAdvance);
}

export default function* () {
  yield all([fork(watchGetAdvanceDetails), fork(watchApproveCashAdvance)]);
}

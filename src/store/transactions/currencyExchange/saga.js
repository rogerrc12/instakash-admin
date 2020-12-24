import { all, call, takeEvery, put, fork, delay } from "redux-saga/effects";
import { clientInstance as axios } from "../../../helpers/AuthType/axios";
import * as actions from "./actions";
import * as actionTypes from "./actionTypes";
import Swal from "sweetalert2";

function* getExchangeDetails({ payload }) {
  const { id } = payload;

  try {
    const res = yield axios.get(`CambioDivisa/ObtenerCambioDivisa?Id=${id}`);
    if (res.status === 200) yield put(actions.getExchangeDetailsSuccess(res.data));
  } catch (error) {
    yield put(actions.apiError(error.message));
  } finally {
    yield delay(4000);
    yield put(actions.clearAlert());
  }
}

function* approveExchange({ payload }) {
  const { id, close, closeApprove, connection, details, invoice } = payload;

  const { estado } = details;

  try {
    const result = yield Swal.fire({
      title: `¿Desea ${estado.id === 1 ? "Aprobar" : "validar"} la transacción?`,
      text: "Esta acción no puede ser revertida.",
      icon: "warning",
      confirmButtonText: estado.id === 1 ? "Aprobar" : "Validar",
      confirmButtonColor: "#5cb85c",
      showCancelButton: true,
      cancelButtonText: "cancelar",
      cancelButtonColor: "#d9534f",
    });

    if (result.isConfirmed) {
      let formData = new FormData();

      formData.append("IdActividad", id);
      formData.append("Factura", invoice);

      const res = yield axios.post(`CambioDivisa/AprovarCambioDivisa`, formData);

      if (res.status === 200) {
        if (estado.id === 1) yield put(actions.createInvoice(id, close, details));
        if (connection.connectionStarted) yield connection.invoke(estado.id === 1 ? "AprobarCD" : "CambioStatusCD");
        yield put(actions.getExchangeDetails(id));
        yield call(closeApprove);
        yield Swal.fire(`Transacción ${estado.id === 1 ? "aprobada" : "validada"}`, `La transacción fue ${estado.id === 1 ? "aprobada" : "validada"} exitosamente.`, "success");
        yield put(actions.approveExchangeSuccess());
      }
    } else yield put(actions.approveExchangeCancel());
  } catch (error) {
    yield put(actions.apiError("Ha ocurrido un error validando el cambio de divisa."));
    yield delay(4000);
    yield put(actions.clearAlert());
  }
}

function* declineExchange({ payload }) {
  const { id, message, connection, closeModal } = payload;

  try {
    const formData = new FormData();

    formData.append("IdActividad", id);
    formData.append("Comentario", message);

    const res = yield axios.post(`CambioDivisa/DenegarCambioDivisa`, formData);

    if (res.status === 200) {
      if (connection.connectionStarted) yield connection.invoke("CambioStatusCD");
      yield call(closeModal);
      yield Swal.fire("Transacción cancelada", "La transacción fue cancelada.", "success");
      yield put(actions.declineExchangeSuccess());
    }
  } catch (error) {
    yield put(actions.apiError("Ha ocurrido un error cancelando el cambio de divisa."));
    yield delay(4000);
    yield put(actions.clearAlert());
  }
}

function* editExchange({ payload }) {
  const { id, details, values, update } = payload;

  const exchangeValues = {
    IdPayment: id,
    IdBank: values.idBankReceive || 0,
    IdInstaAccount: values.idBankSend || 0,
    IdExchangeType: details.bancoEnvia.idMoneda,
    AccountType: values.accountType,
    AccountNumber: values.accountNumber,
    NumberBankReference: values.transferNumber,
    amountSell: values.amountSell || 0,
    amountReceive: values.amountReceive || 0,
    CustomCommission: values.isPreferential,
    CommissionRate: values.preferentialRate || 0,
  };

  try {
    const res = yield axios.post("CambioDivisa/ActualizarCambioDivisa", exchangeValues);
    if (res.status === 200) {
      yield put(actions.editExchangeSuccess());
      yield Swal.fire("Actualizado", "Los datos fueron actualizados correctamente.", "success");
      yield call(getExchangeDetails, { payload: { id } });
      yield call(update);
    }
  } catch (error) {
    yield put(actions.apiError(error.message));
    yield delay(4000);
    yield put(actions.clearAlert());
  }
}

function* createInvoice({ payload }) {
  const { id, details, update } = payload;

  const { ruc } = details;

  try {
    const res = yield axios.post(`/CambioDivisa/GenerarBoleta?Id=${id}`);

    if (res.status === 200) {
      yield put(actions.getExchangeDetails(id));
      if (update) yield call(update);
      yield call([Swal, "fire"], {
        title: "Exitoso!",
        text: `La ${ruc ? "Factura" : "Boleta"} fue generada correctamente.`,
        icon: "success",
      });
    }
  } catch (error) {
    yield call([Swal, "fire"], {
      title: "Error al crear factura!",
      text: error.data,
      icon: "error",
    });
    yield put(actions.apiError(error.message));
    yield put(actions.clearAlert());
  }
}

export function* watchEditExchange() {
  yield takeEvery(actionTypes.EDIT_EXCHANGE, editExchange);
}

export function* watchExchangeDetails() {
  yield takeEvery(actionTypes.GET_EXCHANGE_DETAILS, getExchangeDetails);
}

export function* watchApproveExchange() {
  yield takeEvery(actionTypes.APPROVE_EXCHANGE, approveExchange);
}

export function* watchDeclineExchange() {
  yield takeEvery(actionTypes.DECLINE_EXCHANGE, declineExchange);
}

export function* watchCreateInvoice() {
  yield takeEvery(actionTypes.CREATE_INVOICE, createInvoice);
}

export default function* () {
  yield all([fork(watchExchangeDetails), fork(watchApproveExchange), fork(watchDeclineExchange), fork(watchEditExchange), fork(watchCreateInvoice)]);
}

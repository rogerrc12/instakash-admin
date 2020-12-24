import { put, all, fork, takeEvery, delay, call } from "redux-saga/effects";
import * as actionTypes from "./actionTypes";
import * as actions from "./actions";
import { clientInstance as axios } from "../../../helpers/AuthType/axios";

function* getCbAccounts() {
  try {
    const res = yield axios.get("/CuentaInsta/ObtenerCuentasInsta");
    if (res.status === 200) yield put(actions.getCbAccountsSuccess(res.data));
  } catch (error) {
    yield put(actions.apiError(error.message));
  }
}

function* addAcbAccount({ payload }) {
  const { values, reset } = payload;
  yield console.log(values, reset);
}

function* editCbAccount({ payload }) {
  const { values, accId, reset } = payload;

  const editedAccount = {
    idInstaAccount: accId,
    direct: values.accNumber,
    interbank: null,
    idBank: values.idBank,
    idCurrencyType: values.idCurrencyType,
    amount: values.balance,
    isActive: true,
  };
  try {
    const res = yield axios.post("/CuentaInsta/EditarCuentaInsta", editedAccount);
    if (res.status === 200) {
      yield put(actions.editCbAccountSuccess("Cuenta editada correctamente!"));
      yield put(actions.getCbAccounts());
      yield call(reset, null);
    }
  } catch (error) {
    yield put(actions.apiError(error.message));
  } finally {
    yield delay(4000);
    yield put(actions.clearAlert());
  }
}

export function* watchGetCbAccounts() {
  yield takeEvery(actionTypes.GET_CB_ACCOUNTS, getCbAccounts);
}

export function* watchAddCbAccount() {
  yield takeEvery(actionTypes.ADD_CB_ACCOUNTS, addAcbAccount);
}

export function* watchEditCbAccount() {
  yield takeEvery(actionTypes.EDIT_CB_ACCOUNTS, editCbAccount);
}

export default function* () {
  yield all([fork(watchGetCbAccounts), fork(watchAddCbAccount), fork(watchEditCbAccount)]);
}

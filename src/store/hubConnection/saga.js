import { put, fork, all, takeEvery } from "redux-saga/effects";
import * as actionTypes from "./actionTypes";
import * as actions from "./actions";
import * as signalR from "@microsoft/signalr";

function* createHubConnection() {
  const hubConnection = new signalR.HubConnectionBuilder()
    .withUrl(process.env.NODE_ENV !== "production" ? process.env.REACT_APP_WS : process.env.REACT_APP_PROD_WS)
    .withAutomaticReconnect()
    .build();

  try {
    yield hubConnection.start();
    console.log("Conexión exitosa!");
    yield put(actions.createConnectionSuccess(hubConnection));
  } catch (error) {
    console.log("COnexion fallida: " + error);
    yield put(actions.createConnectionFailed());
  }
}

export function* watchCreateHubConnection() {
  yield takeEvery(actionTypes.CREATE_CONNECTION, createHubConnection);
}

export default function* () {
  yield all([fork(watchCreateHubConnection)]);
}

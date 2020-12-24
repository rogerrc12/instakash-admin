import { put, all, fork, takeEvery, delay } from "redux-saga/effects";
import * as actionTypes from "./actionTypes";
import * as actions from "./actions";
import { clientInstance as axios } from "../../../helpers/AuthType/axios";

function* getSchedule() {
  try {
    const res = yield axios.get("/Horarios/ObtenerHorario");
    if (res.status === 200) yield put(actions.getScheduleSuccess(res.data));
  } catch (error) {
    yield put(actions.apiError(error.message));
  }
}

function* editSchedule({ payload }) {
  const { values } = payload;

  const formData = new FormData();

  formData.append("IdSchedule", values.IdSchedule);
  formData.append("StartTime", values.StartTime);
  formData.append("EndTime", values.EndTime);
  formData.append("IsWorkingDay", values.IsWorkingDay);

  try {
    const res = yield axios.post("horarios/EditarDia", formData);
    if (res.status === 200) {
      yield put(actions.editScheduleSuccess("Horario editado correctamente!"));
      yield put(actions.getSchedule());
    }
  } catch (error) {
    yield put(actions.apiError(error.message));
  } finally {
    yield delay(4000);
    yield put(actions.clearAlert());
  }
}

export function* watchGetSchedule() {
  yield takeEvery(actionTypes.GET_SCHEDULE, getSchedule);
}

export function* watchEditSchedule() {
  yield takeEvery(actionTypes.EDIT_SCHEDULE, editSchedule);
}

export default function* () {
  yield all([fork(watchGetSchedule), fork(watchEditSchedule)]);
}

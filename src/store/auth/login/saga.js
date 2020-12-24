import { takeEvery, fork, put, all, call, delay } from "redux-saga/effects";

// Login Redux States
import { LOGIN_USER, LOGOUT_USER, LOAD_USER } from "./actionTypes";
import * as actions from "./actions";

import { postJwtLogin, getLoggedInUser } from "../../../helpers/backend_helper";

function* loadUser({ history }) {
  const authUser = yield call([localStorage, "getItem"], "authUser");

  if (authUser) {
    const { userId, accessToken, tokenExp } = JSON.parse(authUser);
    if (accessToken) {
      if (new Date(tokenExp) <= new Date()) return yield put(actions.logoutUser(history));

      try {
        const user = yield getLoggedInUser(userId);
        yield put(actions.loginSuccess(user));
        if (history) history.push("/dashboard");
      } catch (error) {
        yield put(actions.loadUserError());
        yield put(actions.logoutUser(history));
        yield put(actions.clearAlert());
      }
    } else {
      yield put(actions.logoutUser(history));
      yield put(actions.loadUserError());
    }
  } else return yield put(actions.loadUserError());
}

function* loginUser({ payload }) {
  const { user, history } = payload;

  try {
    const res = yield call(postJwtLogin, "/Usuario/Login", { Email: user.email, Password: user.password });
    const userObj = { accessToken: res.token, userId: res.idUser, tokenExp: new Date(res.expires) };
    yield call([localStorage, "setItem"], "authUser", JSON.stringify(userObj));
    yield put(actions.loadUser(history));
  } catch (error) {
    let message;
    error.status === 404 ? (message = "usuario y/o contraseña incorrectos.") : (message = error.message);
    yield put(actions.apiError(message));
    yield delay(5000);
    yield put(actions.clearAlert());
  }
}

function* logoutUser({ payload }) {
  const { history } = payload;

  try {
    localStorage.removeItem("authUser");
    yield put(actions.logoutUserSuccess());

    history.push("/login");
  } catch (error) {
    yield put(actions.apiError(error.message));
    yield delay(5000);
    yield put(actions.clearAlert());
  }
}

export function* watchLoadUser() {
  yield takeEvery(LOAD_USER, loadUser);
}

export function* watchUserLogin() {
  yield takeEvery(LOGIN_USER, loginUser);
}

export function* watchUserLogout() {
  yield takeEvery(LOGOUT_USER, logoutUser);
}

function* authSaga() {
  yield all([fork(watchLoadUser), fork(watchUserLogin), fork(watchUserLogout)]);
}

export default authSaga;

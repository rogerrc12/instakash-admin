import { takeEvery, fork, put, all, call, delay } from "redux-saga/effects";
import { clientInstance as clientAxios } from "../../../helpers/AuthType/axios";
import Swal from "sweetalert2";

// Login Redux States
import { GET_USERS, ADD_USER, EDIT_USER, GET_ROLES, DELETE_USER } from "./actionTypes";
import { getUsersSuccess, addUserSuccess, editUserSuccess, getRolesSuccess, apiError, clearAlert } from "./actions";

function* getRoles() {
  try {
    const res = yield clientAxios.get("/Roles/ObtenerRoles");
    yield put(getRolesSuccess(res.data));
  } catch (error) {
    yield put(apiError(error.message));
  }
}

function* getAdminUsers() {
  try {
    const res = yield clientAxios.get("/Usuario/ObtenerUsuarios");
    const users = res.data.filter((user) => user.estado);
    yield put(getUsersSuccess(users));
  } catch (error) {
    yield put(apiError(error.message));
  }
}

function* addAdminUser({ payload }) {
  const { values } = payload;

  values.IdRol = +values.IdRol;

  try {
    const res = yield clientAxios.post("/Usuario/Registro", values);

    if (res.status === 200) {
      yield put(addUserSuccess("Usuario agregado correctamente"));
      yield call(getAdminUsers);
    }
  } catch (error) {
    let message = error.message;
    if (error.status === 422) message = "Ya existe un usuario registrado con este correo.";
    yield put(apiError(message));
  } finally {
    yield delay(4000);
    yield put(clearAlert());
  }
}

function* editAdminUser({ payload }) {
  const { values, userId } = payload;

  values.Id = userId;
  values.IdRol = +values.IdRol;

  try {
    const res = yield clientAxios.post("/Usuario/ActualizarUsuario", values);
    if (res.status === 200) {
      yield put(editUserSuccess("Usuario editado correctamente!"));
      yield call(getAdminUsers);
    }
  } catch (error) {
    yield put(apiError(error.message));
  } finally {
    yield delay(4000);
    yield put(clearAlert());
  }
}

function* deleteAdminUser({ payload }) {
  const { userId } = payload;

  try {
    const result = yield call([Swal, "fire"], {
      title: "¿Desea eliminar este usuario?",
      text: "No podrás revertir esta acción.",
      icon: "warning",
      showDenyButton: true,
      confirmButtonText: `Si, eliminar!`,
      denyButtonText: `Cancelar`,
    });

    if (result.isConfirmed) {
      const res = yield clientAxios.post(`/Usuario/EliminaUsuario?Id=${userId}`);
      if (res.status === 200) {
        Swal.fire("Exitoso!", "El usuario ha sido eliminado correctamente.", "success");
        yield call(getAdminUsers);
      }
    }
  } catch (error) {
    Swal.fire("Error!", error.message, "error");
  }
}

export function* watchGetAdminRoles() {
  yield takeEvery(GET_ROLES, getRoles);
}

export function* watchAddAdminUser() {
  yield takeEvery(ADD_USER, addAdminUser);
}

export function* watchEditAdminUser() {
  yield takeEvery(EDIT_USER, editAdminUser);
}

export function* watchDeleteAdminUser() {
  yield takeEvery(DELETE_USER, deleteAdminUser);
}

export function* watchGetAdminUsers() {
  yield takeEvery(GET_USERS, getAdminUsers);
}

function* ProfileSaga() {
  yield all([fork(watchAddAdminUser), fork(watchGetAdminUsers), fork(watchEditAdminUser), fork(watchGetAdminRoles), fork(watchDeleteAdminUser)]);
}

export default ProfileSaga;

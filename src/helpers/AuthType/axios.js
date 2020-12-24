import axios from "axios";

const baseURL = process.env.NODE_ENV !== "production" ? "https://admin-testapi.instakash.net/api" : "https://admin-prodapi.instakash.net/api";

const defaultInstance = axios.create({
  baseURL,
  timeout: 15000,
});

defaultInstance.interceptors.request.use(
  (config) => {
    console.log(`Request sent to ${config.baseURL + config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

defaultInstance.interceptors.response.use(
  (res) => res,
  (error) => {
    console.warn("Error", error.response ? error.response.status : error.code);
    let message = "Parece que ha ocurrido un error inesperado. Por favor contacta a soporte.";

    if (error.code === "ECONNABORTED") {
      message = "Parece que ha ocurrido un error de conexión. Revisa tu conexión a internet y si el problema persiste contacta a soporte.";
    }

    if (error.response) {
      error.response.message = message;
      return Promise.reject(error.response);
    } else {
      error.message = message;
      return Promise.reject(error);
    }
  }
);

const clientInstance = axios.create({
  baseURL,
  timeout: 25000,
});

clientInstance.interceptors.request.use(
  (config) => {
    const { accessToken } = JSON.parse(localStorage.getItem("authUser"));
    config.headers.Authorization = accessToken ? accessToken : "";
    console.log(`Client request sent to ${config.baseURL + config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

clientInstance.interceptors.response.use(
  (res) => res,
  (error) => {
    console.warn("Error", error.response.status);
    if (error.response) {
      error.response.status === 401
        ? (error.response.message = "No estás autorizado para esta acción.")
        : (error.response.message = "Ha ocurrido un error inesperado. Por favor contacta a soporte.");
      return Promise.reject(error.response);
    } else {
      error.message = "Ha ocurrido un error inesperado. Por favor contacta a soporte.";
      return Promise.reject(error);
    }
  }
);

export { defaultInstance, clientInstance };

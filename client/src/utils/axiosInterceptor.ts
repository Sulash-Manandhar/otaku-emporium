import axios from "axios";
import urls from "../routes/urls";
import { getAccessToken } from "./auth";

// axios.defaults.baseURL = process.env.REACT_APP_BASE_URL ;
axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

axios.create({
  baseURL: process.env.BASE_URL,
});
const access_token = getAccessToken();

const requestConfig = (request: any) => {
  request.headers["Accept"] = "application/json";
  request.headers["Content-Type"] = "application/json";

  if (access_token) {
    request.headers["Authorization"] = "Bearer " + access_token;
  }
  return request;
};

const errorConfig = (error: any) => {
  const originalRequest = error.config;

  if (error.response.status === 401) {
    window.location.replace(urls.home);
    return Promise.reject(error);
  }
  return Promise.reject(error);
};

export function initInterceptor() {
  axios.interceptors.request.use(
    (request) => requestConfig(request),
    (error) => Promise.reject(error)
  );
  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => errorConfig(error)
  );
}

export default axios;

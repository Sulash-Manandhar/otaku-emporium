import axios from "axios";
import api from "../routes/api";
import urls from "../routes/urls";
import {
  getAccessToken,
  getRefreshToken,
  setAccessToken,
  setRefreshToken,
} from "./auth";

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
  console.log("url", originalRequest.url);
  console.log("retry", originalRequest._retry);

  if (
    error.response.status === 401 &&
    originalRequest.url.includes(api.refresh_token)
  ) {
    // window.location.replace(urls.home);
    return Promise.reject(error);
  }

  if (error.response.status === 401 && !originalRequest._retry) {
    console.log("originalRequest", originalRequest);

    originalRequest._retry = true;
    return axios
      .get(api.refresh_token, {
        headers: {
          Authorization: "Bearer " + getRefreshToken(),
        },
      })
      .then((res) => {
        if (res.status === 200) {
          console.log("res", res);

          setAccessToken(res?.data?.data?.access_token);
          setRefreshToken(res?.data?.data?.refresh_token);
          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${getRefreshToken()}`;
          return axios(originalRequest);
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  }
  return Promise.reject(error);
};

export function initInterceptor() {
  axios.interceptors.request.use(
    (request) => requestConfig(request),
    (error) => Promise.reject(error)
  );
  axios.interceptors.response.use(
    (response) => response,
    (error) => errorConfig(error)
  );
}

export default axios;

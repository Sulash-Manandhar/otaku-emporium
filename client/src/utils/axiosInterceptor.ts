import axios from "axios";
import { useNavigate } from "react-router-dom";
import urls from "../route/urls";
import { getAccessToken, getRefreshToken, setAccessToken } from "./auth";

// axios.defaults.baseURL = process.env.REACT_APP_BASE_URL ;
axios.defaults.baseURL = process.env.REACT_APP_FAKE_URL;

axios.create({
  baseURL: process.env.BASE_URL,
});

const navigate = useNavigate();

//request interceptors
axios.interceptors.request.use(
  (request: any) => {
    const access_token = getAccessToken();
    if (access_token) {
      request.headers.Authorization = "Bearer " + access_token;
    }
    request.headers["Content-Type"] = "application/json";
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response: any) => {
    return response;
  },
  (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401) {
      navigate(urls.log_in);
      return Promise.reject(error);
    }
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = getRefreshToken();
      return axios
        .post("/auth/token", {
          refresh_token: refreshToken,
        })
        .then((res) => {
          if (res.status === 201) {
            setAccessToken(res.data);
            axios.defaults.headers.common["Authorization"] =
              "Bearer " + getAccessToken();
            return axios(originalRequest);
          }
        });
    }
    return Promise.reject(error);
  }
);

export default axios;

import axios from "axios";

axios.defaults.baseURL = "http://localhost:5000/api";

axios.create({
  baseURL: process.env.BASE_URL,
});

//request interceptors
axios.interceptors.request.use(
  (request: any) => {
    console.log(request);
    request.headers.common["Accept"] = "application/json";

    let access_token = localStorage.getItem("access_token");
    if (access_token) {
      request.headers.Authorization = "Bearer " + access_token;
    }
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
    return Promise.reject(error);
  }
);

export default axios;

import axios from "axios";

axios.defaults.baseURL = "http://localhost:5000/";

axios.interceptors.request.use((request: any) => {
  let access_token = localStorage.getItem("access_token");
  if (access_token) {
    request.headers.Authorization = "Bearer " + access_token;
  }
  return request;
});

axios.interceptors.response.use(
  (response: any) => {
    return response.data;
  },
  (error) => {
    if (error.response.status === 401) {
      console.log("Unauthorized");
    }
    if (error.reponse.status === 503) {
      console.log("Server is offline");
    }
    return Promise.reject(error);
  }
);

export default axios;

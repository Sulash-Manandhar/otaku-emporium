import axios from "axios";

axios.defaults.baseURL = "http://localhost:5000/api";

interface ListParams {
  query?: Record<string, string>;
}

export async function getUserList(props?: ListParams) {
  return axios({
    method: "GET",
    url: "/user",
    params: props?.query,
  }).then((response) => response?.data);
}

export async function getApparelList() {
  return axios({
    method: "GET",
    url: "/apparels",
  }).then((response) => response?.data);
}

import axios from "axios";
import { DELETE, GET, PUT, baseUrl } from "../constant";

axios.defaults.baseURL = baseUrl;

export async function getUserList() {
  return axios({
    method: GET,
    url: `/user`,
  }).then((response) => {
    return response?.data;
  });
}

export async function getUserDetails(userId: string | undefined) {
  return axios({
    method: GET,
    url: `user/${userId}`,
  }).then((response) => response?.data);
}

export async function banUser(userId: string, ban: boolean) {
  return axios({
    method: PUT,
    url: `/user/ban/${userId}`,
    data: { ban },
  }).then((response) => response?.data);
}

export async function deleteUser(userId: string) {
  return axios({
    method: DELETE,
    url: `user/delete/${userId}`,
  }).then((response) => response?.data);
}

import axios from "axios";
import { GET, PUT, baseUrl } from "../constant";

axios.defaults.baseURL = baseUrl;

export async function getUserList() {
  return axios({
    method: GET,
    url: `/user`,
  }).then((response) => {
    return response?.data;
  });
}

export async function banUser(userId: string, ban: boolean) {
  return axios({
    method: PUT,
    url: `/user/ban/${userId}`,
    data: { ban },
  }).then((response) => response?.data);
}

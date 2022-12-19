import axios from "axios";
import api from "../routes/api";

export async function registerUserAPI(data: any) {
  return axios({
    method: "post",
    url: api.register,
    data: data,
  }).then((response) => {
    return response;
  });
}

export async function loginAPI(data: any) {
  return axios({
    method: "post",
    url: api.login,
    data: data,
  }).then((response) => {
    return response?.data;
  });
}

export async function sendVerificationAPI(data: any) {
  return axios({
    method: "post",
    url: api.send_verification_code,
    data: data,
  }).then((response) => {
    return response;
  });
}

export async function verifyOPTAPI(data: any) {
  return axios({
    method: "post",
    url: api.verify_code,
    data: data,
  }).then((response) => {
    return response?.data;
  });
}

export async function getLoggedInUserAPI() {
  return axios({
    method: "get",
    url: api.logged_user,
  }).then((response) => {
    return response?.data;
  });
}

import axios from "axios";
import api from "../routes/api";

export async function registerUser(data: any) {
  return axios({
    method: "post",
    url: api.register,
    data: data,
  }).then((response) => {
    return response;
  });
}

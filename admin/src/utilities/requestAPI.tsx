import axios from "axios";

const POST = "POST";
const GET = "GET";
const PATCH = "PATCH";
const PUT = "PUT";
const DELETE = "DELETE";

export async function getUserList() {
  return axios({
    method: GET,
    url: "http://localhost:5000/api/user",
  }).then((response) => {
    return response?.data;
  });
}

import axios from "axios";

const POST = "POST";
const GET = "GET";
const PATCH = "PATCH";
const PUT = "PUT";
const DELETE = "DELETE";

export async function adminLogin(data: any) {
  return axios({
    method: POST,
    url: "/",
    data: data,
  }).then((response) => {
    return response;
  });
}

const user = "/users";
const file = "/files";
const apparels = "/apparels";

const api = {
  //json placeholder free api
  try_api: "/public/v2/users",

  // Authentication
  register: `${user}/`,
  login: `${user}/login`,
  logged_user: `${user}/getLoggedInUser`,
  send_verification_code: `${user}/verify-opt-code`,
  refresh_token: `${user}/getRefreshToken`,

  //Apparels
  add_apparel: `${apparels}/`,
  remove_apparel: `${apparels}/:id`,
  update_apparel: `${apparels}/:id`,

  //file
  upload_image: `${file}/upload`,
};

export default api;

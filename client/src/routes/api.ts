const user = "/users";
const file = "/files";
const apparels = "/apparels";

const api = {
  // Authentication
  register: `${user}/`,
  login: `${user}/login`,
  logged_user: `${user}/getLoggedInUser`,
  send_verification_code: `${user}/verify-opt-code`,

  //Apparels
  add_apparel: `${apparels}/`,
  remove_apparel: `${apparels}/:id`,
  update_apparel: `${apparels}/:id`,

  //file
  upload_image: "${file}/upload",
};

export default api;

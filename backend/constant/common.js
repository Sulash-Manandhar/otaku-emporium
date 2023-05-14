export const PASSWORD_REGREX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/i;

export const REMOVE_MONGOID_REGREX = /\/[a-fA-F0-9]{24}(?=\/|$)/i;

export const REMOVE_IMAGE_EXTENSION = /\.([^.]+)$/;

export const APPAREL_CATEGORY_TYPE = ["Hoodie", "Sweetshirt", "T-shirt"];

export const statusResponse = {
  success: true,
  database: "MongoDB-Connected",
  api: "working",
  msg: "You can send API request to this endpoint.",
};

export const VALIDATION_ERROR = "Validation Error";
export const SERVER_ERROR = "Server Error";
export const GMAIL = "gmail";

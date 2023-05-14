import bcrypt from "bcryptjs";

export async function encryptPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

export async function decryptPassword(loginPassword, databasePassword) {
  return await bcrypt.compare(loginPassword, databasePassword);
}

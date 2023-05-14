function isJSON(value) {
  try {
    JSON.parse(value);
    return true;
  } catch (err) {
    return false;
  }
}
export default isJSON;

function convertSearchParamsToBoolean(value: string | null): boolean | null {
  if (!value) return null;
  return JSON.parse(value);
}

export default convertSearchParamsToBoolean;

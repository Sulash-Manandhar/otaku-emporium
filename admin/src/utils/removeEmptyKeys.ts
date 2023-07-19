export function removeEmptyKeys(obj: any) {
  const filteredEntries = Object.entries(obj).filter(
    ([_, value]) => value !== null && value !== undefined && value !== ""
  );
  return Object.fromEntries(filteredEntries);
}

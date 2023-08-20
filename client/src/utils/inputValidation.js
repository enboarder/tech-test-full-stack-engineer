export const isValidStringType = (stringType) =>
  /^[A-Za-z\s]+$/.test(stringType);
export const isValidNumType = (numType) => /^\d+$/.test(numType);

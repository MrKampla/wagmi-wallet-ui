export const isValidBigNumberString = (value: string) => {
  return /^(\d+)([.,]\d+)?$/.test(value);
};

export const prepareStringToBigNumberParsing = (value: string) => {
  return value
    .replace(',', '.')
    .replaceAll(',', '')
    .replaceAll(/\s/g, '')
    .replaceAll(/[^0-9.]/g, '');
};

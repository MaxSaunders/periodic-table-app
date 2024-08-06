/* eslint-disable import/prefer-default-export */
export function convertMass(value: string | number) {
  const convertedValue = parseInt(value.toString(), 10).toFixed(2);
  if (Number.isNaN(value) || convertedValue === "NaN") {
    return value;
  }
  return parseInt(value.toString(), 10).toFixed(2) || value;
}

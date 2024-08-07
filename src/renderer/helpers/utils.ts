export function className(array: any[]) {
  return array
    .filter((i) => !!i)
    .map((s) => s.toString())
    .join(" ");
}

export function convertMass(value: string | number): string {
  const numericValue = parseInt(value.toString(), 10);
  if (numericValue % 1 === 0) return numericValue.toString();
  const convertedValue = numericValue.toFixed(2);
  if (Number.isNaN(value) || convertedValue === "NaN") {
    return value.toString();
  }
  return (parseInt(value.toString(), 10).toFixed(2) || value).toString();
}

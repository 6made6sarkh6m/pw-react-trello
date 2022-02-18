export const haseEmptyValue = (value: string) =>
  value && value.trim() ? undefined : "Required";

export const hasEmptyValue = (value: string) =>
  value && value.trim() ? undefined : "Required";

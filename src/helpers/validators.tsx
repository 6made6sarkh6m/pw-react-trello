export const empty = (value: string) =>
  value.trim() ? undefined : "No empty spaces";

export const required = (value: string) => (value ? undefined : "Required");

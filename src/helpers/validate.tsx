export const validate = (value: string) => {
  if (!value) {
    return "Required";
  } else if (!value.trim()) {
    return "No empty spaces";
  } else {
    return undefined;
  }
};

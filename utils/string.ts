export const getAbbreviation = (input: string | null | undefined) => {
  if (!input) {
    return "?";
  }

  return input.match(/[A-Z]/g)?.join("");
};

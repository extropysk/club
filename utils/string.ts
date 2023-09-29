export const getAbbreviation = (input?: string | null) => {
  if (!input) {
    return "?";
  }

  return input.match(/[A-Z]/g)?.join("");
};

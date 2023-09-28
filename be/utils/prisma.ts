import { set } from "lodash";

export const processOrderBy = (input?: Record<string, "asc" | "desc">) => {
  const output = {};
  if (input) {
    Object.entries(input).forEach(([key, value]) => set(output, key, value));
  }
  return output;
};

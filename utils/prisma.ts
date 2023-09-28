import { set } from "lodash";

export type OrderBy = Record<string, "asc" | "desc">;

export const processOrderBy = (input?: OrderBy) => {
  const output = {};
  if (input) {
    Object.entries(input).forEach(([key, value]) => set(output, key, value));
  }
  return output;
};

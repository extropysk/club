import { SortingState } from "@tanstack/react-table";
import { useState } from "react";
import { OrderBy } from "utils/prisma";

export const useSorting = (defaultOrder: OrderBy = {}) => {
  const [sorting, setSorting] = useState<SortingState>(
    Object.entries(defaultOrder).map(([id, value]) => ({
      id,
      desc: value === "desc",
    }))
  );

  const orderBy = sorting.reduce(
    (a: OrderBy, v: any) => ({
      ...a,
      [v.id]: v.desc === true ? "desc" : "asc",
    }),
    {}
  );

  return { sorting, setSorting, orderBy };
};

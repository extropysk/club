import { SportType } from "@prisma/client";
import { create } from "zustand";

interface State {
  sportType: SportType | undefined;
  filter: string;
}

interface Actions {
  setSportType: (sportType: SportType | undefined) => void;
  setFilter: (filter: string) => void;
}

export const useStore = create<Actions & State>()((set) => ({
  sportType: undefined,
  filter: "",
  setSportType: (sportType) => {
    set(() => ({ sportType }));
  },
  setFilter: (filter) => {
    set(() => ({ filter }));
  },
}));

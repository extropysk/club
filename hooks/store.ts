import { SportType } from "@prisma/client";
import { DateRange } from "react-day-picker";
import { create } from "zustand";

interface State {
  sportType?: SportType;
  filter: string;
  dateRange?: DateRange;
}

interface Actions {
  setSportType: (sportType?: SportType) => void;
  setFilter: (filter: string) => void;
  setDateRange: (dateRange?: DateRange) => void;
}

export const useStore = create<Actions & State>()((set) => ({
  sportType: undefined,
  filter: "",
  dateRange: undefined,
  setSportType: (sportType) => {
    set(() => ({ sportType }));
  },
  setFilter: (filter) => {
    set(() => ({ filter }));
  },
  setDateRange: (dateRange) => {
    set(() => ({ dateRange }));
  },
}));

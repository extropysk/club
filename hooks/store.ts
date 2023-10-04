import { SportType } from "@prisma/client";
import { startOfMonth } from "date-fns";
import { DateRange } from "react-day-picker";
import { create } from "zustand";

interface State {
  sportType?: SportType;
  dateRange?: DateRange;
  aggregation: string;
}

interface Actions {
  setSportType: (sportType?: SportType) => void;
  setDateRange: (dateRange?: DateRange) => void;
  setAggregation: (aggregation: string) => void;
}

export const useStore = create<Actions & State>()((set) => ({
  sportType: undefined,
  dateRange: { from: startOfMonth(new Date()), to: new Date() },
  aggregation: "_sum.distance",
  setSportType: (sportType) => {
    set(() => ({ sportType }));
  },
  setDateRange: (dateRange) => {
    set(() => ({ dateRange }));
  },
  setAggregation: (aggregation) => {
    set(() => ({ aggregation }));
  },
}));

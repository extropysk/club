import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SportType } from "@prisma/client";
import { useStore } from "hooks/store";

interface Option<T> {
  value: T;
  label: string;
}

const OPTIONS: Option<SportType | "">[] = [
  {
    value: "",
    label: "All",
  },
  {
    value: "Run",
    label: "Run",
  },
  {
    value: "TrailRun",
    label: "Trail Run",
  },
  {
    value: "Hike",
    label: "Hike",
  },
  {
    value: "Ride",
    label: "Ride",
  },
];

export const SportTypeSelect = () => {
  const sportType = useStore((state) => state.sportType);
  const setSportType = useStore((state) => state.setSportType);

  return (
    <Select
      value={sportType ?? ""}
      onValueChange={(value) => {
        setSportType(value === "" ? undefined : (value as SportType));
      }}
    >
      <SelectTrigger className="min-w-[120px] w-fit">
        <SelectValue placeholder="Select a sport" />
      </SelectTrigger>
      <SelectContent>
        {OPTIONS.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

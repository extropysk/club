import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SportType } from "@prisma/client";
import { useStore } from "hooks/store";

interface Data<T> {
  value: T;
  label: string;
}

const DATA: Data<SportType | "">[] = [
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
      <SelectTrigger className="max-w-[120px]">
        <SelectValue placeholder="Select a sport" />
      </SelectTrigger>
      <SelectContent>
        {DATA.map((d) => (
          <SelectItem key={d.value} value={d.value}>
            {d.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

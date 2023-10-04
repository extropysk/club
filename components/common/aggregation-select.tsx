import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useStore } from "hooks/store";

interface Option<T> {
  value: T;
  label: string;
}

const OPTIONS: Option<string>[] = [
  {
    value: "_sum.distance",
    label: "Distance",
  },
  {
    value: "_sum.total_elevation_gain",
    label: "Elevation Gain",
  },
  {
    value: "_sum.moving_time",
    label: "Moving Time",
  },
  {
    value: "_count.id",
    label: "Total Activities",
  },
];

export const AggregationSelect = () => {
  const aggregation = useStore((state) => state.aggregation);
  const setAggregation = useStore((state) => state.setAggregation);

  return (
    <Select value={aggregation} onValueChange={setAggregation}>
      <SelectTrigger className="max-w-[180px]">
        <SelectValue placeholder="Select" />
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

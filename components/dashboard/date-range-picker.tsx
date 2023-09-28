"use client";

import { CalendarIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { useStore } from "hooks/store";
import { useEffect } from "react";
import { DateRange } from "react-day-picker";
import { cn } from "utils/ui";

interface Props {
  defaultValue?: DateRange;
}

export function CalendarDateRangePicker({ defaultValue }: Props) {
  const value = useStore((state) => state.dateRange);
  const setDateRange = useStore((state) => state.setDateRange);

  useEffect(() => {
    if (defaultValue) {
      console.log("SET");
      setDateRange(defaultValue);
    }
  }, [setDateRange, defaultValue]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          id="date"
          variant={"outline"}
          className={cn(
            "w-[240px] justify-start text-left font-normal",
            !value && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value?.from ? (
            value.to ? (
              <>
                {format(value.from, "LLL dd")} - {format(value.to, "LLL dd")}
              </>
            ) : (
              format(value.from, "LLL dd")
            )
          ) : (
            <span>Pick a date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="end">
        <Calendar
          initialFocus
          mode="range"
          defaultMonth={value?.from}
          selected={value}
          onSelect={setDateRange}
          numberOfMonths={2}
        />
      </PopoverContent>
    </Popover>
  );
}

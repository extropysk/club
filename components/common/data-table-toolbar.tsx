"use client";

import { Table } from "@tanstack/react-table";

import { Input } from "@/components/ui/input";

import { CalendarDateRangePicker } from "@/components/common/date-range-picker";
import { SportTypeSelect } from "@/components/common/sport-type-select";
import { DataTableViewOptions } from "@/components/ui/data-table/view-options";
import { useStore } from "hooks/store";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const filter = useStore((state) => state.filter);
  const setFilter = useStore((state) => state.setFilter);

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter tasks..."
          value={filter}
          onChange={(event) => {
            setFilter(event.target.value);
          }}
          className="h-8 w-[150px] lg:w-[250px]"
        />
        <SportTypeSelect />
        <CalendarDateRangePicker />
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}

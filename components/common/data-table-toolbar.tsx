"use client";

import { Table } from "@tanstack/react-table";

import { CalendarDateRangePicker } from "@/components/common/date-range-picker";
import { SportTypeSelect } from "@/components/common/sport-type-select";
import { DataTableViewOptions } from "@/components/ui/data-table/view-options";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <SportTypeSelect />
        <CalendarDateRangePicker />
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}

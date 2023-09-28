"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { SportTypeSelect } from "@/components/common/sport-type-select";
import { CalendarDateRangePicker } from "@/components/dashboard/date-range-picker";
import { DataTableViewOptions } from "@/components/ui/data-table/view-options";
import { startOfMonth } from "date-fns";
import { useStore } from "hooks/store";
import { priorities, statuses } from "../data/data";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

const DEFAULT_DATE_RANGE = {
  from: startOfMonth(new Date()),
  to: new Date(),
};

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const filter = useStore((state) => state.filter);
  const setFilter = useStore((state) => state.setFilter);

  const isFiltered = Boolean(filter);

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
        <CalendarDateRangePicker defaultValue={DEFAULT_DATE_RANGE} />
        {table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Status"
            options={statuses}
          />
        )}
        {table.getColumn("priority") && (
          <DataTableFacetedFilter
            column={table.getColumn("priority")}
            title="Priority"
            options={priorities}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => {
              setFilter("");
            }}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}

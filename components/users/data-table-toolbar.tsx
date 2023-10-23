"use client";

import { Table } from "@tanstack/react-table";

import { DataTableViewOptions } from "@/components/ui/data-table/view-options";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  onFilterChange: (value?: string) => void;
}

const DELAY = 500;

export function DataTableToolbar<TData>({
  table,
  onFilterChange,
}: DataTableToolbarProps<TData>) {
  const [filter, setFilter] = useState<string>();

  useEffect(() => {
    const timer = setTimeout(() => {
      onFilterChange(filter);
    }, DELAY);

    return () => {
      clearTimeout(timer);
    };
  }, [filter, onFilterChange]);

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
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}

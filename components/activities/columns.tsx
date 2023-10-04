"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";
import { Activity } from "@prisma/client";
import { dateToStr, durationToStr } from "utils/date";
import { round } from "utils/num";
import { DataTableColumnHeader } from "../ui/data-table/column-header";

export const columns: ColumnDef<Activity>[] = [
  {
    accessorKey: "start_date",
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    cell: ({ row }) => (
      <div className="w-[80px]">
        {dateToStr(new Date(row.getValue("start_date")))}
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <Badge variant="outline">{row.original.sport_type}</Badge>
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("name")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "distance",
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {round(row.getValue<number>("distance") / 1000, 1)}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "total_elevation_gain",
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {round(row.getValue<number>("total_elevation_gain"))}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "moving_time",
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {durationToStr(row.getValue<number>("moving_time"))}
          </span>
        </div>
      );
    },
  },
];

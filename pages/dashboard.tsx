import { SportTypeSelect } from "@/components/common/sport-type-select";
import { CalendarDateRangePicker } from "@/components/dashboard/date-range-picker";
import { MainNav } from "@/components/dashboard/main-nav";
import { Overview } from "@/components/dashboard/overview";
import { RecentSales } from "@/components/dashboard/recent-sales";
import TeamSwitcher from "@/components/dashboard/team-switcher";
import { UserNav } from "@/components/dashboard/user-nav";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { startOfMonth } from "date-fns";
import { useStore } from "hooks/store";
import { Clock, Footprints, Rocket, Search, Sigma } from "lucide-react";
import { Metadata } from "next";
import { useState } from "react";
import { durationToStr } from "utils/date";
import { round } from "utils/num";
import { trpc } from "utils/trpc";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Example dashboard app built using the components.",
};

const DEFAULT_DATE_RANGE = {
  from: startOfMonth(new Date()),
  to: new Date(),
};

export default function DashboardPage() {
  const [overviewKey, setOverviewKey] = useState("_sum.distance");

  const sportType = useStore((state) => state.sportType);
  const dateRange = useStore((state) => state.dateRange);
  const { data: dashboardData } = trpc.activity.dashboard.useQuery({
    from:
      dateRange?.from?.toISOString() ?? DEFAULT_DATE_RANGE.from.toISOString(),
    to: dateRange?.to?.toISOString(),
    sportType,
  });

  const distance = dashboardData?._sum?.distance ?? 0;
  const totalElevationGain = dashboardData?._sum?.total_elevation_gain ?? 0;
  const movingTime = dashboardData?._sum?.moving_time ?? 0;
  const count = dashboardData?._count?.id;
  return (
    <>
      <div className="flex-col flex">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <TeamSwitcher />
            <MainNav className="mx-6 hidden md:flex" />
            <div className="ml-auto flex items-center space-x-4">
              <Search />
              <UserNav />
            </div>
          </div>
        </div>
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2 flex-wrap">
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            <div className="flex items-center space-x-2">
              <CalendarDateRangePicker defaultValue={DEFAULT_DATE_RANGE} />
              <SportTypeSelect />
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Distance</CardTitle>
                <Footprints size={12} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{`${round(
                  distance / 1000,
                  1
                )} km`}</div>
                <p className="text-xs text-muted-foreground">
                  +20.1% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Elevation Gain
                </CardTitle>
                <Rocket size={12} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{`${round(
                  totalElevationGain
                )} m`}</div>
                <p className="text-xs text-muted-foreground">
                  +180.1% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Moving Time
                </CardTitle>
                <Clock size={12} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {durationToStr(movingTime)}
                </div>
                <p className="text-xs text-muted-foreground">
                  +19% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Activities
                </CardTitle>
                <Sigma size={12} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{count ?? "?"}</div>
                <p className="text-xs text-muted-foreground">
                  +201 since last hour
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader className="flex flex-row items-center justify-between space-y-2">
                <CardTitle>Overview</CardTitle>
                <Select value={overviewKey} onValueChange={setOverviewKey}>
                  <SelectTrigger className="max-w-[180px]">
                    <SelectValue placeholder="Select a metric" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="_sum.distance">Distance</SelectItem>
                    <SelectItem value="_sum.total_elevation_gain">
                      Elevation Gain
                    </SelectItem>
                    <SelectItem value="_sum.moving_time">
                      Moving Time
                    </SelectItem>
                    <SelectItem value="_count.id">Total Activities</SelectItem>
                  </SelectContent>
                </Select>
              </CardHeader>
              <CardContent>
                <Overview dataKey={overviewKey} />
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Recent Sales</CardTitle>
                <CardDescription>
                  You made 265 sales this month.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RecentSales />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}

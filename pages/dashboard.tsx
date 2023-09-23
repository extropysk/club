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
import { TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SportType } from "@prisma/client";
import { Tabs } from "@radix-ui/react-tabs";
import { startOfMonth } from "date-fns";
import { Clock, Footprints, Rocket, Search, Sigma } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { durationToStr } from "utils/date";
import { round } from "utils/num";
import { trpc } from "utils/trpc";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Example dashboard app built using the components.",
};

const FROM = startOfMonth(new Date());

export default function DashboardPage() {
  const [date, setDate] = useState<DateRange | undefined>({
    from: FROM,
    to: new Date(),
  });
  const [sportType, setSportType] = useState<SportType | "">("");

  const { data } = trpc.activity.stats.useQuery({
    from: date?.from?.toISOString() ?? FROM.toISOString(),
    to: date?.to?.toISOString(),
    sportType: sportType === "" ? undefined : sportType,
  });

  const distance = data?._sum?.distance ?? 0;
  const totalElevationGain = data?._sum?.total_elevation_gain ?? 0;
  const movingTime = data?._sum?.moving_time ?? 0;
  const count = data?._count?.id;
  return (
    <>
      <div className="md:hidden">
        <Image
          src="/examples/dashboard-light.png"
          width={1280}
          height={866}
          alt="Dashboard"
          className="block dark:hidden"
        />
        <Image
          src="/examples/dashboard-dark.png"
          width={1280}
          height={866}
          alt="Dashboard"
          className="hidden dark:block"
        />
      </div>
      <div className="hidden flex-col md:flex">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <TeamSwitcher />
            <MainNav className="mx-6" />
            <div className="ml-auto flex items-center space-x-4">
              <Search />
              <UserNav />
            </div>
          </div>
        </div>
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            <div className="flex items-center space-x-2">
              <CalendarDateRangePicker date={date} setDate={setDate} />
              <Select value={sportType} onValueChange={setSportType}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a fruit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All</SelectItem>
                  <SelectItem value="Run">Run</SelectItem>
                  <SelectItem value="TrailRun">Trail Run</SelectItem>
                  <SelectItem value="Hike">Hike</SelectItem>
                  <SelectItem value="Ride">Ride</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="analytics" disabled>
                Analytics
              </TabsTrigger>
              <TabsTrigger value="reports" disabled>
                Reports
              </TabsTrigger>
              <TabsTrigger value="notifications" disabled>
                Notifications
              </TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Distance
                    </CardTitle>
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
                    <div className="text-2xl font-bold">{count || "?"}</div>
                    <p className="text-xs text-muted-foreground">
                      +201 since last hour
                    </p>
                  </CardContent>
                </Card>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                  <CardHeader>
                    <CardTitle>Overview</CardTitle>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <Overview />
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
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}

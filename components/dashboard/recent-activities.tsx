import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useActivityList } from "hooks/activity";
import { durationToStr } from "utils/date";
import { round } from "utils/num";

export function RecentActivities() {
  const { data } = useActivityList({
    orderBy: { start_date: "desc" },
    skip: 0,
    take: 5,
  });

  return (
    <div className="space-y-8">
      {data?.data.map((activity) => (
        <div key={activity.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src="/avatars/01.png" alt="Avatar" />
            <AvatarFallback>?</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{activity.name}</p>
            <p className="text-sm text-muted-foreground">{`${round(
              activity.distance / 1000,
              1
            )} km, ${activity.total_elevation_gain} m`}</p>
          </div>
          <div className="ml-auto font-medium">
            {durationToStr(activity.moving_time)}
          </div>
        </div>
      ))}
    </div>
  );
}

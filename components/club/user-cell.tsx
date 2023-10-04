import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUser } from "hooks/user";
import { getAbbreviation } from "utils/string";

interface Props {
  id: string;
  athleteId: string;
}

const UserCell = ({ id, athleteId }: Props) => {
  const { data: user } = useUser({ id });

  return (
    <div>
      <a
        target="_blank"
        href={`https://www.strava.com/athletes/${athleteId}`}
        rel="noopener noreferrer"
        className="flex flex-row"
      >
        <Avatar className="mr-2 h-5 w-5">
          <AvatarImage src={user?.image ?? ""} alt={user?.name ?? athleteId} />
          <AvatarFallback>{getAbbreviation(user?.name)}</AvatarFallback>
        </Avatar>
        {user?.name ?? athleteId}
      </a>
    </div>
  );
};

export default UserCell;

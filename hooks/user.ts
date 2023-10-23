import { OrderBy } from "utils/prisma";
import { trpc } from "utils/trpc";

interface UserParams {
  id: string;
}

export const useUser = ({ id }: UserParams) => {
  return trpc.user.byId.useQuery({
    id,
  });
};

interface ActivityListParams {
  orderBy: OrderBy;
  skip: number;
  take: number;
  filter?: string;
}

export const useUserList = ({
  skip,
  take,
  orderBy,
  filter,
}: ActivityListParams) => {
  return trpc.user.list.useQuery({
    skip,
    take,
    orderBy,
    filter,
  });
};

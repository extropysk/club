import { trpc } from "utils/trpc";

interface UserParams {
  id: string;
}

export const useUser = ({ id }: UserParams) => {
  return trpc.user.byId.useQuery({
    id,
  });
};

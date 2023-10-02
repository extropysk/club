import { useSession } from "next-auth/react";
import { trpc } from "utils/trpc";
import AccessDenied from "../components/access-denied";
import Layout from "../components/layout";

export default function ProtectedPage() {
  const { data: session } = useSession();

  const { data: users } = trpc.user.list.useQuery(
    { orderBy: { name: "asc" } },
    {
      enabled: !!session,
    }
  );

  // If no session exists, display access denied message
  if (!session) {
    return (
      <Layout>
        <AccessDenied />
      </Layout>
    );
  }

  // If session exists, display content
  return (
    <Layout>
      <h1>Protected Page</h1>
      <p>{JSON.stringify(users, null, 2)}</p>
    </Layout>
  );
}

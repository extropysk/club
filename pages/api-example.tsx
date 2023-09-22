import { trpc } from "utils/trpc";
import Layout from "../components/layout";

export default function ApiExamplePage() {
  const { data, error, isLoading } = trpc.user.current.useQuery();

  return (
    <Layout>
      <h1>API Example</h1>
      <p>The examples below show responses from the example API endpoints.</p>
      <h2>Session</h2>
      {isLoading && <p>loading...</p>}
      {error && <p>{error.message}</p>}
      <p>{JSON.stringify(data, null, 2)}</p>
    </Layout>
  );
}

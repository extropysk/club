import { SessionProvider } from "next-auth/react";
import "./styles.css";

import type { Session } from "next-auth";
import { ThemeProvider } from "next-themes";
import type { AppProps } from "next/app";
import { trpc } from "utils/trpc";

// Use of the <SessionProvider> is mandatory to allow components that call
// `useSession()` anywhere in your application to access the `session` object.
function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
  return (
    <SessionProvider session={session}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <Component {...pageProps} />
      </ThemeProvider>
    </SessionProvider>
  );
}

export default trpc.withTRPC(App);

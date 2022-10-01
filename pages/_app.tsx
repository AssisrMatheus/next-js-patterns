import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useApollo } from "../lib/apollo";
import { ApolloProvider } from "@apollo/client";
import { SessionProvider, SessionProviderProps } from "next-auth/react";

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: SessionProviderProps["session"] }>) {
  const client = useApollo(pageProps);

  return (
    <SessionProvider session={session}>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </SessionProvider>
  );
}

export default MyApp;

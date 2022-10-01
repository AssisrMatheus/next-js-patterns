import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useApollo } from "../lib/apollo";
import { ApolloProvider } from "@apollo/client";
import { SessionProvider, SessionProviderProps } from "next-auth/react";
import Navbar from "../components/Navbar";

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: SessionProviderProps["session"] }>) {
  const client = useApollo(pageProps);

  return (
    <SessionProvider session={session}>
      <ApolloProvider client={client}>
        <Navbar />
        <Component {...pageProps} />
      </ApolloProvider>
    </SessionProvider>
  );
}

export default MyApp;

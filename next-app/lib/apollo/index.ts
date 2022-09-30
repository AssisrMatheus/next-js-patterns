import { useMemo } from "react";
import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";
import merge from "deepmerge";

export const APOLLO_STATE_PROP_NAME = "__APOLLO_STATE__";

export type WithApolloProps<T> = T & {
  // Rehydration
  [APOLLO_STATE_PROP_NAME]: NormalizedCacheObject;
};

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined;

function createIsomorphLink() {
  // if (typeof window === "undefined") {
  //   const { SchemaLink } = require("@apollo/client/link/schema");
  //   try {
  //     const { schema } = require("../../generated/schema");
  //     if (schema) {
  //       return new SchemaLink({ schema });
  //     }
  //   } catch (e) {
  //     console.warn(e);
  //   }
  // }

  const { HttpLink } = require("@apollo/client/link/http");
  return new HttpLink({
    uri: "/api/graphql", // This is fixed since it comes from next.js api now
    credentials: "same-origin",
  });
}

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: createIsomorphLink(),
    cache: new InMemoryCache(),
  });
}

export function initializeApollo(
  initialState: NormalizedCacheObject | null = null
) {
  const _apolloClient = apolloClient ?? createApolloClient();

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();

    // Merge the existing cache into data passed from getStaticProps/getServerSideProps
    const data = merge(initialState, existingCache);

    // Restore the cache with the merged data
    _apolloClient.cache.restore(data);
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === "undefined") return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export const addApolloState = <TPageProps extends { props?: TProps }, TProps>(
  client: ApolloClient<NormalizedCacheObject>,
  pageProps: TPageProps
): TPageProps & { props: WithApolloProps<TProps> } => ({
  ...pageProps,
  props: {
    ...pageProps?.props,
    [APOLLO_STATE_PROP_NAME]: client.cache.extract(),
  },
});

export const useApollo = <T extends Record<string, unknown>>(pageProps: T) => {
  const state = pageProps[APOLLO_STATE_PROP_NAME] as any;
  const store = useMemo(() => initializeApollo(state), [state]);
  return store;
};

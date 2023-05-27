import { ApolloClient, InMemoryCache } from '@apollo/client';

export function getHostOrigin() {
  const gitpodUrl = new URL(process.env.GITPOD_WORKSPACE_URL as string);
  const port = 8080;
  gitpodUrl.hostname = `${port}-${gitpodUrl.hostname}`;
  return gitpodUrl.origin;
}

export function getGraphQLHost() {
  return `${getHostOrigin()}/api/graphql/`;
}

export const client = new ApolloClient({
  uri: getGraphQLHost(),
  cache: new InMemoryCache(),
});

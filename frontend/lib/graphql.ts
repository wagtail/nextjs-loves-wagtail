export function getGraphQLHost() {
  const gitpodUrl = new URL(process.env.GITPOD_WORKSPACE_URL as string);
  const port = 8080;
  const path = '/api/graphql/';
  gitpodUrl.hostname = `${port}-${gitpodUrl.hostname}`;
  gitpodUrl.pathname = path;
  return gitpodUrl.toString();
}

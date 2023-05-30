import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://bakerydemo-thibaudcolas5.herokuapp.com/api/graphql/",
  cache: new InMemoryCache(),
});

export default client;

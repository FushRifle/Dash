import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";


// Create an Apollo Client instance without the authLink for login requests
export const loginClient = new ApolloClient({
  link: new HttpLink({
    uri: "https://prelura.com/graphql/",
    credentials: "same-origin",
    fetchOptions: {
      mode: "no-cors", // Enable no-cors mode
    },
  }),
  cache: new InMemoryCache(),
});

// Create an Apollo Client instance with the authLink for authenticated requests
const httpLink = new HttpLink({
  uri: "https://prelura.com/graphql/",
  credentials: "same-origin",
});

// Add authentication context to Apollo Client using NextAuth's session token
const authLink = setContext(async (_, { headers }) => {
  // const session = await  auth(); // Fetch session from NextAuth
  // const token = session?.token; // Use accessToken from session

  //console.log(token, "Session Token"); // Log token for debugging
  return {
    headers: {
      ...headers,

      "Access-Control-Allow-Origin":  "https://prelura-dashboard.vercel.app",
      "Access-Control-Allow-Methods": "GET, POST, PUT",
      "Access-Control-Allow-Headers": "Content-Type, Authorization"
      //authorization: token ? `Bearer ${token}` : "", // Add token to headers
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;

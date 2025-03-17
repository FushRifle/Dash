import { NextAuthConfig } from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import { gql } from "@apollo/client";
import { User } from "next-auth";
import client from "./apolloClient";
const LOGIN_MUTATION = gql`
  mutation adminLogin($username: String!, $password: String!) {
    adminLogin(username: $username, password: $password) {
      token
      refreshToken
      refreshExpiresIn
      payload
      success
      user {
        username
      }
    }
  }
`;
const authConfig = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
    CredentialProvider({
      credentials: {
        username: {
          type: "text",
          label: "Email",
          placeholder: "your-email@example.com",
        },
        password: { type: "password", label: "Password" },
      },
      async authorize(credentials, req) {
        try {
          const { data } = await client.mutate({
            mutation: LOGIN_MUTATION,
            variables: {
              username: credentials.username,
              password: credentials.password,
            },
          });

          const user = data?.adminLogin?.user;
          const token = data?.adminLogin?.token;

          if (user) {
            return {
              id: user.username,
              username: user.username,
              password: user.password, // Adjust as needed
              token
            } as User;
          } else {
            return null;
          }
        } catch (error) {
          console.error("Error during authentication:", error);
          return null;
        }
      },
    }),
  ],

  pages: {
    signIn: "/login", // Path to your sign-in page
  },

  callbacks: {
    async jwt({ token, user }: any) {
      // Attach user data to the JWT
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.token= user.token
      }
      return token;
    },

    async session({ session, token }: any) {
      session.user = {
        id: token.id,
        username: token.username,
      };
      session.token = token.token; // Include the token
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
} satisfies NextAuthConfig;

export default authConfig;

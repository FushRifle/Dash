import NextAuth, { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  type UserSession = {
    id: number;
    email: string;
    username: string;
    photo_url: string;
  };
  interface Session {
    user: UserSession;
    token: string | undefined;
  }

  interface CredentialsInputs {
    email: string;
    password: string;
  }
}
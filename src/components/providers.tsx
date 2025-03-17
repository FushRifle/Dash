'use client';
import React from 'react';
import { ThemeProvider } from '@/ThemeContext';
import { SessionProvider, SessionProviderProps } from 'next-auth/react';
export default function Providers({
  session,
  children
}: {
  session: SessionProviderProps['session'];
  children: React.ReactNode;
}) {
  return (
    <>
      <ThemeProvider>
        <SessionProvider session={session}>{children}</SessionProvider>
      </ThemeProvider>
    </>
  );
}
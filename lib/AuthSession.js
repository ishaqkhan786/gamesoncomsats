"use client";
import { SessionProvider } from "next-auth/react";
import io from 'socket.io-client'
export const socket = io("http://localhost:5000");

const AuthSessionProvider = ({ children }) => {

  return <SessionProvider>{children}</SessionProvider>;
};

export default AuthSessionProvider;
"use client";

import { createContext, useContext } from "react";
import { useSession } from "@/lib/auth-client";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const { data: session, isPending } = useSession();

  const value = {
    user: session?.user || null,
    loading: isPending,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
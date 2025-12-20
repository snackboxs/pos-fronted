import React, { createContext, useContext, useState, useEffect } from "react";
import { auth } from "@/features/auth/authCheck";
import { useAppSelector } from "@/hooks";

interface AuthContextType {
  role: string | undefined,
  token: string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isAuth = useAppSelector(auth);
  const token = isAuth.token;
  const role = isAuth.user?.role;

  return (
    <AuthContext.Provider value={{ role, token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};

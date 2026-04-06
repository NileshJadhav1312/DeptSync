/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useMemo, useState } from "react";
import { loginAdmin, loginTeacher, loginStudent } from "../services/auth";

const AuthContext = createContext(null);

const STORAGE_KEY = "der.auth";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  });

  function decodeTokenId(token) {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload?.id || null;
    } catch (err) {
      return null;
    }
  }

  const login = async ({ role, email, password }) => {
    const action = role === "admin" ? loginAdmin : role === "teacher" ? loginTeacher : loginStudent;
    const data = await action({ email, password });
    const profile = data?.admin || data?.teacher || data?.student || null;

    const jwtId = data?.token ? decodeTokenId(data.token) : null;
    const payload = {
      ...(profile || {}),
      id: profile?.id || jwtId || null,
      role: profile?.role || role,
      email: profile?.email || email,
      name: profile?.name || "User",
      username: profile?.username || "",
      token: data?.token || null,
    };

    setUser(payload);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    return payload;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  const value = useMemo(() => ({ user, login, logout }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}

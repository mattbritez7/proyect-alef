import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import httpClient from "../utils/httpClient";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    httpClient
      .get("/users/me")
      .then((res) => {
        const stored = localStorage.getItem("user");
        if (stored) {
          setUser(JSON.parse(stored));
        } else {
          setUser({ username: res.data });
        }
      })
      .catch(() => {
        localStorage.removeItem("user");
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  const login = useCallback((userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("user");
    setUser(null);
    httpClient.post("/logout").catch(() => {});
  }, []);

  const value = { user, loading, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import httpClient from "../utils/httpClient";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      httpClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      httpClient
        .get("/users/me")
        .then((res) => setUser(res.data))
        .catch(() => {
          localStorage.removeItem("token");
          delete httpClient.defaults.headers.common["Authorization"];
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = useCallback((token, userData) => {
    localStorage.setItem("token", token);
    httpClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    setUser(userData);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    delete httpClient.defaults.headers.common["Authorization"];
    setUser(null);
  }, []);

  const value = { user, loading, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

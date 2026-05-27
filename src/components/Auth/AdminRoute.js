import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { CircularProgress, Box } from "@mui/material";

export default function AdminRoute({ component: Component, ...rest }) {
  const { user, loading } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) => {
        if (loading) {
          return (
            <Box display="flex" justifyContent="center" mt={10}>
              <CircularProgress />
            </Box>
          );
        }
        return user && user.IsAdmin ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        );
      }}
    />
  );
}

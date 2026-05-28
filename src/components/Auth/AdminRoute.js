import React, { useEffect } from "react";
import { Route, useHistory } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { CircularProgress, Box } from "@mui/material";

export default function AdminRoute({ component: Component, ...rest }) {
  const { user, loading } = useAuth();
  const history = useHistory();

  useEffect(() => {
    if (!loading && !(user && user.IsAdmin)) {
      history.replace("/login");
    }
  }, [loading, user, history]);

  return loading ? (
    <Box display="flex" justifyContent="center" mt={10}>
      <CircularProgress />
    </Box>
  ) : user && user.IsAdmin ? (
    <Route {...rest} render={(props) => <Component {...props} />} />
  ) : null;
}

import * as React from "react";
import { Link } from "react-router-dom";

//mui components

import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

export default function SuccessLogin() {
  return (
    <>
      <Grid
        container
        spacing={2}
        style={{
          width: "100%",
          maxWidth: "380px",
          margin: "0 auto",
          padding: "0 16px",
        }}
      >
        <Grid item xs={12} sx={{ textAlign: "center", mt: { xs: 8, sm: 20 } }}>
          <h1 style={{ margin: "4px 0" }}>Ingreso</h1>
          <h1 style={{ margin: "4px 0" }}>correctamente</h1>
        </Grid>
        <Grid item xs={12} mt={{ xs: 3, sm: 4 }}>
          <Link to="/sales" style={{ textDecoration: "none" }}>
            <Button variant="contained" fullWidth>
              Ir Al Panel
            </Button>
          </Link>
        </Grid>
      </Grid>
    </>
  );
}

import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import httpClient from "../../utils/httpClient";
import Drawer from "./Drawer";

import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const estadoMap = { 1: "Pendiente", 2: "Aprobado", 3: "Entregado" };

export default function SalesCard() {
  const history = useHistory();
  const [sell, setSell] = useState([]);
  const [error, setError] = useState(null);

  useEffect(function fetchTask() {
    httpClient.get("/sales/mis-ventas").then((res) => {
      const data = res.data;
      setSell(data);
    }).catch((err) => {
      const msg = err.response?.data?.message || "Error al cargar ventas";
      setError(msg);
    });
  }, []);

  return (
    <>
      <Drawer />
      <Box sx={{ width: 1, px: { xs: 1, sm: 0 } }} display="grid">
        <Grid container rowSpacing={{ xs: 0.5, sm: 1 }} columnSpacing={{ xs: 1, sm: 3 }}>
          {sell.length === 0 ? (
            <Grid item xs={12}>
              <Box sx={{ textAlign: "center", mt: 4, color: "text.secondary", fontSize: 18 }}>
                Sin ventas
              </Box>
            </Grid>
          ) : (
            sell.map((item, i) => {
            return (
              <Grid item xs={12} sm={12} md={4} key={item._id}>
                <Paper
                  sx={{ p: 2, cursor: "pointer", "&:hover": { opacity: 0.85 } }}
                  onClick={() => history.push(`/my-sales/${item._id}`)}
                >
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      {new Date(parseInt(item._id.substring(0, 8), 16) * 1000).toLocaleDateString("es-AR")}
                    </Typography>
                    <Typography variant="caption" fontWeight="bold">
                      {estadoMap[item.Estado] || "Pendiente"}
                    </Typography>
                  </Box>
                  <Typography variant="body1" fontWeight="bold">
                    {item.Nombre}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.Producto}
                  </Typography>
                </Paper>
              </Grid>
            );
          })
          )}
        </Grid>
      </Box>
      <Snackbar
        open={!!error}
        autoHideDuration={4000}
        onClose={() => setError(null)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="error" onClose={() => setError(null)}>
          {error}
        </Alert>
      </Snackbar>
    </>
  );
}

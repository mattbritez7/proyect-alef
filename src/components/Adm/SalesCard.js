import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import httpClient from "../../utils/httpClient";
import { useAuth } from "../../context/AuthContext";
import AdminDrawer from "./Drawer";

import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const estadoMap = { 1: "Pendiente", 2: "Aprobado", 3: "Entregado" };
const codeMap = { Pendiente: 1, Aprobado: 2, Entregado: 3 };

export default function AdminSalesCard() {
  const history = useHistory();
  const { user } = useAuth();
  const [sell, setSell] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [filter, setFilter] = useState("Todas");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(function fetchTask() {
    httpClient.get("/sales").then((res) => {
      const data = res.data;
      setSell(data);
    }).catch((err) => {
      const msg = err.response?.data?.message || "Error al cargar ventas";
      setError(msg);
    });
  }, []);

  useEffect(() => {
    httpClient.get("/companies").then((res) => setCompanies(res.data)).catch(() => {});
  }, []);

  const deleteTask = (id) => {
    httpClient
      .delete(`/sales/${id}`)
      .then(() => {
        setSuccess("Venta eliminada");
        httpClient.get("/sales").then((res) => {
          setSell(res.data);
        });
      })
      .catch((err) => {
        const msg = err.response?.data?.message || "Error al eliminar venta";
        setError(msg);
      });
  };

  const editTask = (id, name) => {
    httpClient
      .put(`/sales/${id}`, {
        Estado: codeMap[name],
      })
      .then(() => {
        httpClient.get("/sales").then((res) => {
          setSell(res.data);
        });
      })
      .catch((err) => {
        const msg = err.response?.data?.message || "Error al actualizar venta";
        setError(msg);
      });
  };

  const editCompany = (id, companyId) => {
    const company = companies.find((c) => c._id === companyId);
    httpClient
      .put(`/sales/${id}`, { Company: company?.name || "" })
      .then(() => {
        httpClient.get("/sales").then((res) => setSell(res.data));
      })
      .catch((err) => {
        const msg = err.response?.data?.message || "Error al asignar empresa";
        setError(msg);
      });
  };

  return (
    <>
      <AdminDrawer />

      <Box sx={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: { xs: 0.5, sm: 2 }, my: 2, px: 1 }}>
        {["Todas", "Pendiente", "Aprobado", "Entregado"].map((status) => (
          <Box
            key={status}
            onClick={() => setFilter(status)}
            sx={{
              px: { xs: 1.5, sm: 3 },
              py: 0.5,
              borderRadius: 2,
              cursor: "pointer",
              fontWeight: filter === status ? "bold" : "normal",
              bgcolor: filter === status ? "primary.main" : "grey.200",
              color: filter === status ? "white" : "text.primary",
              "&:hover": { opacity: 0.8 },
            }}
          >
            {status}
          </Box>
        ))}
      </Box>

      {(() => {
        const filtered = sell.filter(
          (item) => filter === "Todas" || (estadoMap[item.Estado] || "Pendiente") === filter
        );
        return (
          <Box sx={{ width: 1, px: { xs: 1, sm: 0 } }} display="grid">
            <Grid container rowSpacing={{ xs: 0.5, sm: 1 }} columnSpacing={{ xs: 1, sm: 3 }}>
              {filtered.length === 0 ? (
                <Grid item xs={12}>
                  <Box
                    sx={{
                      textAlign: "center",
                      mt: 4,
                      color: "text.secondary",
                      fontSize: 18,
                    }}
                  >
                    Sin ventas
                  </Box>
                </Grid>
              ) : (
                filtered.map((item, i) => {
            return (
              <Grid item xs={12} sm={12} md={4} key={item._id}>
                <Paper
                  sx={{ p: 2, cursor: "pointer", "&:hover": { opacity: 0.85 } }}
                  onClick={() => history.push(`/sales/${item._id}`)}
                >
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      {new Date(parseInt(item._id.substring(0, 8), 16) * 1000).toLocaleDateString("es-AR")}
                    </Typography>
                    {user?.role === 'administrador' ? (
                      <Box sx={{ display: "flex", gap: 0.5 }}>
                        <Select
                          size="small"
                          value={estadoMap[item.Estado] || "Pendiente"}
                          name="Estado"
                          sx={{ fontSize: 12, height: 30 }}
                          onClick={(e) => e.stopPropagation()}
                          onChange={(e) => editTask(item._id, e.target.value)}
                        >
                          {["Pendiente", "Aprobado", "Entregado"].map((s) => (
                            <MenuItem key={s} value={s}>{s}</MenuItem>
                          ))}
                        </Select>
                        <Select
                          size="small"
                          value={item.Company || ""}
                          name="Company"
                          sx={{ fontSize: 12, height: 30, minWidth: 100 }}
                          onClick={(e) => e.stopPropagation()}
                          onChange={(e) => editCompany(item._id, e.target.value)}
                          displayEmpty
                          renderValue={(v) => v || "Empresa"}
                        >
                          <MenuItem value=""><em>Sin empresa</em></MenuItem>
                          {companies.map((c) => (
                            <MenuItem key={c._id} value={c._id}>{c.name}</MenuItem>
                          ))}
                        </Select>
                        <IconButton size="small" onClick={(e) => { e.stopPropagation(); deleteTask(item._id); }}>
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    ) : user?.role === 'cliente' ? (
                      <Select
                        size="small"
                        value={estadoMap[item.Estado] || "Pendiente"}
                        name="Estado"
                        sx={{ fontSize: 12, height: 30 }}
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) => editTask(item._id, e.target.value)}
                      >
                        {["Pendiente", "Aprobado", "Entregado"].map((s) => (
                          <MenuItem key={s} value={s}>{s}</MenuItem>
                        ))}
                      </Select>
                    ) : (
                      <Typography variant="caption" fontWeight="bold">
                        {estadoMap[item.Estado] || "Pendiente"}
                      </Typography>
                    )}
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
  );
})()}
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
      <Snackbar
        open={!!success}
        autoHideDuration={3000}
        onClose={() => setSuccess(null)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="success" onClose={() => setSuccess(null)}>
          {success}
        </Alert>
      </Snackbar>
    </>
  );
}

import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import httpClient from "../utils/httpClient";
import { useAuth } from "../context/AuthContext";
import AdminDrawer from "./Adm/Drawer";
import VenDrawer from "./Ven/Drawer";

import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const estadoMap = { 1: "Pendiente", 2: "Aprobado", 3: "Entregado", 4: "Desaprobado" };
const codeMap = { Pendiente: 1, Aprobado: 2, Entregado: 3, Desaprobado: 4 };

export default function SalesList() {
  const history = useHistory();
  const { user } = useAuth();
  const role = user?.role;

  const [sell, setSell] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [filter, setFilter] = useState("Todas");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleteDialog, setDeleteDialog] = useState({ open: false, id: null });
  const [statusDialog, setStatusDialog] = useState({ open: false, id: null, status: "" });

  const fetchSales = () => {
    const endpoint = role === 'administrador' ? "/sales" : "/sales";
    httpClient
      .get(endpoint)
      .then((res) => {
        setSell(res.data);
      })
      .catch((err) => {
        const msg = err.response?.data?.message || "Error al cargar ventas";
        setError(msg);
      })
      .finally(() => setLoading(false));
  };

  useEffect(fetchSales, [role]);

  useEffect(() => {
    httpClient.get("/companies").then((res) => setCompanies(res.data)).catch(() => {});
  }, []);

  const deleteTask = (id) => {
    httpClient
      .delete(`/sales/${id}`)
      .then(() => {
        setSuccess("Venta eliminada");
        fetchSales();
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
      .then(fetchSales)
      .catch((err) => {
        const msg = err.response?.data?.message || "Error al actualizar venta";
        setError(msg);
      });
  };

  const editCompany = (id, companyId) => {
    const company = companies.find((c) => c._id === companyId);
    httpClient
      .put(`/sales/${id}`, { Company: company?.name || "" })
      .then(fetchSales)
      .catch((err) => {
        const msg = err.response?.data?.message || "Error al asignar empresa";
        setError(msg);
      });
  };

  const confirmDelete = () => {
    deleteTask(deleteDialog.id);
    setDeleteDialog({ open: false, id: null });
  };

  const confirmStatus = () => {
    editTask(statusDialog.id, statusDialog.status);
    setStatusDialog({ open: false, id: null, status: "" });
  };

  const displayed = sell.filter(
    (item) => filter === "Todas" || (estadoMap[item.Estado] || "Pendiente") === filter
  );

  return (
    <>
      {role === 'administrador' ? <AdminDrawer /> : <VenDrawer />}

      <Box sx={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: { xs: 0.5, sm: 2 }, my: 2, px: 1 }}>
        {["Todas", "Pendiente", "Aprobado", "Entregado", "Desaprobado"].map((status) => (
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

      <Box sx={{ width: 1, px: { xs: 1, sm: 0 } }} display="grid">
        <Grid container rowSpacing={{ xs: 0.5, sm: 1 }} columnSpacing={{ xs: 1, sm: 3 }}>
          {!loading && displayed.length === 0 ? (
            <Grid item xs={12}>
              <Box sx={{ textAlign: "center", mt: 4, color: "text.secondary", fontSize: 18 }}>
                Sin ventas
              </Box>
            </Grid>
          ) : (
            displayed.map((item) => (
              <Grid item xs={12} sm={12} md={4} key={item._id}>
                <Paper
                  sx={{ p: 2, cursor: "pointer", "&:hover": { opacity: 0.85 } }}
                  onClick={() => history.push(`/${role === 'administrador' ? "sales" : "my-sales"}/${item._id}`)}
                >
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      {new Date(parseInt(item._id.substring(0, 8), 16) * 1000).toLocaleDateString("es-AR")}
                    </Typography>
                    {role === 'administrador' ? (
                      <Box sx={{ display: "flex", gap: 0.5 }}>
                        <Select
                          size="small"
                          value={estadoMap[item.Estado] || "Pendiente"}
                          name="Estado"
                          sx={{ fontSize: 12, height: 30 }}
                          onClick={(e) => e.stopPropagation()}
                          onChange={(e) => setStatusDialog({ open: true, id: item._id, status: e.target.value })}
                        >
                          {["Pendiente", "Aprobado", "Entregado", "Desaprobado"].map((s) => (
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
                        <IconButton size="small" onClick={(e) => { e.stopPropagation(); setDeleteDialog({ open: true, id: item._id }); }}>
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    ) : role === 'cliente' ? (
                      <Select
                        size="small"
                        value={estadoMap[item.Estado] || "Pendiente"}
                        name="Estado"
                        sx={{ fontSize: 12, height: 30 }}
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) => setStatusDialog({ open: true, id: item._id, status: e.target.value })}
                      >
                        {["Pendiente", "Aprobado", "Entregado", "Desaprobado"].map((s) => (
                          <MenuItem key={s} value={s}>{s}</MenuItem>
                        ))}
                      </Select>
                    ) : (
                      <Typography variant="caption" fontWeight="bold">
                        {estadoMap[item.Estado] || "Pendiente"}
                      </Typography>
                    )}
                  </Box>
                  <Typography variant="body1" sx={{ fontWeight: "bold", lineHeight: 1.8 }}>
                    Cliente: {item.Nombre}
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: "bold", lineHeight: 1.8 }}>
                    Producto: {item.Producto}
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: "bold", lineHeight: 1.8 }}>
                    Vendedor: {item.user}
                  </Typography>
                </Paper>
              </Grid>
            ))
          )}
        </Grid>
      </Box>

      <Dialog open={statusDialog.open} onClose={() => setStatusDialog({ open: false, id: null, status: "" })}>
        <DialogTitle>Confirmar cambio de estado</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Estás seguro de que deseas cambiar el estado de esta venta a "{statusDialog.status}"?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setStatusDialog({ open: false, id: null, status: "" })}>Cancelar</Button>
          <Button onClick={confirmStatus} color="primary" variant="contained">Confirmar</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={deleteDialog.open} onClose={() => setDeleteDialog({ open: false, id: null })}>
        <DialogTitle>Confirmar eliminación</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Estás seguro de que deseas eliminar esta venta? Esta acción no se puede deshacer.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog({ open: false, id: null })}>Cancelar</Button>
          <Button onClick={confirmDelete} color="error" variant="contained">Eliminar</Button>
        </DialogActions>
      </Dialog>
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

import React, { useEffect, useState } from "react";
import httpClient from "../../utils/httpClient";
import AdminDrawer from "./Drawer";

import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

export default function CompanyList() {
  const [companies, setCompanies] = useState([]);
  const [newCompany, setNewCompany] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    loadCompanies();
  }, []);

  const loadCompanies = () => {
    httpClient
      .get("/companies")
      .then((res) => setCompanies(res.data))
      .catch(() => setError("Error al cargar empresas"));
  };

  const handleAdd = () => {
    if (!newCompany.trim()) {
      setError("Escribí un nombre de empresa");
      return;
    }
    setSuccess(null);
    setError(null);
    httpClient
      .post("/companies", { name: newCompany.trim() })
      .then(() => {
        setNewCompany("");
        setSuccess("Empresa creada");
        loadCompanies();
      })
      .catch((err) => {
        const msg = err.response?.data?.message || "Error al crear empresa";
        setError(msg);
      });
  };

  const handleDelete = (id) => {
    httpClient
      .delete(`/companies/${id}`)
      .then(() => {
        setSuccess("Empresa eliminada");
        loadCompanies();
      })
      .catch((err) => {
        const msg = err.response?.data?.message || "Error al eliminar empresa";
        setError(msg);
      });
  };

  return (
    <>
      <AdminDrawer />
      <Box sx={{ width: 1, maxWidth: 600, mx: "auto", mt: { xs: 1, sm: 4 }, px: { xs: 1, sm: 2 } }}>
        <Typography variant="h6" sx={{ mb: 2, fontSize: { xs: 16, sm: 20 } }}>Empresas</Typography>

        <Box sx={{ display: "flex", gap: 1, mb: 3, flexDirection: { xs: "column", sm: "row" } }}>
          <TextField
            label="Nombre de empresa"
            value={newCompany}
            onChange={(e) => setNewCompany(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
            size="small"
            sx={{ flexGrow: 1 }}
          />
          <Button variant="contained" onClick={handleAdd}>
            Crear empresa
          </Button>
        </Box>

        {companies.length === 0 ? (
          <Typography sx={{ textAlign: "center", color: "text.secondary" }}>
            No hay empresas
          </Typography>
        ) : (
          companies.map((company) => (
            <Paper key={company._id} sx={{ p: 2, mb: 1, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <Typography>{company.name}</Typography>
              <IconButton color="error" size="small" onClick={() => handleDelete(company._id)}>
                <DeleteIcon />
              </IconButton>
            </Paper>
          ))
        )}
      </Box>

      <Snackbar key={error || 'e'} open={!!error} autoHideDuration={4000} onClose={() => setError(null)} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
        <Alert severity="error" onClose={() => setError(null)}>{error}</Alert>
      </Snackbar>
      <Snackbar key={success || 's'} open={!!success} autoHideDuration={4000} onClose={() => setSuccess(null)} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
        <Alert severity="success" onClose={() => setSuccess(null)}>{success}</Alert>
      </Snackbar>
    </>
  );
}
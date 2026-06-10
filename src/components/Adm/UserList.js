import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import httpClient from "../../utils/httpClient";
import AdminDrawer from "./Drawer";

import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import DeleteIcon from "@mui/icons-material/Delete";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";

export default function UserList() {
  const history = useHistory();
  const [users, setUsers] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [editUser, setEditUser] = useState(null);
  const [newPassword, setNewPassword] = useState("");
  const [editRole, setEditRole] = useState("");
  const [editCompany, setEditCompany] = useState("");
  const [deleteDialog, setDeleteDialog] = useState({ open: false, id: null });
  const [showPassword, setShowPassword] = useState(false);

  const fetchUsers = () => {
    httpClient
      .get("/users")
      .then((res) => setUsers(res.data))
      .catch((err) => {
        const msg = err.response?.data?.message || "Error al cargar usuarios";
        setError(msg);
      });
  };

  useEffect(() => {
    fetchUsers();
    httpClient.get("/companies").then((res) => setCompanies(res.data)).catch(() => {});
  }, []);

  const handleEdit = (user) => {
    setEditUser(user);
    setNewPassword("");
    setEditRole(user.role || "vendedor");
    setEditCompany(user.Company || "");
  };

  const deleteUser = (id) => {
    httpClient
      .delete(`/users/${id}`)
      .then(() => {
        setSuccess("Usuario eliminado");
        fetchUsers();
      })
      .catch((err) => {
        const msg = err.response?.data?.message || "Error al eliminar usuario";
        setError(msg);
      });
  };

  const confirmDelete = () => {
    deleteUser(deleteDialog.id);
    setDeleteDialog({ open: false, id: null });
  };

  const handleSave = () => {
    const update = {};
    if (newPassword) {
      if (newPassword.length < 6) {
        setError("La contraseña debe tener al menos 6 caracteres");
        return;
      }
      update.Password = newPassword;
    }
    if (editRole) update.role = editRole;
    update.Company = editCompany;
    httpClient
      .put(`/users/${editUser._id}`, update)
      .then(() => {
        setSuccess("Usuario actualizado");
        setEditUser(null);
        setNewPassword("");
        fetchUsers();
      })
      .catch((err) => {
        const msg = err.response?.data?.message || "Error al actualizar usuario";
        setError(msg);
      });
  };

  return (
    <>
      <AdminDrawer />
      <Box sx={{ width: 1, maxWidth: 600, mx: "auto", mt: { xs: 1, sm: 4 }, px: { xs: 1, sm: 0 } }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
          <Typography variant="h6" sx={{ fontSize: { xs: 16, sm: 20 } }}>Usuarios</Typography>
          <Button variant="contained" onClick={() => history.push("/new-user")}>
            Crear Usuario
          </Button>
        </Box>
        <Grid container spacing={2}>
          {users.length === 0 ? (
            <Grid item xs={12}>
              <Typography sx={{ textAlign: "center", color: "text.secondary", mt: 2 }}>
                No hay usuarios
              </Typography>
            </Grid>
          ) : (
            users.map((user) => (
              <Grid item xs={12} key={user._id}>
                <Paper sx={{ p: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Box>
                    <Typography variant="body1" fontWeight="bold">
                      {user.username}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {user.Email}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {user.IsAdmin ? "Administrador" : user.role === 'administrador' ? "Administrador" : user.role === 'vendedor' ? "Vendedor" : "Cliente"}
                    </Typography>
                    {user.role === 'cliente' && user.Company && (
                      <Typography variant="caption" display="block" color="info.main">
                        Empresa: {user.Company}
                      </Typography>
                    )}
                  </Box>
                  <Box sx={{ display: "flex", gap: 0.5 }}>
                    <Button size="small" variant="outlined" onClick={() => handleEdit(user)}>
                      Editar
                    </Button>
                    <IconButton size="small" color="error" onClick={() => setDeleteDialog({ open: true, id: user._id })}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Paper>
              </Grid>
            ))
          )}
        </Grid>
      </Box>

      <Dialog open={!!editUser} onClose={() => setEditUser(null)} maxWidth="sm" fullWidth>
        <DialogTitle>
          Editar usuario — {editUser?.username}
        </DialogTitle>
        <DialogContent>
          <FormControl variant="outlined" size="small" fullWidth sx={{ mt: 1, mb: 2 }}>
            <InputLabel id="edit-role-label">Rol</InputLabel>
            <Select
              labelId="edit-role-label"
              value={editRole}
              onChange={(e) => setEditRole(e.target.value)}
              label="Rol"
            >
              <MenuItem value="administrador">Administrador</MenuItem>
              <MenuItem value="vendedor">Vendedor</MenuItem>
              <MenuItem value="cliente">Cliente</MenuItem>
            </Select>
          </FormControl>
          <FormControl variant="outlined" size="small" fullWidth sx={{ mb: 2 }}>
            <InputLabel id="edit-company-label">Empresa</InputLabel>
            <Select
              labelId="edit-company-label"
              value={editCompany}
              onChange={(e) => setEditCompany(e.target.value)}
              label="Empresa"
            >
              <MenuItem value=""><em>Sin empresa</em></MenuItem>
              {companies.map((c) => (
                <MenuItem key={c._id} value={c.name}>{c.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            margin="dense"
            label="Nueva contraseña (dejar vacío para no cambiar)"
            type={showPassword ? "text" : "password"}
            fullWidth
            variant="outlined"
            size="small"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword((s) => !s)} edge="end" size="small">
                    {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditUser(null)}>Cancelar</Button>
          <Button variant="contained" onClick={handleSave}>Guardar</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={deleteDialog.open} onClose={() => setDeleteDialog({ open: false, id: null })}>
        <DialogTitle>Confirmar eliminación</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Estás seguro de que deseas eliminar este usuario? Esta acción no se puede deshacer.
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

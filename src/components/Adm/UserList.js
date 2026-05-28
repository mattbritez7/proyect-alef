import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import httpClient from "../../utils/httpClient";
import AdminDrawer from "./Drawer";

import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function UserList() {
  const history = useHistory();
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [editUser, setEditUser] = useState(null);
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    httpClient
      .get("/users")
      .then((res) => setUsers(res.data))
      .catch((err) => {
        const msg = err.response?.data?.message || "Error al cargar usuarios";
        setError(msg);
      });
  }, []);

  const handleEdit = (user) => {
    setEditUser(user);
    setNewPassword("");
  };

  const handleSave = () => {
    if (!newPassword || newPassword.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }
    httpClient
      .put(`/users/${editUser._id}`, { Password: newPassword })
      .then(() => {
        setEditUser(null);
        setNewPassword("");
      })
      .catch((err) => {
        const msg = err.response?.data?.message || "Error al actualizar contraseña";
        setError(msg);
      });
  };

  return (
    <>
      <AdminDrawer />
      <Box sx={{ width: 1, maxWidth: 600, mx: "auto", mt: 4 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
          <Typography variant="h6">Usuarios</Typography>
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
                    <Typography variant="caption" color={user.IsAdmin ? "primary" : "text.secondary"}>
                      {user.IsAdmin ? "Administrador" : "Vendedor"}
                    </Typography>
                  </Box>
                  <Button size="small" variant="outlined" onClick={() => handleEdit(user)}>
                    Cambiar Contraseña
                  </Button>
                </Paper>
              </Grid>
            ))
          )}
        </Grid>
      </Box>

      <Dialog open={!!editUser} onClose={() => setEditUser(null)}>
        <DialogTitle>
          Cambiar contraseña — {editUser?.username}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Nueva contraseña"
            type="password"
            fullWidth
            variant="outlined"
            size="small"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditUser(null)}>Cancelar</Button>
          <Button variant="contained" onClick={handleSave}>Guardar</Button>
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
    </>
  );
}

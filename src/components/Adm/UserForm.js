import * as React from "react";
import { useState } from "react";
import httpClient from "../../utils/httpClient";
import AdminDrawer from "./Drawer";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";

export default function AdminUserForm() {
  const [data, setData] = useState({
    username: "",
    Email: "",
    Password: "",
    IsAdmin: false,
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    httpClient
      .post("/users/register", {
        username: data.username,
        Email: data.Email,
        Password: data.Password,
        IsAdmin: data.IsAdmin,
      })
      .then(() => {
        setSuccess(true);
        setData({ username: "", Email: "", Password: "", IsAdmin: false });
      })
      .catch((err) => {
        const msg = err.response?.data?.message || "Error al crear usuario";
        setError(msg);
      });
  };

  return (
    <div>
      <AdminDrawer />
      <Box
        component="form"
        sx={{ "& > :not(style)": { width: "100%", maxWidth: 380, mx: "auto", px: 2 } }}
        noValidate
        autoComplete="off"
      >
        <Grid
          container
          spacing={{ xs: 0.5, sm: 2 }}
          style={{
            width: "100%",
            maxWidth: "380px",
            margin: "0 auto",
            padding: "8px 0 20px",
          }}
        >
          <Grid item xs={12}>
            <FormControl variant="standard" fullWidth>
              <Grid item xs={12} mb={{ xs: 1, sm: 1.5 }}>
                <TextField
                  label="Nombre y Apellido"
                  name="username"
                  variant="outlined"
                  fullWidth
                  size="small"
                  value={data.username}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12} mb={{ xs: 1, sm: 1.5 }}>
                <TextField
                  label="Email"
                  name="Email"
                  type="email"
                  variant="outlined"
                  fullWidth
                  size="small"
                  value={data.Email}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12} mb={{ xs: 1, sm: 1.5 }}>
                <TextField
                  label="Contraseña"
                  name="Password"
                  type="password"
                  variant="outlined"
                  fullWidth
                  size="small"
                  value={data.Password}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <FormControl variant="outlined" sx={{ mb: 2 }} size="small" fullWidth>
                <InputLabel id="role-label">Rol</InputLabel>
                <Select
                  labelId="role-label"
                  name="IsAdmin"
                  value={data.IsAdmin}
                  onChange={handleInputChange}
                  label="Rol"
                >
                  <MenuItem value={false}>Vendedor/a</MenuItem>
                  <MenuItem value={true}>Administrador/a</MenuItem>
                </Select>
              </FormControl>
              <Grid item xs={12} mt="20px">
                <Button variant="contained" fullWidth onClick={onSubmit}>
                  Crear Usuario
                </Button>
              </Grid>
              {success && (
                <Grid item xs={12} mt="20px">
                  <Alert severity="success">Usuario creado correctamente</Alert>
                </Grid>
              )}
            </FormControl>
          </Grid>
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
    </div>
  );
}

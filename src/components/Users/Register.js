import * as React from "react";
import { useState } from "react";
import Image from "../../images/image1.jpg";
import httpClient from "../../utils/httpClient";
import SuccessRegister from "./SuccessRegister";

//mui components

import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function Register() {
  const [isRegistered, setIsRegistered] = useState(false);
  const [error, setError] = useState(null);

  const [data, setData] = useState({
    username: "",
    Password: "",
    Email: "",
    IsAdmin: true,
  });

  const handleInputChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setError(null);
    httpClient
      .post("/users/register", {
        username: data.username,
        Email: data.Email,
        Password: data.Password,
        IsAdmin: data.IsAdmin,
      })
      .then(() => setIsRegistered(true))
      .catch((err) => {
        const msg = err.response?.data?.message || "Error al registrarse";
        setError(msg);
      });
  };

  if (isRegistered) {
    return <SuccessRegister />;
  }
  return (
    <div>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { width: "100%", maxWidth: 380, mx: "auto" },
        }}
        noValidate
        autoComplete="off"
      >
        <Grid
          container
          spacing={2}
          style={{
            width: "100%",
            maxWidth: "380px",
            margin: "0 auto",
            padding: "0 16px 20px",
          }}
        >
          <Grid item xs={12}>
            <Box sx={{ textAlign: "center", mt: { xs: 2, sm: 4 } }}>
              <img
                src={Image}
                alt="logo"
                style={{
                  width: "100%",
                  maxWidth: 355,
                  height: "auto",
                  borderRadius: "5px",
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <FormControl variant="standard" fullWidth>
              <Grid item xs={12} mb={{ xs: 1, sm: 1.5 }}>
                <TextField
                  label="Nombre y Apellido"
                  type="name"
                  name="username"
                  id="Job_Name2"
                  demo-helper-text-misaligned
                  variant="outlined"
                  fullWidth
                  size="small"
                  onChange={handleInputChange}
                />
              </Grid>

              <Grid item xs={12} mb={{ xs: 1, sm: 1.5 }}>
                <TextField
                  label="Tu Email"
                  name="Email"
                  id="Job_Name"
                  variant="outlined"
                  fullWidth
                  size="small"
                  onChange={handleInputChange}
                />
              </Grid>

              <Grid item xs={12} mb={{ xs: 1, sm: 1.5 }}>
                <TextField
                  standard-adornment-password
                  label="Contraseña"
                  type="password"
                  id="Job_Name3"
                  name="Password"
                  variant="outlined"
                  fullWidth
                  mb="10px"
                  size="small"
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} mb={{ xs: 1, sm: 1.5 }}>
                <TextField
                  label="Repetir Contraseña"
                  type="password"
                  variant="outlined"
                  fullWidth
                  id="fullWidth"
                  size="small"
                />
              </Grid>
              <FormControl variant="filled" sx={{ mt: 2.5 }}>
                <Grid item xs={12}>
                  <InputLabel
                    id="demo-simple-select-autowidth-label"
                    size="small"
                    name="IsAdmin"
                    fullWidth
                  >
                    Tipo de cuenta
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    onChange={handleInputChange}
                    fullWidth
                    label="tipo de cuenta"
                    name="IsAdmin"
                    defaultValue=""
                  >
                    <MenuItem value={false}>Vendedor/a</MenuItem>
                    <MenuItem value={true}>Administrador/a</MenuItem>
                  </Select>
                </Grid>
              </FormControl>

              <Grid item xs={12} mt={{ xs: 2, sm: 3 }}>
                <Button variant="contained" fullWidth onClick={onSubmit}>
                  Crear Cuenta
                </Button>
              </Grid>
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

import * as React from "react";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import httpClient from "../../utils/httpClient";
import { useAuth } from "../../context/AuthContext";
import AdminDrawer from "../Adm/Drawer";
import VenDrawer from "./Drawer";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const initialData = {
  Estado: "",
  Nombre: "",
  Producto: "",
  Precio: "",
  ValorCuota: "",
  Dias: "",
  Modalidad: "",
  Dni: "",
  FechaDeNacimiento: "",
  DireccionDelComercio: "",
  EntreCalles: "",
  DireccionCasa: "",
  Localidad: "",
  Telefono1: "",
  Telefono2: "",
};

const SaleForm = () => {
  const [newSale, setNewSale] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [error, setError] = useState(null);
  const history = useHistory();
  const { user } = useAuth();
  const [data, setData] = useState(initialData);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (user?.role === 'cliente') {
      history.replace("/my-sales");
    }
  }, [user, history]);

  useEffect(() => {
    if (newSale) {
      setCountdown(3);
      const interval = setInterval(() => setCountdown((p) => p - 1), 1000);
      const timer = setTimeout(() => history.push("/my-sales"), 3000);
      return () => { clearTimeout(timer); clearInterval(interval); };
    }
  }, [newSale, history]);

  const validate = () => {
    const errs = {};
    if (!data.Nombre || data.Nombre.trim().length < 2) errs.Nombre = "Mínimo 2 caracteres";
    if (!data.Producto) errs.Producto = "Campo obligatorio";
    if (!data.Precio || isNaN(Number(data.Precio)) || Number(data.Precio) <= 0)
      errs.Precio = "Debe ser un número positivo";
    if (!data.Dias || isNaN(Number(data.Dias)) || Number(data.Dias) <= 0) errs.Dias = "Debe ser un número positivo";
    if (!data.Modalidad) errs.Modalidad = "Campo obligatorio";
    if (!data.Dni || !/^\d{7,8}$/.test(data.Dni)) errs.Dni = "Debe tener 7 u 8 dígitos";
    if (!data.FechaDeNacimiento) errs.FechaDeNacimiento = "Campo obligatorio";
    if (!data.DireccionDelComercio) errs.DireccionDelComercio = "Campo obligatorio";
    if (!data.EntreCalles) errs.EntreCalles = "Campo obligatorio";
    if (!data.DireccionCasa) errs.DireccionCasa = "Campo obligatorio";
    if (!data.Localidad) errs.Localidad = "Campo obligatorio";
    if (!data.Telefono1 || !/^\d{7,}$/.test(data.Telefono1)) errs.Telefono1 = "Debe tener al menos 7 dígitos";
    if (data.Telefono2 && !/^\d{7,}$/.test(data.Telefono2)) errs.Telefono2 = "Debe tener al menos 7 dígitos";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    httpClient
      .post("/sales", {
        Estado: data.Estado,
        Nombre: data.Nombre,
        Producto: data.Producto,
        Precio: Number(data.Precio),
        ValorCuota: Number(data.ValorCuota),
        Dias: data.Dias,
        Modalidad: data.Modalidad,
        Dni: data.Dni,
        FechaDeNacimiento: data.FechaDeNacimiento,
        DireccionDelComercio: data.DireccionDelComercio,
        EntreCalles: data.EntreCalles,
        DireccionCasa: data.DireccionCasa,
        Localidad: data.Localidad,
        Telefono1: data.Telefono1,
        Telefono2: data.Telefono2,
      })
      .then(() => setNewSale(true))
      .catch((err) => {
        const msg = err.detailedMessage ||
          err.response?.data?.msg ||
          err.response?.data?.message ||
          "Error al ingresar venta";
        setError(msg);
      });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: null });
  };

  if (newSale) {
    return (
      <>
        {user?.role === 'administrador' ? <AdminDrawer /> : <VenDrawer />}
        <Box sx={{ textAlign: "center", mt: 10 }}>
          <Alert severity="success" sx={{ maxWidth: 380, mx: "auto" }}>
            Venta cargada correctamente — redirigiendo en {countdown}s
          </Alert>
        </Box>
      </>
    );
  }

  return (
    <div>
      {user?.role === 'administrador' ? <AdminDrawer /> : <VenDrawer />}
      <Box
        component="form"
        sx={{
          "& > :not(style)": { width: "100%", maxWidth: 380, mx: "auto", px: 2 },
        }}
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
            paddingBottom: "20px",
            paddingTop: "8px",
          }}
        >
          <Grid item xs={12}>
            <FormControl variant="standard" fullWidth>
              <Grid item xs={12} mb={{ xs: 1, sm: 2.5 }}>
                <TextField
                  label="Nombre y Apellido"
                  name="Nombre"
                  variant="outlined"
                  fullWidth
                  id="fullWidth"
                  size="small"
                  onChange={handleInputChange}
                  error={!!errors.Nombre}
                  helperText={errors.Nombre}
                  required
                />
              </Grid>
              <Grid item xs={12} mb={{ xs: 1, sm: 2.5 }}>
                <TextField
                  label="Producto"
                  name="Producto"
                  variant="outlined"
                  fullWidth
                  id="fullWidth"
                  size="small"
                  onChange={handleInputChange}
                  error={!!errors.Producto}
                  helperText={errors.Producto}
                  required
                />
              </Grid>
              <Grid item xs={12} mb={{ xs: 1, sm: 2.5 }}>
                <FormControl variant="outlined" fullWidth size="small" error={!!errors.Modalidad} required>
                  <InputLabel id="modalidad-label" required>Plan de pago</InputLabel>
                  <Select
                    labelId="modalidad-label"
                    label="Plan de pago"
                    name="Modalidad"
                    value={data.Modalidad}
                    onChange={handleInputChange}
                  >
                    <MenuItem value="diario">Diario</MenuItem>
                    <MenuItem value="semanal">Semanal</MenuItem>
                    <MenuItem value="mensual">Mensual</MenuItem>
                  </Select>
                  {errors.Modalidad && (
                    <Box sx={{ color: "error.main", fontSize: 12, mt: 0.5, ml: 1.5 }}>
                      {errors.Modalidad}
                    </Box>
                  )}
                </FormControl>
              </Grid>
               <Grid item xs={12} mb={{ xs: 1, sm: 2.5 }}>
                <TextField
                  label={data.Modalidad ? `Plan (${data.Modalidad === "diario" ? "Dias" : data.Modalidad === "semanal" ? "Semanal" : "Mensual"})` : "Plan (Dias)"}
                  name="Dias"
                  type="number"
                  variant="outlined"
                  fullWidth
                  id="fullWidth"
                  size="small"
                  onChange={handleInputChange}
                  error={!!errors.Dias}
                  helperText={errors.Dias}
                  required
                />
              </Grid>
              <Grid item xs={12} mb={{ xs: 1, sm: 2.5 }}>
                <TextField
                  label="Precio del plan"
                  name="Precio"
                  type="number"
                  variant="outlined"
                  fullWidth
                  id="fullWidth"
                  size="small"
                  onChange={handleInputChange}
                  error={!!errors.Precio}
                  helperText={errors.Precio}
                  required
                />
              </Grid>
               <Grid item xs={12} mb={{ xs: 1, sm: 2.5 }}>
                <TextField
                  label="Valor cuota"
                  name="ValorCuota"
                  type="number"
                  variant="outlined"
                  fullWidth
                  id="fullWidth"
                  size="small"
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} mb={{ xs: 1, sm: 2.5 }}>
                <TextField
                  label="Dni"
                  name="Dni"
                  type="number"
                  variant="outlined"
                  fullWidth
                  id="fullWidth"
                  size="small"
                  onChange={handleInputChange}
                  error={!!errors.Dni}
                  helperText={errors.Dni}
                  required
                />
              </Grid>
              <Grid item xs={12} mb={{ xs: 1, sm: 2.5 }}>
                <TextField
                  label="Fecha De Nacimiento"
                  name="FechaDeNacimiento"
                  type="date"
                  variant="outlined"
                  fullWidth
                  id="fullWidth"
                  size="small"
                  onChange={handleInputChange}
                  error={!!errors.FechaDeNacimiento}
                  helperText={errors.FechaDeNacimiento}
                  InputLabelProps={{ shrink: true }}
                  required
                />
              </Grid>
              <Grid item xs={12} mb={{ xs: 1, sm: 2.5 }}>
                <TextField
                  label="Direccion Del Comercio"
                  name="DireccionDelComercio"
                  variant="outlined"
                  fullWidth
                  id="fullWidth"
                  size="small"
                  onChange={handleInputChange}
                  error={!!errors.DireccionDelComercio}
                  helperText={errors.DireccionDelComercio}
                  required
                />
              </Grid>

              <Grid item xs={12} mb={{ xs: 1, sm: 2.5 }}>
                <TextField
                  label="Entre Calles"
                  name="EntreCalles"
                  variant="outlined"
                  fullWidth
                  id="fullWidth"
                  size="small"
                  onChange={handleInputChange}
                  error={!!errors.EntreCalles}
                  helperText={errors.EntreCalles}
                  required
                />
              </Grid>
              <Grid item xs={12} mb={{ xs: 1, sm: 2.5 }}>
                <TextField
                  label="Direccion de la casa"
                  name="DireccionCasa"
                  variant="outlined"
                  fullWidth
                  id="fullWidth"
                  size="small"
                  onChange={handleInputChange}
                  error={!!errors.DireccionCasa}
                  helperText={errors.DireccionCasa}
                  required
                />
              </Grid>
              <Grid item xs={12} mb={{ xs: 1, sm: 2.5 }}>
                <TextField
                  label="Localidad"
                  name="Localidad"
                  variant="outlined"
                  fullWidth
                  id="fullWidth"
                  size="small"
                  onChange={handleInputChange}
                  error={!!errors.Localidad}
                  helperText={errors.Localidad}
                  required
                />
              </Grid>
              <Grid item xs={12} mb={{ xs: 1, sm: 2.5 }}>
                <TextField
                  label="Telefono 1"
                  name="Telefono1"
                  type="number"
                  variant="outlined"
                  fullWidth
                  id="fullWidth"
                  size="small"
                  onChange={handleInputChange}
                  error={!!errors.Telefono1}
                  helperText={errors.Telefono1}
                  required
                />
              </Grid>
              <TextField
                label="Telefono 2"
                name="Telefono2"
                type="number"
                variant="outlined"
                fullWidth
                id="fullWidth"
                size="small"
                onChange={handleInputChange}
                error={!!errors.Telefono2}
                helperText={errors.Telefono2}
              />

              <Grid item xs={12} mt="40px">
                <Button
                  variant="contained"
                  type="submit"
                  fullWidth
                  onClick={onSubmit}
                >
                  Ingresar venta
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
};

export default SaleForm;

import * as React from "react";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import httpClient from "../../utils/httpClient";
import Loading from "../Ven/Loading";
import AdminDrawer from "./Drawer";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const AdminSaleForm = () => {
  const [newSale, setNewSale] = useState(false);
  const [error, setError] = useState(null);
  const history = useHistory();

  useEffect(() => {
    if (newSale) {
      const timer = setTimeout(() => history.push("/sales"), 3000);
      return () => clearTimeout(timer);
    }
  }, [newSale, history]);

  const [data, setData] = useState({
    Estado: "",
    Nombre: "",
    Producto: "",
    Precio: "",
    Dias: "",
    Dni: "",
    FechaDeNacimiento: "",
    DireccionDelComercio: "",
    EntreCalles: "",
    DireccionCasa: "",
    Localidad: "",
    Telefono1: "",
    Telefono2: "",
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!data.Nombre || data.Nombre.trim().length < 2) errs.Nombre = "Mínimo 2 caracteres";
    if (!data.Producto) errs.Producto = "Campo obligatorio";
    if (!data.Precio || isNaN(Number(data.Precio)) || Number(data.Precio) <= 0)
      errs.Precio = "Debe ser un número positivo";
    if (!data.Dias || isNaN(Number(data.Dias)) || Number(data.Dias) <= 0) errs.Dias = "Debe ser un número positivo";
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
        Dias: data.Dias,
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
        const msg = err.response?.data?.message || "Error al subir venta";
        setError(msg);
      });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: null });
  };

  if (newSale) {
    return <Loading />;
  }

  return (
    <div>
      <AdminDrawer />
      <Box
        component="form"
        sx={{
          "& > :not(style)": { width: "300px", margin: "0 auto" },
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
            paddingRight: "10px",
            paddingBottom: "20px",
            paddingTop: "0px",
          }}
        >
          <Grid item xs={12} style={{ paddingTop: "0px" }}>
            <FormControl variant="standard" fullWidth>
              <Grid item xs={12} mb="40px">
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
              <Grid item xs={12} mb="40px">
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
              <Grid item xs={12} mb="40px">
                <TextField
                  label="Precio Del Producto"
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
              <Grid item xs={12} mb="40px">
                <TextField
                  label="Plan"
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
              <Grid item xs={12} mb="40px">
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
              <Grid item xs={12} mb="40px">
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
              <Grid item xs={12} mb="40px">
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

              <Grid item xs={12} mb="40px">
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
              <Grid item xs={12} mb="40px">
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
              <Grid item xs={12} mb="40px">
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
              <Grid item xs={12} mb="40px">
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
                  Subir venta
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

export default AdminSaleForm;

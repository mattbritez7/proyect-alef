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

  const onSubmit = (e) => {
    e.preventDefault();
    httpClient
      .post("/sales", {
        Estado: data.Estado,
        Nombre: data.Nombre,
        Producto: data.Producto,
        Precio: data.Precio,
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
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
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
                  required
                />
              </Grid>
              <Grid item xs={12} mb="40px">
                <TextField
                  label="Precio Del Producto"
                  name="Precio"
                  variant="outlined"
                  fullWidth
                  id="fullWidth"
                  size="small"
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12} mb="40px">
                <TextField
                  label="Plan"
                  name="Dias"
                  variant="outlined"
                  fullWidth
                  id="fullWidth"
                  size="small"
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12} mb="40px">
                <TextField
                  label="Dni"
                  name="Dni"
                  variant="outlined"
                  fullWidth
                  id="fullWidth"
                  size="small"
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12} mb="40px">
                <TextField
                  label="Fecha De Nacimiento"
                  name="FechaDeNacimiento"
                  variant="outlined"
                  fullWidth
                  id="fullWidth"
                  size="small"
                  onChange={handleInputChange}
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
                  required
                />
              </Grid>
              <Grid item xs={12} mb="40px">
                <TextField
                  label="Telefono 1"
                  name="Telefono1"
                  variant="outlined"
                  fullWidth
                  id="fullWidth"
                  size="small"
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <TextField
                label="Telefono 2"
                name="Telefono2"
                variant="outlined"
                fullWidth
                id="fullWidth"
                size="small"
                onChange={handleInputChange}
                required
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

import * as React from 'react';
import {useState} from "react";
import httpClient from "../../utils/httpClient";

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

const FormVentas = () => {

  const [data, setData] = useState({
      Nombre: "",
      Dni: "",
      FechaDeNacimiento: "",
      DireccionDelComercio: "",
      EntreCalles: "",
      DireccionCasa: "",
      Localidad: "",
      Telefono1: "",
      Telefono2: ""
  })
  

  const onSubmit = (e) => { 
    e.preventDefault();
    httpClient.post("/tasks", {
      Nombre: data.Nombre,
      Dni: data.Dni,
      FechaDeNacimiento: data.FechaDeNacimiento,
      DireccionDelComercio: data.DireccionDelComercio,
      EntreCalles: data.EntreCalles,
      DireccionCasa: data.DireccionCasa,
      Localidad: data.Localidad,
      Telefono1: data.Telefono1,
      Telefono2: data.Telefono2 
    })
  }

  const handleInputChange = (event) => {
    setData({
      ...data,
      [event.target.name] : event.target.value
    })
  }

  return (
    <div>
        <Box
      component="form"
      sx={{
        '& > :not(style)': {ml: '50px', mt: '30px', width: '300px' },
      }}
      noValidate
      autoComplete="off"
      >
      <Grid
        container
        spacing={2}
        style={{ width: '100%', maxWidth: '380px', margin: '0 auto ', paddingRight:'10px' }}
      >
      <Grid item xs={12}>
        <FormControl variant="standard" fullWidth>
        <Grid item xs={12} mb='40px'>
            <TextField  label="Nombre y Apellido" name="Nombre" variant="outlined" fullWidth id="fullWidth" size="small" onChange={handleInputChange} required />
          </Grid>
          <Grid item xs={12} mb='40px'>
            <TextField  label="Dni" name="Dni"variant="outlined" fullWidth id="fullWidth" size="small" onChange={handleInputChange} required/>
          </Grid>
          <Grid item xs={12} mb='40px'>
            <TextField  label="Fecha De Nacimiento" name="FechaDeNacimiento" variant="outlined" fullWidth id="fullWidth" size="small" onChange={handleInputChange} required/>
          </Grid>
          <Grid item xs={12} mb='40px'>
            <TextField  label="Direccion Del Comercio" name="DireccionDelComercio" variant="outlined" fullWidth id="fullWidth" size="small" onChange={handleInputChange} required/>
          </Grid>

          <Grid item xs={12} mb='40px'>
            <TextField  label="Entre Calles" name="EntreCalles" variant="outlined" fullWidth id="fullWidth" size="small" onChange={handleInputChange} required/>
          </Grid>
          <Grid item xs={12} mb='40px'>
            <TextField  label="Direccion de la casa" name="DireccionCasa" variant="outlined" fullWidth id="fullWidth" size="small" onChange={handleInputChange} required/>
          </Grid>
          <Grid item xs={12} mb='40px'>
            <TextField  label="Localidad" name="Localidad" variant="outlined" fullWidth id="fullWidth" size="small" onChange={handleInputChange} required/>
          </Grid>
          <Grid item xs={12} mb='40px'>
            <TextField  label="Telefono 1" name="Telefono1" variant="outlined" fullWidth id="fullWidth" size="small" onChange={handleInputChange} required/>
          </Grid>
          <TextField  label="Telefono 2" name="Telefono2"variant="outlined" fullWidth id="fullWidth" size="small"onChange={handleInputChange} required/>
        
            <Grid item xs={12} mt="40px">
              <Button variant="contained" type="submit" fullWidth onClick={onSubmit}>Subir venta</Button>
            </Grid>
        
        </FormControl>
      </Grid>
      </Grid>
    </Box>
    </div>
  )
}

export default FormVentas
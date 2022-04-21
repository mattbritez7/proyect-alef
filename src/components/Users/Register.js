import * as React from 'react';
import Image from "../../images/imagen1.jpg";

import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';

export default function Register() {

  const [mode, setMode] = React.useState('Tipo de cuenta');

  const handleChange = (event) => {
    setMode(event.target.value);
  };

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
        style={{ width: '100%', maxWidth: '380px', margin: '100px auto ', paddingRight:'10px' }}
      >
      <Grid item xs={12}>
      <img src={Image} width="355" height="220" style={{marginLeft: "0px", marginTop: "30px", marginBottom: "30px", borderRadius: "5px"}}/>
        <FormControl variant="standard" fullWidth>
        <Grid item xs={12} mb='20px'>
            <TextField  label="Nombre y Apellido" demo-helper-text-misaligned variant="outlined" fullWidth id="fullWidth" size="small"/>
          </Grid>
          <Grid item xs={12} mb='20px'>
            <TextField  label="Email" variant="outlined" fullWidth id="fullWidth" size="small"/>
          </Grid>
          <Grid item xs={12} mb='20px'>
          <TextField standard-adornment-password label="Contraseña" variant="outlined" fullWidth id="fullWidth" mb="10px" size="small"/>
          </Grid>
          <TextField  label="Repetir Contraseña" variant="outlined" fullWidth id="fullWidth" size="small"/>
          <FormControl variant="filled" sx={{ mt: 2.5, height: '50px' }}>
            <Grid item xs={12} fullWidth>
            <InputLabel id="demo-simple-select-autowidth-label" size="small" fullWidth>Tipo de cuenta</InputLabel>
              <Select
                labelId="demo-simple-select-autowidth-label" 
                id="demo-simple-select-autowidth"
                value={mode}
                onChange={handleChange}
                fullWidth
                label="tipo de cuenta"
              >
                  <MenuItem value={10}>Vendedor/a</MenuItem>
                  <MenuItem value={20}>Administrador/a</MenuItem>
                </Select>
            </Grid>
            </FormControl>
        
            <Grid item xs={12} mt="40px">
              <Button variant="contained" fullWidth>Crear Cuenta</Button>
            </Grid>
        </FormControl>
      </Grid>
      </Grid>
    </Box>
      </div>
  );
}
import * as React from 'react';
import { useState } from 'react';
import Image from "../../images/imagen1.jpg";
import httpClient from '../../utils/httpClient';
import SucessRegister from './SucessRegister';


//mui components

import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';

export default function Register() {
  
  const [condicional, setCondicional] = useState(false)

  const [data, setData] = useState({
    username: "",
    Password: "",
    Email: "",
    IsAdmin: true
  })

  const handleInputChange = (event) => {
    console.log(event.target.value)
    setData({
      ...data,
      [event.target.name] : event.target.value
    })
  }

  const onSubmit = (e) => { 
    e.preventDefault();
    httpClient.post("/users/register", {
      username: data.username,
      Email: data.Email,
      Password: data.Password, 
      IsAdmin: data.IsAdmin
    })
  }

  
  if(condicional){
    return <SucessRegister/>
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
      <img src={Image} width="355" height="220" style={{marginLeft: "0px", marginTop: "30px", marginBottom: "30px", borderRadius: "5px"}}/>
        <FormControl variant="standard" fullWidth>
        <Grid item xs={12} mb='20px'>
            <TextField  label="Nombre y Apellido" type="name" name="username" id="Job_Name2" demo-helper-text-misaligned variant="outlined" fullWidth  size="small" onChange={handleInputChange}/>
          </Grid>


          <Grid item xs={12} mb='20px'>
            <TextField  label="Tu Email" name="Email" id="Job_Name" variant="outlined"  fullWidth size="small" onChange={handleInputChange}/>
          </Grid>



          <Grid item xs={12} mb='20px'>
          <TextField standard-adornment-password label="Contraseña" type="password" id="Job_Name3"name="Password" variant="outlined" fullWidth mb="10px" size="small" onChange={handleInputChange}/>
          </Grid>
          <TextField  label="Repetir Contraseña"  type="password" variant="outlined" fullWidth id="fullWidth" size="small"/>
          <FormControl variant="filled" sx={{ mt: 2.5, height: '50px' }}>
            <Grid item xs={12} >
            <InputLabel id="demo-simple-select-autowidth-label" size="small" name="IsAdmin" fullWidth>Tipo de cuenta</InputLabel>
              <Select
                labelId="demo-simple-select-autowidth-label" 
                id="demo-simple-select-autowidth"
                onChange={handleInputChange}
                fullWidth
                label="tipo de cuenta"
                name='IsAdmin'
                defaultValue=""
              >
                  <MenuItem value={false}>Vendedor/a</MenuItem>
                  <MenuItem value={true}>Administrador/a</MenuItem>
                </Select>
            </Grid>
            </FormControl>
        

            <Grid item xs={12} mt="40px">
              <Button variant="contained" fullWidth onClick={onSubmit}>Crear Cuenta</Button>
            </Grid>

        </FormControl>
      </Grid>
      </Grid>
    </Box>
      </div>
  );
}
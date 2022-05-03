import * as React from 'react';
import { useState } from 'react';
import Image from "../../images/imagen1.jpg";
import httpClient from "../../utils/httpClient"
import SucessLogin from "./SucessLogin"

//mui components

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

export default function Login() {

  const [data, setData] = useState({
    Password: '',
    username: ""
  })
  const [condicional, setCondicional] = useState(false)
  const onSubmit = (e) => { 

    e.preventDefault();
    httpClient.post("/users/login", {
      Password: data.Password,
      username: data.username
    }).then(()=> setCondicional(true)).catch((err) => console.error(err))
  }
 
  const handleInputChange = (event) => {
    console.log(event.target.value)
    setData({
      ...data,
      [event.target.name] : event.target.value
    })
  }

  if(condicional){
    return <SucessLogin/>
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
        style={{ width: '100%', maxWidth: '380px', margin: '100px auto ', paddingRight:'10px' }}
      >
      <img src={Image} alt ="imagen1" width="380" height="220" style={{marginLeft: "17px",marginBottom: "20px", marginTop: "30px", borderRadius: "5px"}}/>
      <Grid item xs={12}>
        <FormControl variant="standard" fullWidth>
          <Grid item xs={12} mb='40px'>
            <TextField  type="email" label="Nombre y apellido" variant="outlined" name="username"fullWidth id="fullWidth" size="small" onChange={handleInputChange}/>
          </Grid>
          <TextField  type="password" label="Contraseña" variant="outlined" name="Password" fullWidth id="fullWidth" size="small" onChange={handleInputChange}/>
        
            <Grid item xs={12} mt="40px">
              <Button variant="contained" fullWidth onClick={onSubmit}>Ingresar</Button>
            </Grid>
        
        </FormControl>
      </Grid>
      </Grid>
    </Box>
      </div>
  );
}
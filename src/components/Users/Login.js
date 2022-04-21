import * as React from 'react';
import Image from "../../images/imagen1.jpg";

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

export default function Login() {
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
            <TextField  label="Email" variant="outlined" fullWidth id="fullWidth" size="small"/>
          </Grid>
          <TextField  label="Contraseña" variant="outlined" fullWidth id="fullWidth" size="small"/>
        
            <Grid item xs={12} mt="40px">
              <Button variant="contained" fullWidth>Ingresar</Button>
            </Grid>
        
        </FormControl>
      </Grid>
      </Grid>
    </Box>
      </div>
  );
}
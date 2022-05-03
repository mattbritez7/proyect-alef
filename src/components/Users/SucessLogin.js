import * as React from 'react';
import { Link } from 'react-router-dom';

//mui components

import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

export default function SucessLogin() {
    return(
    <>
    <Grid
        container
        spacing={2}
        style={{ width: '100%', maxWidth: '380px', margin: '0 auto ', paddingRight:'10px',paddingBottom:"100px", paddingTop:"300px" }}
      >
            <h1 style={{paddingLeft:"130px",margin:"0px"}}>Ingreso</h1>
            
            <h1 style={{paddingLeft:"85px", margin:"0px"}}>correctamente</h1>
            <Grid item xs={12} mt="40px"> 
            <Link to="/ventas"> 
              <Button variant="contained" type="submit" textDecoration= "none" fullWidth >Ir Al Panel</Button>
              </Link>  
            </Grid>
            </Grid>
    </>
    )}
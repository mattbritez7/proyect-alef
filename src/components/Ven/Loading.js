import * as React from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';

export default function loading() {
    return(
    <>
    <Grid
        container
        spacing={2}
        style={{ width: '100%', maxWidth: '380px', margin: '0 auto ', paddingRight:'10px',paddingBottom:"100px", paddingTop:"300px" }}
      >
    
            <h1 style={{paddingLeft:"95px"}}>Venta Cargada Exitosamente!</h1>
            <Grid item xs={12} mt="40px"> 
            <Link to="/ventas"> 
              <Button variant="contained" type="submit" fullWidth style={{textDecoration: "none"}}>Ir A Mis Ventas</Button>
              </Link>  
            </Grid>
            </Grid>
    
    </>
    )
}
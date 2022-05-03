import * as React from 'react';
import { useEffect, useState } from 'react';
import httpClient from '../../utils/httpClient';
import DrawerVen  from '../Ven/DrawerVen';

//mui components

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';


export default function CardVentas() {

  const [sell, setSell] = useState([])


  useEffect( function fetchTask () {
    httpClient.get("/tasks").then((res) => {
     const data = res.data
     console.log(data)
     setSell(data)
    })
}, [])
   

  return (
    <>
    <DrawerVen/>
     <Box sx={{ width: 1 }} display="grid" >
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 3 }} >
        
    {sell.map((item, i)=> {
      return(
        <Grid item xs={12}  sm={12} md={4}  key={i}>
    <TableContainer style={{ margin: '0 auto'}} component={Paper} sx={{ maxWidth: 450, padding: "15px", paddingTop: "10px"}} key={item._id}>
      <Table sx={{ maxWidth: 450 }} aria-label="simple table"  >
        <TableHead  >
          <TableRow  >
            <TableCell sx={{ padding: '5px', fontSize: "20px"}} >Matt Britez</TableCell>
      <Grid item xs={12} width="122px" marginLeft="150px" >
      
          <h3>{item.Estado}</h3>
        
            </Grid>
          
          </TableRow>
        </TableHead>
        <TableBody>
              <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="center" sx={{ padding: '5px'}} >
                  Nombre y Apellido:
                </TableCell>
                <TableCell align="right" sx={{ padding: '5px'}}>{item.Nombre}</TableCell>
              </TableRow>

                <TableRow
                  key={item._id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                <TableCell component="th" scope="center" sx={{ padding: '5px'}} >
                  Producto:
                </TableCell>
                <TableCell align="right" sx={{ padding: '5px'}} >{item.Producto}</TableCell>
                </TableRow>

                <TableRow
                 
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                <TableCell component="th" scope="center" sx={{ padding: '5px'}}  >
                  Precio Del producto:
                </TableCell>
                <TableCell align="right" sx={{ padding: '5px'}} >{item.Precio}</TableCell>
                </TableRow>

                <TableRow
                 
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                <TableCell component="th" scope="center" sx={{ padding: '5px'}}>
                  Plan:
                </TableCell>
                <TableCell align="right" sx={{ padding: '5px'}}>{item.Dias}</TableCell>
                </TableRow>

                <TableRow
                key={item._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="center" sx={{ padding: '5px'}}>
                  Dni:
                </TableCell>
                <TableCell align="right" sx={{ padding: '5px'}} >{item.Dni}</TableCell>

                </TableRow>
                <TableRow
                
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="center" sx={{ padding: '5px'}}>
                  Fecha de Nacimiento:
                </TableCell>
                <TableCell align="right" sx={{ padding: '5px'}} >{item.FechaDeNacimiento}</TableCell>
                </TableRow>
                <TableRow
               
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="center" sx={{ padding: '5px'}}>
                    Direccion Del Comercio:
                </TableCell>
                <TableCell align="right" sx={{ padding: '5px'}} >{item.DireccionDelComercio}</TableCell>
                </TableRow>
                <TableRow
               
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="center" sx={{ padding: '5px'}}>
                Entre Calles:
                </TableCell>
                <TableCell align="right" sx={{ padding: '5px'}} >{item.EntreCalles}</TableCell>
                </TableRow>
                <TableRow
                key={item._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="center" sx={{ padding: '5px'}}>
                  Direccion De La Casa:
                </TableCell>
                <TableCell align="right" sx={{ padding: '5px'}}>{item.DireccionCasa}</TableCell>
                </TableRow>
                <TableRow
                
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="center" sx={{ padding: '5px'}}>
                Localidad:
                </TableCell>
                <TableCell align="right" sx={{ padding: '5px'}} >{item.Localidad}</TableCell>
                </TableRow>
                <TableRow
               
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="center" sx={{ padding: '5px'}}>
                Telefono 1:
                </TableCell>
                <TableCell align="right" sx={{ padding: '5px'}}>{item.Telefono1}</TableCell>
                </TableRow>
                <TableRow
               
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="center" sx={{ padding: '5px'}}>
                Telefono 2:
                </TableCell>
                <TableCell align="right" sx={{ padding: '5px'}}>{item.Telefono2}</TableCell>
                </TableRow>
              </TableBody>
              </Table>
              </TableContainer>
              </Grid>
            )
            
          })}
            </Grid>
      
    </Box>
            </>
  )
}
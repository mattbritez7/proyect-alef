import * as React from 'react';
import { useEffect, useState } from 'react';
import httpClient from '../../utils/httpClient';
import DrawerAdm  from '../Adm/DrawerAdm';

//mui components

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';




export default function CardVentas() {
  const [sell, setSell] = useState([])
  const [newSale, setNewSale] = useState(false)
  
  useEffect( function fetchTask () {
      httpClient.get("/tasks").then((res) => {
       const data = res.data
       console.log(data)
       setSell(data)
      })
  }, [])



  const deleteTask = (id) => {
    httpClient.delete(`/tasks/${id}`).then((res) => {
      const data = res.data
      console.log(data)
    }).then(() => {
      httpClient.get("/tasks").then((res) => {
        const data = res.data
        console.log(data)
        setSell(data)
       })
    })
  }

  const editTask = (id) => {
    httpClient.get(`/tasks/${id}`).then((res) => {
      const data = res.data
      console.log(data)
    })
  }

  return (
    <>
    <DrawerAdm/>
     <Box sx={{ width: 1 }} display="grid" >
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 3 }} >
        
    {sell.map((item)=> {
      return(
        <Grid item xs={12}  sm={12} md={4}  key={item._id}>
    <TableContainer style={{ margin: '0 auto'}} component={Paper} sx={{ maxWidth: 450, padding: "15px", paddingTop: "10px"}} key={item._id}>
      <Table sx={{ maxWidth: 450 }} aria-label="simple table"  key={item._id}>
        <TableHead  key={item._id}>
          <TableRow  key={item._id}>
            <TableCell sx={{ padding: '5px', fontSize: "20px"}} key={item._id}>Matt Britez</TableCell>
      <Grid item xs={12} width="122px" marginLeft="140px">
            <InputLabel id="demo-simple-select-label" size="small"></InputLabel>
              <Select
                labelId="demo-simple-select-autowidth-label" 
                id="demo-simple-select-autowidth"
                
                fullWidth
                backgroundColor="red"
                
              >
                  <MenuItem value={3} width="10px">Verificado</MenuItem>
                  <MenuItem value={2} width="10px">Aprobado</MenuItem>
                  <MenuItem value={1} width="10px">Entregado</MenuItem>
                  
                </Select>
            </Grid>
          <IconButton aria-label="delete" sx={{marginLeft:"162px"}}  key={item._id}>
        <DeleteIcon  key={item._id} onClick={()=>deleteTask(item._id) } />
      </IconButton >
      <IconButton aria-label="edit" sx={{paddingLeft:"5px"}}  key={item._id}>
        <EditIcon key={item._id} onClick={() => editTask(item._id)}/>
      </IconButton  >
          </TableRow>
        </TableHead>
        <TableBody  key={item._id}>
              <TableRow
                key={item._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="center" sx={{ padding: '5px'}}  key={item._id}>
                  Nombre y Apellido:
                </TableCell>
                <TableCell align="right" sx={{ padding: '5px'}} key={item._id}>{item.Nombre}</TableCell>
                </TableRow>

                <TableRow
                key={item._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="center" sx={{ padding: '5px'}}>
                  Dni:
                </TableCell>
                <TableCell align="right" sx={{ padding: '5px'}} key={item._id}>{item.Dni}</TableCell>

                </TableRow>
                <TableRow
                key={item._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="center" sx={{ padding: '5px'}}>
                  Fecha de Nacimiento:
                </TableCell>
                <TableCell align="right" sx={{ padding: '5px'}} key={item._id}>{item.FechaDeNacimiento}</TableCell>
                </TableRow>
                <TableRow
                key={item._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="center" sx={{ padding: '5px'}}>
                    Direccion Del Comercio:
                </TableCell>
                <TableCell align="right" sx={{ padding: '5px'}} key={item._id}>{item.DireccionDelComercio}</TableCell>
                </TableRow>
                <TableRow
                key={item._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="center" sx={{ padding: '5px'}}>
                Entre Calles:
                </TableCell>
                <TableCell align="right" sx={{ padding: '5px'}} key={item._id}>{item.EntreCalles}</TableCell>
                </TableRow>
                <TableRow
                key={item._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="center" sx={{ padding: '5px'}}>
                  Direccion De La Casa:
                </TableCell>
                <TableCell align="right" sx={{ padding: '5px'}} key={item._id}>{item.DireccionCasa}</TableCell>
                </TableRow>
                <TableRow
                key={item._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="center" sx={{ padding: '5px'}}>
                Localidad:
                </TableCell>
                <TableCell align="right" sx={{ padding: '5px'}} key={item._id}>{item.Localidad}</TableCell>
                </TableRow>
                <TableRow
                key={item._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="center" sx={{ padding: '5px'}}>
                Telefono 1:
                </TableCell>
                <TableCell align="right" sx={{ padding: '5px'}} key={item._id}>{item.Telefono1}</TableCell>
                </TableRow>
                <TableRow
                key={item._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="center" sx={{ padding: '5px'}}>
                Telefono 2:
                </TableCell>
                <TableCell align="right" sx={{ padding: '5px'}}key={item._id}>{item.Telefono2}</TableCell>
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
  );
}
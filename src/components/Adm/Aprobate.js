import React from 'react'
import DrawerAdm  from "./DrawerAdm"
import * as react from 'react';
import { useEffect, useState } from 'react';
import httpClient from '../../utils/httpClient';

import {CopyToClipboard} from "react-copy-to-clipboard"

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
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';


const Aprobate = () => {
    const [sell, setSell] = useState([])
    const [data, setData] = useState({ 
        Estado: "Pendiente"
    })
    const handleInputChange = (event) => {
        console.log(event.target.value)
        setData({
          ...data,
          [event.target.name] : event.target.value
        })
      }

      useEffect( function fetchTask () {
        httpClient.get("/tasks/aprobado").then((res) => {
         const data = res.data
         console.log(data)
         setSell(data)
        })
    }, [])
      

    const editTask = (id) => {
        httpClient.put(`/tasks/${id}`,{
          Estado: data.Estado
        }).then((res) => {
          const data = res.data
          console.log(data)
        })
      }
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
      
    
    return (
        <>
        <DrawerAdm/>
        
        
    
         <Box sx={{ width: 1 }} display="grid" >
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 3 }} >
            
        {sell.map((item)=> {
          return(
            
            <Grid item xs={12}  sm={12} md={4} key={item._id}>
              <TableContainer style={{ margin: '0 auto'}} component={Paper} sx={{ maxWidth: 450, padding: "15px", paddingTop: "10px"}}>
                <Table sx={{ maxWidth: 450 }} aria-label="simple table"  >
                  <TableHead>
                    <TableRow >
                      <TableCell sx={{ padding: '5px', fontSize: "20px"}}>Matt Britez</TableCell>
                <Grid item xs={12} width="122px" marginLeft="140px" >
                      <InputLabel id="demo-simple-select-label" size="small" name="Estado"></InputLabel>
                        <Select
                          labelId="demo-simple-select-autowidth-label" 
                          id="demo-simple-select-autowidth"
                          defaultValue={item.Estado}
                          backgroundColor="red"
                          onChange={handleInputChange}
                          fullWidth
                          name="Estado"
                          onClick={() => editTask(item._id)}
                          
                        >
                          <MenuItem value={"Pendiente"} width="10px">Pendiente</MenuItem>
                          <MenuItem value={"Aprobado"} width="10px">Aprobado </MenuItem>
                          <MenuItem value={"Entregado"} width="10px">Entregado</MenuItem>
                      
                    </Select>
                </Grid>
              <IconButton aria-label="delete"   >
            <DeleteIcon onClick={()=>deleteTask(item._id) } />
          </IconButton >
         
                <CopyToClipboard text={item.DireccionDelComercio} >
                <IconButton aria-label="edit"   >
                  <ContentCopyIcon />
                </IconButton >
                </CopyToClipboard>
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
      );
    
}

export default Aprobate
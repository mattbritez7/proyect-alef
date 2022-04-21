import * as React from 'react';
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
import { useEffect, useState } from 'react';
import httpClient from '../../utils/httpClient';



function createData(name, datos) {
  return { name, datos };
}

const rows = [
  createData('Nombre:', "ezequiel datolo"),
  createData('Dni:', "23732534"),
  createData('Fecha de Nacimiento:', "26/7/2000"),
  createData('Direccion del comercio:', "aristobulo del valle 2100"),
  createData('Entre calles:', "correa y juan garay"),
  createData('Direccion casa', "aristobulo del valle 2100"),
  createData('Localidad:', "Lanus"),
  createData('Telefono 1:', "1153863836"),
  createData('Telefono 2:', "1167983456"),
];


export default function CardVentas() {

  const [sell, setSell] = useState([])
  
  useEffect( () => {
      httpClient.get("/tasks").then((res) => {
       const data = res.data
       console.log(data)
       setSell(data)
      })
  }, [])

  


  return (
    <>
    {sell.map(item => {
      return(
    <TableContainer component={Paper} sx={{ maxWidth: 450, padding: "15px", marginTop: "10px", marginBottom: "10px"}}>
      <Table sx={{ maxWidth: 450 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ padding: '5px', fontSize: "20px"}}>Matt Britez</TableCell>
          <IconButton aria-label="delete" sx={{marginLeft:"140px"}}>
        <DeleteIcon />
      </IconButton>
      <IconButton aria-label="delete" sx={{paddingLeft:"5px"}}>
        <EditIcon />
      </IconButton>
          </TableRow>
        </TableHead>
        <TableBody>

              <TableRow
                key={item._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="center" sx={{ padding: '5px'}}>
                  Nombre y Apellido:
                </TableCell>
                <TableCell align="right" sx={{ padding: '5px'}}>{item.Nombre}</TableCell>
                </TableRow>

                <TableRow
                key={item._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="center" sx={{ padding: '5px'}}>
                  Dni:
                </TableCell>
                <TableCell align="right" sx={{ padding: '5px'}}>{item.Dni}</TableCell>

                </TableRow>
                <TableRow
                key={item._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="center" sx={{ padding: '5px'}}>
                  Fecha de Nacimiento:
                </TableCell>
                <TableCell align="right" sx={{ padding: '5px'}}>{item.FechaDeNacimiento}</TableCell>
                </TableRow>
                <TableRow
                key={item._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="center" sx={{ padding: '5px'}}>
                    Direccion Del Comercio:
                </TableCell>
                <TableCell align="right" sx={{ padding: '5px'}}>{item.DireccionDelComercio}</TableCell>
                </TableRow>
                <TableRow
                key={item._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="center" sx={{ padding: '5px'}}>
                Entre Calles:
                </TableCell>
                <TableCell align="right" sx={{ padding: '5px'}}>{item.EntreCalles}</TableCell>
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
                key={item._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="center" sx={{ padding: '5px'}}>
                Localidad:
                </TableCell>
                <TableCell align="right" sx={{ padding: '5px'}}>{item.Localidad}</TableCell>
                </TableRow>
                <TableRow
                key={item._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="center" sx={{ padding: '5px'}}>
                Telefono 1:
                </TableCell>
                <TableCell align="right" sx={{ padding: '5px'}}>{item.Telefono1}</TableCell>
                </TableRow>
                <TableRow
                key={item._id}
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
              )
            })}
            </>
  );
}
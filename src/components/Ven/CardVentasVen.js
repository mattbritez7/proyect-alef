import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import httpClient from '../../utils/httpClient'



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

    
   
      




  return (
    <TableContainer component={Paper} sx={{ maxWidth: 450, padding: "15px" }}>
      <Table sx={{ maxWidth: 450 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ padding: '5px', fontSize: "20px"}}>Matt Britez</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" sx={{ padding: '5px'}}>
                {row.name}
              </TableCell>
              <TableCell align="right" sx={{ padding: '5px'}}>{row.datos}</TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
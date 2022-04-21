import React from 'react'
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

export default function Card (props) {
  return (
    <div>
        <TableRow
        key={1}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
        <TableCell component="th" scope="row" sx={{ padding: '5px'}}>
                Nombre:
        </TableCell>
        <TableCell align="right" sx={{ padding: '5px'}}>{props.Nombre}</TableCell>
        <TableCell component="th" scope="row" sx={{ padding: '5px'}}>
                dni:
        </TableCell>
        <TableCell align="right" sx={{ padding: '5px'}}>{props.Dni}: </TableCell>
        <TableCell component="th" scope="row" sx={{ padding: '5px'}}>
                calle:
        </TableCell>
        <TableCell align="right" sx={{ padding: '5px'}}>{props.DireccionDelComercio} </TableCell>
        <TableCell component="th" scope="row" sx={{ padding: '5px'}}>
                domicilio:
        </TableCell>
        <TableCell align="right" sx={{ padding: '5px'}}>{props.Localidad}</TableCell> 
        <TableCell component="th" scope="row" sx={{ padding: '5px'}}>
                telefono:
        </TableCell>
        <TableCell align="right" sx={{ padding: '5px'}}>{props.Telefono1}</TableCell>
        
        </TableRow>
    </div>
  )
}

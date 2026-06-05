import React, { useEffect, useState } from "react";
import { useParams, useHistory, useLocation } from "react-router-dom";
import httpClient from "../utils/httpClient";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const estadoMap = { 1: "Pendiente", 2: "Aprobado", 3: "Entregado" };

const fields = [
  { label: "Estado", key: "Estado" },
  { label: "Nombre y Apellido", key: "Nombre" },
  { label: "Producto", key: "Producto" },
  { label: "Precio Del producto", key: "Precio" },
  { label: "Plan", key: "Dias" },
  { label: "Dni", key: "Dni" },
  { label: "Fecha de Nacimiento", key: "FechaDeNacimiento" },
  { label: "Direccion Del Comercio", key: "DireccionDelComercio" },
  { label: "Entre Calles", key: "EntreCalles" },
  { label: "Direccion De La Casa", key: "DireccionCasa" },
  { label: "Localidad", key: "Localidad" },
  { label: "Telefono 1", key: "Telefono1" },
  { label: "Telefono 2", key: "Telefono2" },
];

export default function SaleDetail() {
  const { id } = useParams();
  const history = useHistory();
  const location = useLocation();
  const [sale, setSale] = useState(null);

  useEffect(() => {
    const endpoint = location.pathname.startsWith("/my-sales")
      ? "/sales/mis-ventas"
      : "/sales";
    httpClient.get(endpoint).then((res) => {
      const found = res.data.find((item) => item._id === id);
      setSale(found || null);
    });
  }, [id, location.pathname]);

  if (!sale) {
    return (
      <Box sx={{ textAlign: "center", mt: 4, color: "text.secondary", fontSize: 18 }}>
        Cargando...
      </Box>
    );
  }

  const created = new Date(parseInt(sale._id.substring(0, 8), 16) * 1000);
  const formattedDate = created.toLocaleString("es-AR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return (
    <Box sx={{ maxWidth: 500, mx: "auto", mt: { xs: 1, sm: 4 }, px: { xs: 1, sm: 0 } }}>
      <Button variant="outlined" sx={{ mb: 2, ml: { xs: 1, sm: 0 } }} onClick={() => history.goBack()}>
        Volver
      </Button>
      <Paper sx={{ p: { xs: 1, sm: 2 } }}>
        <Typography variant="h6" sx={{ mb: 2, textAlign: "center", fontSize: { xs: 14, sm: 20 } }}>
          Creado el {formattedDate}
        </Typography>
        <TableContainer sx={{ overflowX: "auto" }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Campo</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Valor</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {fields.map((f) => (
                <TableRow key={f.key}>
                  <TableCell component="th" scope="row">{f.label}</TableCell>
                  <TableCell>{f.key === "Estado" ? (estadoMap[sale.Estado] || "Pendiente") : (sale[f.key] || "-")}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}

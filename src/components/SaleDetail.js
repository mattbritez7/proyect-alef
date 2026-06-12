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

const statusMap = { 1: "Pendiente", 2: "Aprobado", 3: "Entregado", 4: "Desaprobado" };
const statusColor = {
  Pendiente: "#FFC107",
  Aprobado: "#4CAF50",
  Entregado: "#2196F3",
  Desaprobado: "#F44336",
};

const fields = [
  { label: "Estado", key: "Estado" },
  { label: "Nombre y Apellido", key: "Nombre" },
  { label: "Producto", key: "Producto" },
  { label: "Modalidad del plan", key: "Modalidad" },
  { label: "Plan (Dias)", key: "Dias" },
  { label: "Precio del plan", key: "Precio" },
  { label: "Dni", key: "Dni" },
  { label: "Fecha de Nacimiento", key: "FechaDeNacimiento" },
  { label: "Direccion Del Comercio", key: "DireccionDelComercio" },
  { label: "Entre Calles", key: "EntreCalles" },
  { label: "Direccion De La Casa", key: "DireccionCasa" },
  { label: "Localidad", key: "Localidad" },
  { label: "Telefono 1", key: "Telefono1" },
  { label: "Telefono 2", key: "Telefono2" },
  { label: "Vendedor", key: "user" },
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
                  <TableCell>{f.key === "Estado" ? (
                    <Box
                      component="span"
                      sx={{
                        px: 1.5,
                        py: 0.5,
                        borderRadius: 1,
                        fontSize: 12,
                        fontWeight: "bold",
                        color: "white",
                        bgcolor: statusColor[statusMap[sale.Estado] || "Pendiente"],
                      }}
                    >
                      {statusMap[sale.Estado] || "Pendiente"}
                    </Box>
                  ) : (sale[f.key] || "-")}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}

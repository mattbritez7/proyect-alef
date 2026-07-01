import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import httpClient from "../../utils/httpClient";
import AdminDrawer from "./Drawer";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function PostForm() {
  const history = useHistory();
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!image && !text.trim()) {
      setError("Debe proporcionar al menos una imagen o un texto");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    if (image) formData.append("image", image);
    formData.append("text", text);

    httpClient
      .post("/posts", formData)
      .then(() => {
        setSuccess("Post creado con éxito");
        setTimeout(() => history.push("/panel-vendedor"), 1500);
      })
      .catch((err) => {
        const msg = err.response?.data?.msg || "Error al crear el post";
        setError(msg);
        setLoading(false);
      });
  };

  return (
    <>
      <AdminDrawer />
      <Box sx={{ width: 1, maxWidth: 500, mx: "auto", mt: { xs: 1, sm: 4 }, px: { xs: 1, sm: 0 } }}>
        <Typography variant="h6" sx={{ mb: 2, fontSize: { xs: 16, sm: 20 } }}>
          Nuevo Post
        </Typography>
        <form onSubmit={handleSubmit}>
          <Button variant="outlined" component="label" sx={{ mb: 2, display: "block" }}>
            {image ? image.name : "Seleccionar imagen"}
            <input type="file" hidden accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
          </Button>
          {image && (
            <Box
              component="img"
              src={URL.createObjectURL(image)}
              sx={{ width: 1, maxHeight: 600, objectFit: "contain", background: "#f0f0f0", mb: 2, borderRadius: 1 }}
            />
          )}
          <TextField
            label="Texto del post"
            multiline
            rows={4}
            fullWidth
            value={text}
            onChange={(e) => setText(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button type="submit" variant="contained" fullWidth disabled={loading}>
            {loading ? "Creando..." : "Crear Post"}
          </Button>
        </form>
      </Box>

      <Snackbar
        open={!!error}
        autoHideDuration={4000}
        onClose={() => setError(null)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="error" onClose={() => setError(null)}>
          {error}
        </Alert>
      </Snackbar>
      <Snackbar
        open={!!success}
        autoHideDuration={4000}
        onClose={() => setSuccess(null)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="success" onClose={() => setSuccess(null)}>
          {success}
        </Alert>
      </Snackbar>
    </>
  );
}

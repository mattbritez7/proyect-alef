import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import httpClient from "../utils/httpClient";
import { useAuth } from "../context/AuthContext";
import AdminDrawer from "./Adm/Drawer";
import VenDrawer from "./Ven/Drawer";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DownloadIcon from "@mui/icons-material/Download";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";

export default function PostsList() {
  const { user } = useAuth();
  const history = useHistory();
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [deleteDialog, setDeleteDialog] = useState({ open: false, id: null });

  const fetchPosts = () => {
    httpClient
      .get("/posts")
      .then((res) => setPosts(res.data))
      .catch((err) => {
        const msg = err.response?.data?.message || "Error al cargar posts";
        setError(msg);
      });
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const confirmDelete = () => {
    httpClient
      .delete(`/posts/${deleteDialog.id}`)
      .then(() => {
        setSuccess("Post eliminado");
        setDeleteDialog({ open: false, id: null });
        fetchPosts();
      })
      .catch((err) => {
        const msg = err.response?.data?.message || "Error al eliminar post";
        setError(msg);
        setDeleteDialog({ open: false, id: null });
      });
  };

  const copyText = (text) => {
    navigator.clipboard.writeText(text);
    setSuccess("Texto copiado al portapapeles");
  };

  const downloadImage = async (url) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "post-image.jpg";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);
    } catch {
      setError("Error al descargar la imagen");
    }
  };

  const isAdmin = user?.role === "administrador";
  const isVendedor = user?.role === "vendedor";

  const imageUrl = (path) => {
    if (!path) return "";
    if (path.startsWith("http")) return path;
    const base = httpClient.defaults.baseURL || "";
    return base.replace(/\/+$/, "") + path;
  };

  return (
    <>
      {isAdmin ? <AdminDrawer /> : <VenDrawer />}
      <Box sx={{ width: 1, maxWidth: 1200, mx: "auto", mt: { xs: 1, sm: 4 }, px: { xs: 1, sm: 0 } }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2, gap: 1 }}>
          <Typography variant="h6" sx={{ fontSize: { xs: 16, sm: 20 } }}>
            Panel vendedor
          </Typography>
          {isAdmin && (
            <Button variant="contained" size="small" onClick={() => history.push("/admin/posts/new")}>
              Nuevo Post
            </Button>
          )}
        </Box>

        {posts.length === 0 ? (
          <Typography sx={{ textAlign: "center", color: "text.secondary", mt: 4 }}>
            No hay posts disponibles
          </Typography>
        ) : (
          <Grid container spacing={2}>
            {posts.map((post) => (
              <Grid item xs={12} sm={6} md={4} key={post._id}>
                <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                  {post.image && (
                    <Box sx={{ position: "relative" }}>
                      <CardMedia
                        component="img"
                        image={imageUrl(post.image)}
                        alt="Post image"
                        sx={{ width: 1, maxHeight: { xs: 250, sm: 400 }, objectFit: "contain", background: "#f0f0f0" }}
                      />
                      <IconButton
                        size="small"
                        onClick={() => downloadImage(imageUrl(post.image))}
                        sx={{ position: "absolute", top: 4, right: 4, bgcolor: "rgba(255,255,255,0.8)", "&:hover": { bgcolor: "rgba(255,255,255,0.95)" } }}
                      >
                        <DownloadIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  )}
                  <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <Typography variant="body1">{post.text}</Typography>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 1 }}>
                      <Typography variant="caption" color="text.secondary">
                        {post.createdBy?.username} — {new Date(post.createdAt).toLocaleDateString()}
                      </Typography>
                      <Box>
                        <IconButton size="small" onClick={() => copyText(post.text)}>
                          <ContentCopyIcon fontSize="small" />
                        </IconButton>
                        {isAdmin && (
                          <IconButton size="small" color="error" onClick={() => setDeleteDialog({ open: true, id: post._id })}>
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        )}
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>

      <Dialog open={deleteDialog.open} onClose={() => setDeleteDialog({ open: false, id: null })}>
        <DialogTitle>Confirmar eliminación</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Estás seguro de que deseas eliminar este post? Esta acción no se puede deshacer.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog({ open: false, id: null })}>Cancelar</Button>
          <Button onClick={confirmDelete} color="error" variant="contained">Eliminar</Button>
        </DialogActions>
      </Dialog>
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
        autoHideDuration={3000}
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

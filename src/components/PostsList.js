import React, { useEffect, useState } from "react";
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

  const deletePost = (id) => {
    httpClient
      .delete(`/posts/${id}`)
      .then(() => {
        setSuccess("Post eliminado");
        fetchPosts();
      })
      .catch((err) => {
        const msg = err.response?.data?.message || "Error al eliminar post";
        setError(msg);
      });
  };

  const copyText = (text) => {
    navigator.clipboard.writeText(text);
    setSuccess("Texto copiado al portapapeles");
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
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
          <Typography variant="h6" sx={{ fontSize: { xs: 16, sm: 20 } }}>
            Panel vendedor
          </Typography>
          {isAdmin && (
            <Button variant="contained" onClick={() => history.push("/admin/posts/new")}>
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
                    <CardMedia
                      component="img"
                      image={imageUrl(post.image)}
                      alt="Post image"
                      sx={{ width: 1, maxHeight: 400, objectFit: "contain", background: "#f0f0f0" }}
                    />
                  )}
                  <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <Typography variant="body1" sx={{ pr: 6 }}>{post.text}</Typography>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 1 }}>
                      <Typography variant="caption" color="text.secondary">
                        {post.createdBy?.username} — {new Date(post.createdAt).toLocaleDateString()}
                      </Typography>
                      <Box>
                        <IconButton size="small" onClick={() => copyText(post.text)}>
                          <ContentCopyIcon fontSize="small" />
                        </IconButton>
                        {isAdmin && (
                          <IconButton size="small" color="error" onClick={() => deletePost(post._id)}>
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

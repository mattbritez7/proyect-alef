import * as React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import Image from "../../images/image1.jpg";
import httpClient from "../../utils/httpClient";
import { useAuth } from "../../context/AuthContext";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function Login() {
  const { login } = useAuth();
  const history = useHistory();
  const [data, setData] = useState({
    Password: "",
    username: "",
  });
  const [error, setError] = useState(null);

  const onSubmit = (e) => {
    e.preventDefault();
    setError(null);
    httpClient
      .post("/users/login", {
        password: data.Password,
        email: data.username,
      })
      .then((res) => {
        login(res.data);
        const isAdmin = res.data.IsAdmin;
        history.push(isAdmin ? "/sales" : "/my-sales");
      })
      .catch((err) => {
        const msg = err.response?.data?.message || "Error al iniciar sesión";
        setError(msg);
      });
  };

  const handleInputChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { ml: "50px", mt: "30px", width: "300px" },
        }}
        noValidate
        autoComplete="off"
      >
        <Grid
          container
          spacing={2}
          style={{
            width: "100%",
            maxWidth: "380px",
            margin: "100px auto ",
            paddingRight: "10px",
          }}
        >
          <img
            src={Image}
            alt="logo"
            width="380"
            height="220"
            style={{
              marginLeft: "17px",
              marginBottom: "20px",
              marginTop: "30px",
              borderRadius: "5px",
            }}
          />
          <Grid item xs={12}>
            <FormControl variant="standard" fullWidth>
              <Grid item xs={12} mb="40px">
                <TextField
                  type="email"
                  label="Nombre y apellido"
                  variant="outlined"
                  name="username"
                  fullWidth
                  id="fullWidth"
                  size="small"
                  onChange={handleInputChange}
                />
              </Grid>
              <TextField
                type="password"
                label="Contraseña"
                variant="outlined"
                name="Password"
                fullWidth
                id="fullWidth"
                size="small"
                onChange={handleInputChange}
              />

              <Grid item xs={12} mt="40px">
                <Button variant="contained" fullWidth onClick={onSubmit}>
                  Ingresar
                </Button>
              </Grid>
            </FormControl>
          </Grid>
        </Grid>
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
    </div>
  );
}

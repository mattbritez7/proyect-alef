import React from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import Login from "./components/Users/Login";
import Register from "./components/Users/Register";

import FormVentasVen from "./components/Ven/FormVentasVen";
import FormVentasAdm from "./components/Adm/FormVentasAdm";
import DrawerAdm from "./components/Adm/DrawerAdm";

import Inicio from "./components/Inicio";

import CardVentasVen from "./components/Ven/CardVentasVen";
import CardVentasAdm from "./components/Adm/CardVentasAdm";

import Pendients from "./components/Adm/Pendients";

import Aprobate from "./components/Adm/Aprobate";

import Delivered from "./components/Adm/Delivered";

const App = () => {
  return (
    <div>
      <Router>
        <Route exact path="/iniciar-sesion" component={Login} />
        <Route exact path="/registrarme" component={Register} />
        <Route exact path="/" component={DrawerAdm} />
        <Route exact path="/subir-mi-venta" component={FormVentasVen} />
        <Route exact path="/subir-venta" component={FormVentasAdm} />
        <Route exact path="/ventas" component={CardVentasAdm} />
        <Route exact path="/pendientes" component={Pendients} />
        <Route exact path="/aprobados" component={Aprobate} />
        <Route exact path="/entregados" component={Delivered} />
        <Route exact path="/mis-ventas" component={CardVentasVen} />
        <Route exact path="/inicio" component={Inicio} />
      </Router>
    </div>
  );
};

export default App;

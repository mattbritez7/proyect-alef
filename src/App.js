import React from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import Login from "./components/Users/Login";
import Register from "./components/Users/Register";

import FormVentasVen from "./components/Ven/FormVentasVen";
import FormVentasAdm from "./components/Adm/FormVentasAdm";
import DrawerAdm from "./components/Adm/DrawerAdm";

import Home from "./components/Home";

import CardVentasVen from "./components/Ven/CardVentasVen";
import CardVentasAdm from "./components/Adm/CardVentasAdm";



const App = () => {
  return (
    <div>
      <Router>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/" component={DrawerAdm} />
        <Route exact path="/new-sale" component={FormVentasVen} />
        <Route exact path="/new-sale-admin" component={FormVentasAdm} />
        <Route exact path="/sales" component={CardVentasAdm} />
        <Route exact path="/my-sales" component={CardVentasVen} />
        <Route exact path="/home" component={Home} />
      </Router>
    </div>
  );
};

export default App;

import React from "react";
import { Route, Switch, BrowserRouter as Router, Redirect } from "react-router-dom";
import Login from "./components/Users/Login";
import Register from "./components/Users/Register";

import SaleForm from "./components/Ven/SaleForm";
import AdminSaleForm from "./components/Adm/SaleForm";
import AdminDrawer from "./components/Adm/Drawer";

import Home from "./components/Home";

import SalesList from "./components/SalesList";
import SaleDetail from "./components/SaleDetail";

import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import AdminRoute from "./components/Auth/AdminRoute";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <ProtectedRoute exact path="/home" component={Home} />
          <ProtectedRoute exact path="/new-sale" component={SaleForm} />
          <AdminRoute exact path="/new-sale-admin" component={AdminSaleForm} />
          <AdminRoute exact path="/" component={AdminDrawer} />
          <AdminRoute exact path="/sales" component={SalesList} />
          <AdminRoute exact path="/sales/:id" component={SaleDetail} />
          <ProtectedRoute exact path="/my-sales" component={SalesList} />
          <ProtectedRoute exact path="/my-sales/:id" component={SaleDetail} />
          <Redirect to="/login" />
        </Switch>
      </Router>
    </AuthProvider>
  );
};

export default App;

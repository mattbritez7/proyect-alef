import React from 'react'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import Login from "./components/Users/Login"
import Register from "./components/Users/Register"
import FormVentas from "./components/Ven/FormVentas"
import DrawerVen from "./components/Ven/DrawerVen"
import Inicio from "./components/Inicio"
import CardVentasVen from "./components/Ven/CardVentasVen"
import CardVentasAdm from "./components/Adm/CardVentasAdm"



const App = () => {
  return (
      <div>
        <Router>
        <DrawerVen/>
          <Switch>
            <Route exact path="/subir-venta" component={FormVentas}/>
            <Route exact path="/iniciar-sesion" component={Login}/>
            <Route exact path="/registrarme" component={Register}/>
            <Route exact path="/inicio" component={Inicio}/>
            <Route exact path="/mis-ventas" component={CardVentasVen}/>
            <Route exact path="/ventas" component={CardVentasAdm}/>
            
        </Switch>
        </Router>
      </div>
  )
}

export default App
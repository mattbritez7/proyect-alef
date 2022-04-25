import React from 'react'
import { Route, BrowserRouter as Router } from 'react-router-dom'
import Login from "./components/Users/Login"
import Register from "./components/Users/Register"
import FormVentas from "./components/Ven/FormVentas"
import DrawerAdm from "./components/Adm/DrawerAdm"
import Inicio from "./components/Inicio"
import CardVentasVen from "./components/Ven/CardVentasVen"
import CardVentasAdm from "./components/Adm/CardVentasAdm"




const App = () => {
  return (
      <div>
        <Router>
            <Route exact path="/iniciar-sesion" component={Login}/>
            <Route exact path="/registrarme" component={Register}/>
            <Route exact path="/" component={DrawerAdm}/>
            <Route exact path="/subir-venta" component={FormVentas}/>
            <Route exact path="/ventas" component={CardVentasAdm}/>
            <Route exact path="/mis-ventas" component={CardVentasVen}/>
            <Route exact path="/inicio" component={Inicio}/>
          
        </Router>
      </div>
  )
}

export default App
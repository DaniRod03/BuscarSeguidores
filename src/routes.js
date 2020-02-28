import React, { Component } from 'react';

import { BrowserRouter, Switch, Route } from "react-router-dom";

import Login from './Componentes/Login'
import Home from './Componentes/Home'
export default class Routes extends Component {
  render() {
      return(
    <BrowserRouter>
        <Switch>
            <Route path="/" exact component = {Login} />
            <Route path="/home/:user" component={Home} />
        </Switch>    
    </BrowserRouter>
      )
  }
}

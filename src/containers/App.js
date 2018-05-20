import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.css';
import Products from '../components/Products/Products';
import ProductView from '../components/ProductView/ProductView';

class App extends Component {

  render() {
    return (
      <Switch>
        <Route exact path='/' component={Products} />
        <Route path='/product/:id' component={ProductView} />
      </Switch>
    );
  }
}

export default App;

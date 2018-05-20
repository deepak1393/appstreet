import React from 'react';
import { Route, Switch } from 'react-router-dom';

import App from '../src/containers/App';
import Products from '../src/components/Products/Products';
import ProductView from '../src/components/ProductView/ProductView';

export default (
    <Switch>
        <Route exact path='/' component={Products} />
        <Route path='/product/:id' component={ProductView} />
    </Switch>
);

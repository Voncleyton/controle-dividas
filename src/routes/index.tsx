import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import DebtsDetails from '../pages/DebtsDetails';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Dashboard} />
    <Route path="/details" component={DebtsDetails} />
  </Switch>
);

export default Routes;

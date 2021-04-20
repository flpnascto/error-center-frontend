import React from 'react';
import { Switch, Route } from 'react-router-dom';
import EventForm from './pages/EventForm';
import Welcome from './pages/Welcome';
import Login from './pages/login';
import EventsList from './pages/EventsList';
import UserForm from './pages/UserForm';

const Router = () => (
  <Switch>
    <Route path='/login' component={Login} />
    <Route path='/form' component={EventForm} />
    <Route path='/events' component={EventsList} />
    <Route path='/user' component={UserForm} />
    <Route exact path="/" component={Welcome} />
  </Switch>
);

export default Router;

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import EventForm from './pages/EventForm';
import Welcome from './pages/Welcome';
import Login from './pages/login';
import EventsList from './pages/EventsList';
import EventsListAdmin from './pages/EventsListAdmin';
import UserForm from './pages/UserForm';
import LevelForm from './pages/LevelForm';
import UserList from './pages/UserList';
import EditLevel from './pages/EditLevel';

const Router = () => (
  <Switch>
    <Route path='/login' component={Login} />
    <Route path='/form' component={EventForm} />
    <Route path='/events/admin' component={EventsListAdmin} />
    <Route path='/events' component={EventsList} />
    <Route path='/user/all' component={UserList} />
    <Route path='/user' component={UserForm} />
    <Route path='/level/edit' component={EditLevel} />
    <Route path='/level' component={LevelForm} />
    <Route exact path="/" component={Welcome} />
  </Switch>
);

export default Router;

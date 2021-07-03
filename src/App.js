import React from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import CarDetails from './components/CarDetails/CarDetails';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';

const App = () => {
  const user = JSON.parse(localStorage.getItem('profile'));
  return (
    <BrowserRouter>
    <Container maxWidth="xl">
      <Navbar />
      <Switch>
        <Route path="/" exact component={() => <Redirect to="/cars" />} />
        <Route path="/cars" exact component={Home} />
        <Route path="/cars/search" exact component={Home} />
        <Route path="/cars/:id" exact component={CarDetails} />
        <Route path="/auth" exact component={() => (!user ? <Auth /> : <Redirect to="/cars" />)} />
      </Switch>
    </Container>
  </BrowserRouter>
  );
}

export default App;

import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Navbar from './Components/Layout/Navbar';
import Dashboard from './Components/Layout/Dashboard';
import AddClient from './Components/Clients/AddClient';
import ClientDetails from './Components/Clients/ClientDetails';
import EditClient from './Components/Clients/EditClient';
import Login from './Components/Auth/Login';
import Register from './Components/Auth/Register';
import firebase from './firebase/firebase.utils';
import Settings from './Components/Settings/Settings';

import './App.css';

function App() {
  const [isAuthentiated, setIsAuthenticated] = React.useState(false);
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      // User logged in already or has just logged in.
      setIsAuthenticated(true);
    } else {
      // User not logged in or has just logged out.
      setIsAuthenticated(false);
    }
  });

  return (
    <div className="App">
      <Navbar />
      <div className="container">
        <Switch>
          <Route exact path="/">
            {!isAuthentiated ? <Redirect to="/login" /> : <Dashboard />}
          </Route>
          <Route exact path="/client/add" render={() => <AddClient />} />
          <Route
            exact
            path="/clients/:id"
            render={props => <ClientDetails {...props} />}
          />
          <Route
            exact
            path="/client/edit/:id"
            render={props => <EditClient {...props} />}
          />
          <Route exact path="/login" render={props => <Login {...props} />} />
          <Route
            exact
            path="/register"
            render={props => <Register {...props} />}
          />
          <Route
            exact
            path="/settings"
            render={props => <Settings {...props} />}
          />
        </Switch>
      </div>
    </div>
  );
}

export default App;

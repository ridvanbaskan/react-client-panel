import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { auth } from '../../firebase/firebase.utils';
import firebase from '../../firebase/firebase.utils';
import { withRouter } from 'react-router-dom';
import { selectAllowRegistration } from '../../redux/settings/settings.selectors';

function Navbar({ history, allowRegistration }) {
  const [isAuthentiated, setIsAuthenticated] = React.useState(false);
  const [email, setEmail] = React.useState('');

  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      // User logged in already or has just logged in.
      setIsAuthenticated(true);
      setEmail(user.email);
    } else {
      // User not logged in or has just logged out.
      setIsAuthenticated(false);
    }
  });

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand" to="/">
          ClientPanel
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Link className="nav-item nav-link" to="/">
              Dashboard
            </Link>
          </div>
          {isAuthentiated ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item nav-link">{email}</li>
              <Link className="nav-item nav-link" to="/settings">
                Settings
              </Link>
              <li
                className="nav-item nav-link"
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  auth.signOut();
                  history.push('/login');
                }}
              >
                Logout
              </li>
            </div>
          ) : null}
          {!isAuthentiated && allowRegistration ? (
            <div className="navbar-nav ml-auto">
              <li
                className="nav-item nav-link active"
                style={{ cursor: 'pointer' }}
                onClick={() => history.push('/login')}
              >
                Login
              </li>
              <Link className="nav-item nav-link active" to="/register">
                Register
              </Link>
            </div>
          ) : null}
        </div>
      </div>
    </nav>
  );
}

const mapStateToProps = state => ({
  allowRegistration: selectAllowRegistration(state)
});

export default connect(mapStateToProps)(withRouter(Navbar));

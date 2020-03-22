import React from 'react';
import { connect } from 'react-redux';
import { auth } from '../../firebase/firebase.utils';
import { notifyUser } from '../../redux/notify/notify.actions';
import Alert from '../Layout/Alert';

function Login({ history, notifyUser }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleEmail = e => {
    setEmail(e.target.value);
  };
  const handlePassword = e => {
    setPassword(e.target.value);
  };
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await auth.signInWithEmailAndPassword(email, password);
      setPassword('');
      setEmail('');
      history.push('/');
    } catch (error) {
      notifyUser('Invalid Login Credentials', 'error');
    }
  };
  return (
    <div>
      <div className="row mt-4">
        <div className="col-md-6 mx-auto">
          <div className="card">
            <div className="card-body">
              {<Alert />}
              <h1 className="text-center py-3">
                <span className="text-primary">
                  <i className="fas fa-lock"></i> Login
                </span>
              </h1>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="text"
                    name="email"
                    className="form-control"
                    value={email}
                    required
                    onChange={handleEmail}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    value={password}
                    required
                    onChange={handlePassword}
                  />
                </div>
                <input
                  type="submit"
                  value="Login"
                  className="btn btn-primary btn-block"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapDispatchToProps = dispatch => ({
  notifyUser: (message, messageType) =>
    dispatch(notifyUser(message, messageType))
});

export default connect(null, mapDispatchToProps)(Login);

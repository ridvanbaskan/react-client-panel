import React from 'react';
import { connect } from 'react-redux';
import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';
import { notifyUser } from '../../redux/notify/notify.actions';
import Alert from '../Layout/Alert';

function Register({ history, notifyUser }) {
  const [email, setEmail] = React.useState('');
  const [name, setName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');

  const handleEmail = e => {
    setEmail(e.target.value);
  };
  const handleName = e => {
    setName(e.target.value);
  };
  const handlePassword = e => {
    setPassword(e.target.value);
  };
  const handleConfirmPassword = e => {
    setConfirmPassword(e.target.value);
  };
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      await createUserProfileDocument(user, { name });
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      history.push('/');
    } catch (error) {
      notifyUser('User Already Registered...', 'error');
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
                  <i className="fas fa-lock"></i> Register
                </span>
              </h1>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    value={name}
                    required
                    onChange={handleName}
                  />
                </div>
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
                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    className="form-control"
                    value={confirmPassword}
                    required
                    onChange={handleConfirmPassword}
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

export default connect(null, mapDispatchToProps)(Register);

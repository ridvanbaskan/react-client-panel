import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { firestore } from '../../firebase/firebase.utils';
import { withRouter } from 'react-router-dom';
import { selectDisableBalanceOnAdd } from '../../redux/settings/settings.selectors';

function AddClient({ history, disableBalanceOnAdd }) {
  console.log(disableBalanceOnAdd);
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [balance, setBalance] = React.useState('');

  const handleFirstName = e => {
    setFirstName(e.target.value);
  };
  const handleLastName = e => {
    setLastName(e.target.value);
  };
  const handleEmail = e => {
    setEmail(e.target.value);
  };
  const handlePhone = e => {
    setPhone(e.target.value);
  };
  const handleBalance = e => {
    setBalance(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const newClient = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phone,
      balance: balance
    };

    if (newClient.balance === '') {
      newClient.balance = 0;
    }

    firestore
      .collection('clients')
      .add(newClient)
      .then(() => history.push('/'))
      .catch(error => {
        console.error('Error writing document: ', error);
      });
  };
  return (
    <div className="mt-4">
      <div className="row mb-3">
        <div className="col-md-6">
          <Link to="/" className="btn btn-link">
            <i className="fas fa-arrow-circle-left"></i> Back To Dashboard
          </Link>
        </div>
      </div>
      <div className="card">
        <div className="card-header">Add Client</div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                name="firstName"
                className="form-control"
                value={firstName}
                required
                onChange={handleFirstName}
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                name="lastName"
                className="form-control"
                value={lastName}
                required
                onChange={handleLastName}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                className="form-control"
                value={email}
                required
                onChange={handleEmail}
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="text"
                name="phone"
                className="form-control"
                value={phone}
                required
                onChange={handlePhone}
              />
            </div>
            <div className="form-group">
              <label htmlFor="balance">Balance</label>
              <input
                type="text"
                name="balance"
                className="form-control"
                value={balance}
                disabled={disableBalanceOnAdd}
                required
                onChange={handleBalance}
              />
            </div>
            <button className="btn btn-primary btn-block">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  disableBalanceOnAdd: selectDisableBalanceOnAdd(state)
});

export default connect(mapStateToProps)(withRouter(AddClient));

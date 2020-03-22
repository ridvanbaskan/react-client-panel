import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  selectClients,
  selectLoading
} from '../../redux/clients/client.selectors';
import WithSpinner from '../WithSpinner/WithSpinner';
import { firestore } from '../../firebase/firebase.utils';
import { selectDisableBalanceOnEdit } from '../../redux/settings/settings.selectors';

function EditClient({ client, history, disableBalanceOnEdit }) {
  const firstNameInput = useRef();
  const lastNameInput = useRef();
  const emailInput = useRef();
  const phoneInput = useRef();
  const balanceInput = useRef();

  const handleSubmit = e => {
    e.preventDefault();

    var updateRef = firestore.collection('clients').doc(client.id);

    // Set the "capital" field of the city 'DC'
    return updateRef
      .update({
        firstName: firstNameInput.current.value,
        lastName: lastNameInput.current.value,
        email: emailInput.current.value,
        phone: phoneInput.current.value,
        balance:
          balanceInput.current.value === '' ? 0 : balanceInput.current.value
      })
      .then(history.push('/'))
      .catch(function(error) {
        // The document probably doesn't exist.
        console.error('Error updating document: ', error);
      });
  };
  if (client) {
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
                  ref={firstNameInput}
                  defaultValue={client.firstName}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  className="form-control"
                  ref={lastNameInput}
                  defaultValue={client.lastName}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  ref={emailInput}
                  defaultValue={client.email}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  className="form-control"
                  ref={phoneInput}
                  defaultValue={client.phone}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="balance">Balance</label>
                <input
                  type="text"
                  name="balance"
                  className="form-control"
                  disabled={disableBalanceOnEdit}
                  ref={balanceInput}
                  defaultValue={client.balance}
                  required
                />
              </div>
              <button className="btn btn-primary btn-block">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  } else {
    return <WithSpinner />;
  }
}

const mapStateToProps = (state, ownProps) => ({
  client: selectClients(state).find(
    client => client.id === ownProps.match.params.id
  ),
  isLoading: selectLoading(state),
  disableBalanceOnEdit: selectDisableBalanceOnEdit(state)
});

export default connect(mapStateToProps)(EditClient);

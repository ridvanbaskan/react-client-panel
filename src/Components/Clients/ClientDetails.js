import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import WithSpinner from '../WithSpinner/WithSpinner';
import { toggleClick } from '../../redux/clients/clients.actions';
import {
  selectClients,
  selectLoading
} from '../../redux/clients/client.selectors';
import { firestore } from '../../firebase/firebase.utils';

function ClientDetails({ client, toggleClick, toggle, history }) {
  const [balanceAmount, setBalanceAmount] = React.useState('');
  console.log(client);
  const handleChange = e => {
    setBalanceAmount(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    var clientRef = firestore.collection('clients').doc(client.id);

    // Set the "capital" field of the city 'DC'
    return clientRef
      .update({
        balance: balanceAmount
      })
      .then(function() {
        console.log('Document successfully updated!');
      })
      .catch(function(error) {
        // The document probably doesn't exist.
        console.error('Error updating document: ', error);
      });
  };

  const handleClick = () => {
    var deleteRef = firestore.collection('clients').doc(client.id);
    return deleteRef
      .delete()
      .then(() => history.push('/'))
      .catch(error => {
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
          <div className="col-md-6">
            <div className="btn-group float-right">
              <Link
                to={`/client/edit/${client.id}`}
                className="btn btn-secondary"
              >
                Edit
              </Link>
              <button className="btn btn-danger" onClick={handleClick}>
                Delete
              </button>
            </div>
          </div>
        </div>
        <div className="card">
          <h3 className="card-header">
            {client.firstName} {client.lastName}
          </h3>
          <div className="card-body">
            <div className="row">
              <div className="col-md-8">
                <h4>
                  Client ID: <span className="text-secondary">{client.id}</span>
                </h4>
              </div>
              <div className="col-md-4">
                <h4 className="pull-right">
                  Balance:{' '}
                  <span className="text-danger">
                    ${parseFloat(client.balance).toFixed(2)}
                  </span>
                  <a href="#!" onClick={() => toggleClick()}>
                    <i className="fas fa-pencil-alt ml-2"></i>
                  </a>
                </h4>
                {toggle ? (
                  <form onSubmit={handleSubmit}>
                    <div className="input-group">
                      <input
                        type="text"
                        name="balanceAmount"
                        className="form-control"
                        value={balanceAmount}
                        onChange={handleChange}
                      />
                      <div className="input-group-append">
                        <input
                          type="submit"
                          value="Update"
                          className="btn btn-outline-dark"
                        />
                      </div>
                    </div>
                  </form>
                ) : null}
              </div>
            </div>
            <hr />
            <ul className="list-group">
              <li className="list-group-item">Contact Email: {client.email}</li>
              <li className="list-group-item">Phone Number: {client.phone}</li>
            </ul>
          </div>
        </div>
      </div>
    );
  } else {
    return <WithSpinner />;
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    client: selectClients(state).find(
      client => client.id === ownProps.match.params.id
    ),
    isLoading: selectLoading(state),
    toggle: state.client.toggleClick
  };
};

const mapDispatchToProps = dispatch => ({
  toggleClick: () => dispatch(toggleClick())
});

export default connect(mapStateToProps, mapDispatchToProps)(ClientDetails);

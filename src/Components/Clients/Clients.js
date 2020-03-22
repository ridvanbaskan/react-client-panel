import React from 'react';
import { connect } from 'react-redux';
import { fetchCollectionsStartAsync } from '../../redux/clients/clients.actions';
import { Link, withRouter } from 'react-router-dom';
import WithSpinner from '../WithSpinner/WithSpinner';
import {
  selectClients,
  selectLoading
} from '../../redux/clients/client.selectors';

function Clients({ fetchCollectionsStartAsync, clients, isLoading, history }) {
  React.useEffect(() => {
    fetchCollectionsStartAsync();
  }, [fetchCollectionsStartAsync]);

  if (clients) {
    const total = clients.reduce((total, client) => {
      return total + parseFloat(client.balance);
    }, 0);
    return (
      <div>
        <div className="row">
          <div className="col-md-6">
            <h2>
              <i className="fas fa-users"></i> Clients
            </h2>
          </div>
          <div className="col-md-6 d-flex align-items-center justify-content-end">
            <h5 className="text-right text-secondary">
              TotalOwed:{' '}
              <span className="text-primary">${total.toFixed(2)}</span>
            </h5>
          </div>
        </div>
        <table className="table table-striped mt-4">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Balance</th>
              <th scope="col" />
            </tr>
          </thead>
          <tbody>
            {clients.map(client => (
              <tr key={client.id}>
                <th scope="row">
                  {client.firstName} {client.lastName}
                </th>
                <td>{client.email}</td>
                <td>${parseFloat(client.balance).toFixed(2)}</td>
                <td>
                  <Link
                    className="btn btn-secondary btn-sm"
                    to={`/clients/${client.id}`}
                  >
                    <i className="fas fa-arrow-circle-right"></i> Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  } else {
    return <WithSpinner isLoading={isLoading} />;
  }
}

const mapStateToProps = state => ({
  clients: selectClients(state),
  isLoading: selectLoading(state)
});

const mapDispatchToProps = dispatch => ({
  fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Clients));

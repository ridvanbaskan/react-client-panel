import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  disableBalanceOnAdd,
  disableBalanceOnEdit,
  allowRegistration
} from '../../redux/settings/settings.actions';
import {
  selectDisableBalanceOnAdd,
  selectDisableBalanceOnEdit,
  selectAllowRegistration
} from '../../redux/settings/settings.selectors';

function Settings({
  disableBalanceOnAdd,
  disableBalanceOnEdit,
  allowRegistration,
  setDisableBalanceOnAdd,
  setDisableBalanceOnEdit,
  setAllowRegistration
}) {
  return (
    <div className="mt-4">
      <div className="row">
        <div className="col-md 6">
          <Link to="/" className="btn btn-link">
            <i className="fas fa-arrow-circle-left"></i> Back To Dashboard
          </Link>
        </div>
      </div>
      <div className="card">
        <div className="card-header">Edit Settings</div>
        <div className="card-body">
          <form>
            <div className="form-group">
              <label>Allow Registration</label>{' '}
              <input
                type="checkbox"
                name="allowRegistration"
                checked={allowRegistration}
                onChange={() => setAllowRegistration()}
              />
            </div>
            <div className="form-group">
              <label>Disable Balance On Add</label>{' '}
              <input
                type="checkbox"
                name="disableBalanceOnAdd"
                checked={disableBalanceOnAdd}
                onChange={() => setDisableBalanceOnAdd()}
              />
            </div>
            <div className="form-group">
              <label>Disable Balance on Edit</label>{' '}
              <input
                type="checkbox"
                name="disableBalanceOnEdit"
                checked={disableBalanceOnEdit}
                onChange={() => setDisableBalanceOnEdit()}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

const mapStatetoProps = state => ({
  disableBalanceOnAdd: selectDisableBalanceOnAdd(state),
  disableBalanceOnEdit: selectDisableBalanceOnEdit(state),
  allowRegistration: selectAllowRegistration(state)
});

const mapDispatchToProps = dispatch => ({
  setDisableBalanceOnAdd: () => dispatch(disableBalanceOnAdd()),
  setDisableBalanceOnEdit: () => dispatch(disableBalanceOnEdit()),
  setAllowRegistration: () => dispatch(allowRegistration())
});

export default connect(mapStatetoProps, mapDispatchToProps)(Settings);

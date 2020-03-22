import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';

function Alert({ message, messageType }) {
  return (
    <div
      className={classnames('alert', {
        'alert-success': messageType === 'success',
        'alert-danger': messageType === 'error'
      })}
    >
      {message}
    </div>
  );
}

const mapStateToProps = state => ({
  message: state.notify.message,
  messageType: state.notify.messageType
});

export default connect(mapStateToProps)(Alert);

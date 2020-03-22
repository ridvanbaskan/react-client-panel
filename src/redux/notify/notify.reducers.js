const INITIAL_STATE = {
  message: null,
  messageType: null
};

const notifyReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'ALERT_USER':
      return {
        ...state,
        message: action.message,
        messageType: action.messageType
      };
    default:
      return state;
  }
};

export default notifyReducer;

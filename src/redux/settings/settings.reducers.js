const INITIAL_STATE = {
  disableBalanceOnAdd: true,
  disableBalanceOnEdit: false,
  allowRegistration: false
};

const settingsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'DISABLE_BALANCE_ON_ADD':
      return {
        ...state,
        disableBalanceOnAdd: !state.disableBalanceOnAdd
      };
    case 'DISABLE_BALANCE_ON_EDIT':
      return {
        ...state,
        disableBalanceOnEdit: !state.disableBalanceOnEdit
      };
    case 'ALLOW_REGISTRATION':
      return {
        ...state,
        allowRegistration: !state.allowRegistration
      };
    default:
      return state;
  }
};

export default settingsReducer;

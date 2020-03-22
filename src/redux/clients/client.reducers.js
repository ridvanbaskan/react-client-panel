const INITIAL_STATE = {
  clients: null,
  isFetching: false,
  errorMessage: undefined,
  toggleClick: false
};

const clientReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'FETCH_COLLECTIONS_START':
      return {
        ...state,
        isFetching: true
      };
    case 'FETCHING_COLLECTIONS_SUCCESS':
      return {
        ...state,
        isFetching: false,
        clients: action.payload
      };
    case 'FETCHING_COLLECTIONS_FAILURE':
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload
      };
    case 'TOGGLE_CLICK':
      return {
        ...state,
        toggleClick: !state.toggleClick
      };
    default:
      return state;
  }
};

export default clientReducer;

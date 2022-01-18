import {
  GET_USER,
  USER_LOADING,
  USER_VERIFICATION,
  REMOVE_USER,
} from '../actions';

const user_reducer = (state, action) => {
  if (action.type === GET_USER) {
    console.log('user check');
    return {
      ...state,
      user: action.payload,
    };
  }
  if (action.type === USER_LOADING) {
    return {
      ...state,
      isLoading: false,
    };
  }
  if (action.type === USER_VERIFICATION) {
    return {
      ...state,
      verification: action.payload,
    };
  }
  if (action.type === REMOVE_USER) {
    return {
      ...state,
      user: null,
    };
  }

  throw new Error(`No matching ${action.type} - action type`);
};

export default user_reducer;

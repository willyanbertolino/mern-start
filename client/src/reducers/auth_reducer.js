import { GET_USER, USER_LOADING, USER_VERIFICATION } from '../actions';

const user_reducer = (state, action) => {
  if (action.type === GET_USER) {
    console.log('user check');
    return {
      ...state,
      // do something
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
      verification: true,
    };
  }

  throw new Error(`No matching ${action.type} - action type`);
};

export default user_reducer;

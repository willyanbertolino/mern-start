import { GET_USER } from '../actions';

const user_reducer = (state, action) => {
  if (action.type === GET_USER) {
    return {
      ...state,
      isLoading: false,
    };
  }

  throw new Error(`No matching ${action.type} - action type`);
};

export default user_reducer;

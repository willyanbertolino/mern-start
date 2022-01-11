import { LOAD, LOADED, SHOW_ALERT, HIDE_ALERT } from '../actions';

const global_reducer = (state, action) => {
  if (action.type === LOAD) {
    return {
      ...state,
      loading: true,
    };
  }
  if (action.type === LOADED) {
    return {
      ...state,
      loading: false,
    };
  }
  if (action.type === SHOW_ALERT) {
    return {
      ...state,
      alert: {
        show: true,
        text: action.payload.text,
        type: action.payload.type,
      },
    };
  }
  if (action.type === HIDE_ALERT) {
    return {
      ...state,
      alert: {
        show: false,
        text: '',
        type: 'danger',
      },
    };
  }

  throw new Error(`No matching ${action.type} - action type`);
};

export default global_reducer;

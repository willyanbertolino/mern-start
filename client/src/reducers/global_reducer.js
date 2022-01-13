import { SHOW_ALERT, HIDE_ALERT, ACTIVATE_LINK } from '../actions';

const global_reducer = (state, action) => {
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
  if (action.type === ACTIVATE_LINK) {
    return {
      ...state,
      activeLink: action.payload,
    };
  }

  throw new Error(`No matching ${action.type} - action type`);
};

export default global_reducer;

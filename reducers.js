import Store from './store';

export const initialState = Store;

export default function appGuideReducer(state = initialState, action) {
  // console.log("***** disclaimer reducer called *****", state, action);
  switch (action.type) {
    case 'VIEWED_APP_INFO': {
      return {
        ...state,
        viewed: true,
      };
    }
    default:
      return state;
  }
}

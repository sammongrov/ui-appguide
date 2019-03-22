import appGuideReducer from '../reducers';

it('initial state is correct', () => {
  const action = { type: 'DELETE_APP_GUIDE' };
  const initialState = { viewed: false };

  expect(appGuideReducer(undefined, action)).toEqual(initialState);
});

it('appGuideReducer returns the correct state', () => {
  const action = { type: 'VIEWED_APP_INFO' };
  const expectedState = { viewed: true };

  expect(appGuideReducer(undefined, action)).toEqual(expectedState);
});


const initialState = [];

export default function(state = initialState, action) {
  const { type, payload } = action;
  console.log(type, payload)
  switch (type) {
    case 'SET_ALERT':
      return [payload];
    case 'REMOVE_ALERT':
      return (state = []);
    default:
      return state;
  }
}

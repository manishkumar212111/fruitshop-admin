import { combineReducers } from "redux";

import alert from "./alert";
import auth from "./auth";
import user from "./user";




const initialState = {
    sidebarShow: 'responsive'
  }
  
 const changeState = (state = initialState, { type, ...rest }) => {
    switch (type) {
      case 'set':
        return {...state, ...rest }
      default:
        return state
    }
  }
const appReducers = combineReducers({
    changeState,
    alert,
    auth,
    user,
});

const rootReducer = (state, action) => {
    return appReducers(state, action);
}

export default rootReducer;

const initialState = {
    userDetail: [],
    update_user_loading : false
  };
  
  export default function(state = initialState, action) {
    const { type , data } = action;
    console.log(type , data, "inauth")
    switch ( type ) {
        case 'REGISTER_USER':
          return {...state, userDetail :  data};
        case 'LOGIN_USER':
            return {...state, userDetail :  data};
        case 'UPDATE_USER_LOADING':
            return {...state, update_user_loading :  data};
        case 'UPDATE_USER':
          let userData = {
            user : data,
            tokens : JSON.parse(localStorage.getItem('userDetail')).tokens
          }
          return {...state, userDetail: userData, update_user_loading :  false};
      
        default: return state;
    }
  }
  

const initialState = {
    userDetail: [],
    user_detail_loading : true,
    users: [],
    totalPages : 1,
    productList : []
  };
  
  export default function(state = initialState, action) {
    const { type , data } = action;
    switch ( type ) {
        case 'USER_DETAIL_LOADING' : 
            return {...state , user_detail_loading : true};
        case 'USER_DETAIL':
          return {...state , userDetail : data , user_detail_loading : false};
        case "USER_LIST":
          return {...state, users :  data.results, totalPages : data.totalPages};
        case "PRODUCT_LIST":
          return {...state, productList :  data.results, totalPages : data.totalPages};
        case 'SINGLE_PRODUCT_DETAIL' :
          return {...state , productDetail : data , product_detail_loading : false};
  
        case "PRODUCT_DETAIL_LOADING":
          return {...state, product_detail_loading : data};
        case "PAGE_LOADING":
          return {...state, loading : true};
        case "REMOVE_LOADING":
          return {...state, loading : false };
        default: return state;
    }
  }
  
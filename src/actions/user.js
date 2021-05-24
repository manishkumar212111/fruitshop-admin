import { setAlert } from "./alert";
import API from "../API";
// import { clearUserData } from '../utils/globals'

export const getUsers = ( page = 1) => ( dispatch ) =>{
  dispatch({
      type : "PAGE_LOADING",
      data : {}
  })
  API.get('Users', {page : page , role: "user"} , "" , function(res){
    dispatch( 
      { type: "USER_LIST",
        data : res.data
      }
    );
    dispatch({
      type : "REMOVE_LOADING",
      data : {}
    })
  })
}

export const getProductList = (options) => dispatch =>{
  try{
      dispatch({
          type : "PRODUCT_DETAIL_LOADING",
          data : true
      })
    API.get('productList' , options, '' , function(res){
      
      if(res && res.data){
          dispatch( { type: "PRODUCT_LIST",
            data : res.data
          });
        } else {
            //console.log(res.data.message);
            res && res.data && dispatch(setAlert(res.data.message , 'danger'));    
        }

      dispatch({
        type : "PRODUCT_DETAIL_LOADING",
        data : false
      })
    })
    
  } catch (err) {
    console.log(err)
    console.log(err)
  }
}

export const deleteProductById = (id , options) => dispatch =>{
  try{
      dispatch({
          type : "PRODUCT_DETAIL_LOADING",
          data : true
      })
    API.delete('productList' , {}, id , function(res){
      
      if(res && res.data){
          dispatch(setAlert("product deleted successfully" , 'success'));    
          dispatch(getProductList(options))
          // dispatch( { type: "PRODUCT_LIST",
          //   data : res.data
          // });
        } else {
            //console.log(res.data.message);
            res && res.data && dispatch(setAlert(res.data.message , 'danger'));    
        }

      dispatch({
        type : "PRODUCT_DETAIL_LOADING",
        data : false
      })
    })
    
  } catch (err) {
    console.log(err)
    console.log(err)
  }
}

export const UpdateUserById = (userId , data) => dispatch =>{
    try{
        dispatch({
            type : "UPDATING_USER",
            data : {}
        })
      API.patch('UpdateUserById' , data , userId , function(res){
        
        if(res && res.data.email) {
            dispatch( { type: "USER_DETAIL",
              data : res.data
            });
            dispatch(setAlert("Details updated successfully" , 'success'));    
          } else {
              //console.log(res.data.message);
              res && res.data && dispatch(setAlert(res.data.message , 'danger'));    
          }
      })
      
    } catch (err) {
      console.log(err)
      console.log(err)
    }
  }
  
  export const changePassword = (data) => dispatch =>{
    try{
        dispatch({
            type : "UPDATING_USER",
            data : {}
        })
      API.post('changePassword' , data , '' , function(res){
        console.log(res , "in change password");  
        if(res && res.data.email) {
            dispatch( { type: "USER_DETAIL",
              data : res.data
            });
            dispatch(setAlert("Details updated successfully" , 'success'));    
          } else {
              //console.log(res.data.message);
              res && res.data && dispatch(setAlert(res.data.message , 'danger'));    
          }
      })
      
    } catch (err) {
      console.log(err)
      console.log(err)
    }
  }

  export const changeEmail = (data) => dispatch =>{
    try{
        dispatch({
            type : "UPDATING_USER",
            data : {}
        })
      API.post('changeEmail' , data , '' , function(res){
        console.log(res , "in change password");  
        if(res && res.data.email) {
            dispatch( { type: "USER_DETAIL",
              data : res.data
            });
            dispatch(setAlert("Details updated successfully" , 'success'));    
          } else {
              //console.log(res.data.message);
              res && res.data && dispatch(setAlert(res.data.message , 'danger'));    
          }
      })
      
    } catch (err) {
      console.log(err)
      console.log(err)
    }
  }

  export const deleteMyAccount = (userId) => dispatch =>{
    try{
        dispatch({
            type : "UPDATING_USER",
            data : {}
        })
      API.delete('DeleteAccount' , {} , userId , function(res){
        console.log(res);
        if(res && res.data && !res.data.message) {
            dispatch( { type: "USER_DETAIL",
                data : res.data
              });
            dispatch(setAlert("Account deleted successfully" , 'success'));    
            // clearUserData();
              if(typeof window !== 'undefined'){
                window.location.href="/";
              }

          } else {
              //console.log(res.data.message);
              res && res.data && dispatch(setAlert(res.data.message , 'danger'));    
          }
      })
      
    } catch (err) {
      console.log(err)
      console.log(err)
    }
  }

  export const createProduct = (data) => dispatch =>{
    try{
        dispatch({
            type : "PRODUCT_DETAIL_LOADING",
            data : true
        })
      API.post('productList' , data , '' , function(res){
        if(res && res.data && res.data.id) {
            // dispatch(getProductByUserId());
            dispatch(setAlert("Product added" , 'success'));
            setTimeout(() => {
              window.location.href="/#/admin/products";
            }, 1000)
          } else {
              //''
              res && res.data && dispatch(setAlert(res.data.message , 'danger'));    
          }
          dispatch({
              type : "PRODUCT_DETAIL_LOADING",
              data : false
          })
      })
      
    } catch (err) {
      
    }
  }

  export const getProductById = (productId) => dispatch =>{
    try{
        dispatch({
            type : "PRODUCT_DETAIL_LOADING",
            data : true
        })
      API.get('productList' , {}, productId , function(res){
        
        if(res && res.data){
            dispatch( { type: "SINGLE_PRODUCT_DETAIL",
              data : res.data
            });
          } else {
              //''
              res && res.data && dispatch(setAlert(res.data.message , 'danger'));    
          }
          dispatch({
              type : "PRODUCT_DETAIL_LOADING",
              data : false
          })
      })
      
    } catch (err) {
      
    }
  }

  export const bulkUpload = (userId , files , options) => dispatch =>{
    try{
        dispatch({
            type : "PRODUCT_DETAIL_LOADING",
            data : true
        })
        console.log(userId , files)
        let data = new FormData();
        data.append("userId", userId);
        data.append("file", files);

      API.post('productUpload' , data ,  '', function(res){
        
        if(res && res.data) {
            dispatch(setAlert("Details updated successfully" , 'success'));    
            dispatch(getProductList(options))
            
            // setTimeout(() => {
            //   window.location.href="/#/admin/products";
            // }, 500)
            
          } else {
              //''
              res && res.data && dispatch(setAlert(res.data.message , 'danger'));    
          }
          dispatch({
            type : "PRODUCT_DETAIL_LOADING",
            data : false
        })
      })
      
    } catch (err) {
      
    }
  }

  export const updateProductById = (productId , data) => dispatch =>{
    try{
        dispatch({
            type : "PRODUCT_DETAIL_LOADING",
            data : true
        })
      API.patch('productList' , data , productId , function(res){
        
        if(res && res.data.id) {
            dispatch(setAlert("Details updated successfully" , 'success'));    
            setTimeout(() => {
              window.location.href="/#/admin/products";
            }, 500)
            
          } else {
              //''
              res && res.data && dispatch(setAlert(res.data.message , 'danger'));    
          }
          dispatch({
            type : "PRODUCT_DETAIL_LOADING",
            data : false
        })
      })
      
    } catch (err) {
      
    }
  }

  
  
  
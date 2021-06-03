import React, { useEffect, useState } from 'react';
import validateUtility from "../../utils/ValidateUtility";
import CKEditor from "ckeditor4-react";


import { createProduct , getProductById, updateProductById } from "../../actions/user";
import { connect } from "react-redux";
import {
  CButton,
  CSelect,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormText,
  CFormGroup,
  CTextarea,
  CInput,
  CLabel,
  CRow,
  CSpinner,
  CListGroupItem,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter
} from '@coreui/react';

const categories = [
  {text : "Beauty" , id: "beauty" , status : false},
  {text : "Food & Drink" , id: "food&drink"  , status : false},
  {text : "Health & Wellness" , id: "health&wellness" , status : false},
  {text : "Home & Living" , id: "home&living" , status : false},
  {text : "Fashion" , id: "fashion" , status : false},
]

const defaultProps = {
    fieldObj : {
        brandName: '',
        productName: "",
        productDescription: '',
        productType: "",
        category: 'beauty',
        imageType: "square",
        imgUrl: '',
        price : "",
        user_type : "admin",
        weight : 0,
        sold_at : ""
    }
}

const ProductForm = (props) => {
    const [ isEdit , setIsEdit] = useState(props.match && props.match.params && props.match.params.id ? props.match.params.id : false)
    
    const [ fieldObj , setfieldObj ] = useState(defaultProps.fieldObj)
    const [errorObj , setErrorObj] = useState(
        {   brandName : { error : true , msg : "It should be valid" } , 
            productName : { error : true , msg : "It should be valid" },
            productType : { error : true , msg : "It should be valid" },
            category : { error : true , msg : "It should be valid" },
            productDescription : { error : true , msg : "It should be valid" },
            imageType : { error : true , msg : "It should be valid" },
            imgUrl : { error : true , msg : "It should be valid" },
            price: { error : true , msg : "It should be valid" },
            weight: { error : true , msg : "It should be valid" },
            sold_at: { error : true , msg : "It should be valid" },

        })
    
    
    useEffect(() => {
        if(isEdit){
            props.getProductById(isEdit)
        }
    }, [isEdit]);

    useEffect(() => {
      props.fieldObj && props.fieldObj.id && setfieldObj(
          {
            brandName: props.fieldObj.brandName,
            productName: props.fieldObj.productName,
            productDescription: props.fieldObj.productDescription,
            productType: props.fieldObj.productType ? props.fieldObj.productType : "men", 
            category: props.fieldObj.category ? props.fieldObj.category : "beauty",
            imageType: props.fieldObj.imageType ? props.fieldObj.imageType : "square",
            imgUrl: props.fieldObj.imgUrl,
            price : props.fieldObj.price,
            user_type : "admin",
            weight : props.fieldObj.weight ? props.fieldObj.weight : 0,
            sold_at : props.fieldObj.sold_at ? props.fieldObj.sold_at : ""
        })
    }, [props.fieldObj]);
    

    const handleChange = (e , key , value) => {
        
        console.log(value)
        let field = {};
        field[key] = value ? value : e.target.value;
        setfieldObj(fieldOb => ({...fieldOb , ...field}))
       
        let errOb = {}
        errOb[key] = { error : validateField(key , value ? value : e.target.value) , msg : errorObj[key].msg};            
        setErrorObj( er => ( { ...er , ...errOb}))
          
        
        
    }
      
    const validateField = (key , value) => {
        value = value ? value : fieldObj[key] 

        switch(key) {
            case "brandName":
            case "productName" :
            case "productDescription":  
            case "imageType":
            case "imgUrl":
            case "product_type":
            case "category":
            case "price":
            case "weight":
            case "sold_at":
                return  validateUtility.required(value)
            
            default :
                return true;
        }
    }
    
    const handleClick = () => {
        let requiredObj = ['productName', 'brandName' , 'productDescription','imgUrl','price'];
        let errOb = errorObj;

        let status = true;
        requiredObj.forEach(element => {
            let errorStatus = validateField(element);
            errOb[element].error = errorStatus;
            status = status && errorStatus;
        })
        setErrorObj( errorOb => ( { ...errorOb , errOb}))
        if(!status)
            return;

        for(var i in fieldObj){
          if(fieldObj[i] == ""){
            delete fieldObj[i]
          }
        }

        if(isEdit){
            props.updateProductById(isEdit , fieldObj)
            return;
        }
        props.createProduct(fieldObj)  

    }

    if(props.loading){
        return (
            <CSpinner
                color="primary"
                style={{width:'4rem', height:'4rem', margin:"30% 50%" }}
            />
        )
    }
    console.log(fieldObj)
    return (
    <>
      <CRow>
        <CCol xs="12" sm="6"  style={{"margin-top" : "10px"}}>
          <CCard>
            <CCardHeader>
              Product Detail
              {/* <small> Form</small> */}
            </CCardHeader>
            <CCardBody>
              <CFormGroup>
                <CLabel htmlFor="name">Brand Name *</CLabel>
                <CInput id="brandName" name="brandName" value={fieldObj.brandName} onChange={(e) => handleChange(e , 'brandName')} placeholder="Enter brandName" />
                {!errorObj.brandName.error && <CFormText className="help-block error">{errorObj.brandName.msg}</CFormText>}
              
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="name">Product Name </CLabel>
                <CInput id="productName" name="productName" value={fieldObj.productName} onChange={(e) => handleChange(e , 'productName')} placeholder="Enter productName" />
                {!errorObj.productName.error && <CFormText className="help-block error">{errorObj.productName.msg}</CFormText>}
              
              </CFormGroup>
              
              <CFormGroup>
                <CLabel htmlFor="content">Product description *</CLabel>
                <CKEditor
                    data={fieldObj.productDescription ? fieldObj.productDescription.replaceAll('&lt;','<') : "Write content here"}
                    config={{
                      height: 200,
                      toolbar: [
                        ["Cut", "Copy", "Paste"],
                        ["Undo", "Redo"],
                        ["SpellChecker"],
                        ["Link", "Unlink", "Anchor"],
                        [
                          "Image",
                          "Table",
                          "Horizontal Line",
                          "Special Character"
                        ],
                        ["Maximize"],
                        ["Source"],
                        ["Bold", "Italic", "Strike"],
                        ["RemoveFormat"],
                        ["NumberedList", "BulletedList"],
                        ["DecreaseIndent", "IncreaseIndent"],
                        ["BlockQuote"],
                        ["Styles"],
                        ["Format"],
                        ["About"]
                      ]}}
                    onReady={ editor => {
                        // You can store the "editor" and use when it is needed.
                        console.log( 'Editor is ready to use!', editor );
                    } }
                    onChange={ ( event, editor ) => {
                        const data = event.editor.getData();
                        console.log(data);
                        handleChange(event , 'productDescription' , data)
                    } }
                    onBlur={ ( event, editor ) => {
                        console.log( 'Blur.', editor );
                    } }
                    onFocus={ ( event, editor ) => {
                        console.log( 'Focus.', editor );
                    } }
                    onBeforeLoad={ ( CKEDITOR ) => ( CKEDITOR.disableAutoInline = true ) }

                />
                {!errorObj.productDescription.error && <CFormText className="help-block">{errorObj.productDescription.msg}</CFormText>}
              
              </CFormGroup>
              {/* <CFormGroup>
                <CLabel htmlFor="metaDescription">Meta Description * </CLabel>
                <CInput type="text" id="validity" name="metaDescription" value={fieldObj.metaDescription} onChange={(e) => handleChange(e , 'metaDescription')} placeholder="Enter Meta Description" />
                {!errorObj.metaDescription.error && <CFormText className="help-block">{errorObj.metaDescription.msg}</CFormText>}
              
              </CFormGroup> */}
              
              <CFormGroup>
                    <CLabel htmlFor="imgUrl">Product Type</CLabel>
                    <CInput id="productType" name="productType" value={fieldObj.productType} onChange={(e) => handleChange(e , 'productType')} placeholder="Enter product type" />
                    {!errorObj.productType.error && <CFormText className="help-block error">{errorObj.productType.msg}</CFormText>}
              </CFormGroup>
                    {/* <CLabel htmlFor="productType">Product Type * </CLabel>
                    <CSelect name="productType" id="productType" value={fieldObj.productType} onChange={(e) => handleChange(e , 'productType')} >
                        <option value={"men"}>men</option>
                        <option value={"women"}>women</option>
                        <option value={"kids"}>kids</option>
                        <option value={"all"}>all</option>

                    </CSelect> */}
                <CFormGroup>
                    <CLabel htmlFor="category">Category </CLabel>
                    <CSelect name="category" id="productType" value={fieldObj.category} onChange={(e) => handleChange(e , 'category')} >
                        {
                          categories.map(itm => (
                            <option value={itm.id}>{itm.text}</option>
                          ))
                        }
                    </CSelect>
                </CFormGroup>

                <CFormGroup>
                    <CLabel htmlFor="imgUrl">Image Url * </CLabel>
                    <CInput id="imgUrl" name="imgUrl" value={fieldObj.imgUrl} onChange={(e) => handleChange(e , 'imgUrl')} placeholder="Enter imgUrl" />
                    {!errorObj.imgUrl.error && <CFormText className="help-block error">{errorObj.imgUrl.msg}</CFormText>}
              </CFormGroup>
              {/* <CFormGroup>
                    <CLabel htmlFor="imageType">ImageType </CLabel>
                    <CSelect name="imageType" id="imageType" value={fieldObj.imageType} onChange={(e) => handleChange(e , 'imageType')} >
                        <option value={"square"}>Square</option>
                        <option value={"vertical"}>Vertical</option>
                    </CSelect>
                </CFormGroup> */}
              <CFormGroup>
                    <CLabel htmlFor="price">Price * </CLabel>
                    <CInput type="number" id="price" name="price" value={fieldObj.price} onChange={(e) => handleChange(e , 'price')} placeholder="Enter price" />
                    {!errorObj.price.error && <CFormText className="help-block error">{errorObj.price.msg}</CFormText>}
              </CFormGroup>
              
              <CFormGroup>
                    <CLabel htmlFor="weight">Weight  </CLabel>
                    <CInput type="number" id="weight" name="weight" value={fieldObj.weight} onChange={(e) => handleChange(e , 'weight')} placeholder="Enter weight ( lbs) " />
                    {!errorObj.weight.error && <CFormText className="help-block error">{errorObj.weight.msg}</CFormText>}
              </CFormGroup>
              
              <CFormGroup>
                    <CLabel htmlFor="sold_at">Sold At  </CLabel>
                    <CInput type="sold_at" id="sold_at" name="sold_at" value={fieldObj.sold_at} onChange={(e) => handleChange(e , 'sold_at')} placeholder="Enter sold at" />
                    {!errorObj.sold_at.error && <CFormText className="help-block error">{errorObj.sold_at.msg}</CFormText>}
              </CFormGroup>
                <CButton block color="primary" variant="outline"  onClick={handleClick} value="Submit">{isEdit ? "Update" : "Submit"}</CButton>
            </CCardBody>
          </CCard>

        </CCol>
       
      </CRow>
    </>
  )
}

const mapStateToProps = ( state ) => ( {
    loading : state.user.product_detail_loading,
    fieldObj : state.user.productDetail
  } );
  
  const mapDispatchToProps = {
    createProduct,
    getProductById,
    updateProductById
  };
  
    ProductForm.defaultProps = defaultProps;

  export default connect( mapStateToProps, mapDispatchToProps )( ProductForm );
  
  
  


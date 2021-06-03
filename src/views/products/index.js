import React, { useState, useEffect } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom';

import { getProductList,deleteProductById ,bulkUpload } from "../../actions/user";
import { connect } from "react-redux";

import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CPagination,
  CSpinner,
  CButton,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter
} from '@coreui/react'
import CIcon from '@coreui/icons-react';
import { getUserData } from 'src/utils/globals';


const getBadge = status => {
  if(status){
    return 'success'
  } else {
    return 'danger'
  }
}

const ProductList = (props) => {
    console.log(props)
  const history = useHistory()
  const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)
  const [page, setPage] = useState(currentPage)
  const [productList , setUser] = useState(props.productList)
  const [description , setDescription] = useState(null);
  const pageChange = newPage => {
    currentPage !== newPage && history.push(`/admin/products?page=${newPage}`)
  }

  useEffect(() => {
    currentPage !== page && setPage(currentPage)
  }, [currentPage, page]);

  useEffect(() => {
    setUser(props.productList)
  }, [props.productList]);

  useEffect(() => {
    props.getProductList({page : currentPage, user_type : "admin"});
  }, [props.getProductList , currentPage]);
  
  const toggle = () => {
      setDescription(null);
  }

  const handleDelete= (id) => {
    props.deleteProductById(id , {page : currentPage, user_type : "admin"})
  }

  const handleCsv = () => {
    document.getElementById('fileid').click();
  }

  const handleFileUpload = (e) => {
    console.log(getUserData('id') , e.target.files[0])
    props.bulkUpload( getUserData('id'), e.target.files[0] , {page : currentPage, user_type : "admin"})
  }
  if(props.loading){
    return (
        <CSpinner
            color="primary"
            style={{width:'4rem', height:'4rem', margin:"30% 50%" }}
        />
    )
  }
  return (
    <CRow>
      <CCol xl={12}>
        <CCard>
          <CCardHeader>
            ProductList
            <input id='fileid' type='file' accept=".csv" onInput={(e) =>  handleFileUpload(e) } hidden/>
            <button className="btn btn-info" style={{float: "right"}} onClick={() => handleCsv()}>Csv Upload</button>
            <Link to="/admin/products/create"><button className="btn btn-success" style={{float: "center" ,"margin-left" : "20px"}}>Create</button></Link>

            {/* <small className="text-muted"> example</small> */}
          </CCardHeader>
          <CCardBody>
          <CDataTable
            items={productList}
            fields={[
               'id', 
              { key: 'brandName',label:'Brand Name' },
              { key: 'productName',label:'Product Name' },
              { key: 'productDescription',label:'Product Description' },
              { key: 'sold_at',label:'Sold At' },
              { key: 'weight',label:'Weight' },

              { key: 'imgUrl' , label: "Image"},
              // { key: 'url',label:'Product Link' },
              "Actions"
            //   { key: 'promoCode',label:'Promo Code', _classes: 'font-weight-bold' },
              
            //   'email','category', 'createdAt', 'status', 'Products'
            ]}
            hover
            striped
            // itemsPerPage={1}
            // activePage={currentPage}
            // columnFilter
            // tableFilter
            // clickableRows
            // onRowClick={(item) => history.push(`/users/${item.id}`)}
            scopedSlots = {{
              'url':
                (item, index)=>(
                  <td>
                    <CBadge>
                      <a href={item.url} target="_blank">{item.url}</a>
                    </CBadge>
                  </td>
                ),
                'productDescription':
                (item, index)=>{
                  return(<td>{item.productDescription.substr(0,50)} {item.productDescription.length > 50 ? <span onClick={() => setDescription(item.productDescription)} style={{color : "blue", cursor: "pointer"}}> view more</span> : ""}</td>)
                },
                'Products':
                (item) => {
                  return(<td><CBadge><Link to={`/products/${item.id}`}>View All</Link></CBadge></td>)
                },
                'imgUrl':
                (item) => {
                  return(<td><img width="50" height="50" src={item.imgUrl}></img></td>)
                },
                "Actions":
                (item) => {
                  return(<td>
                    <Link to={`/admin/products/${item.id}`}><CIcon style={{ color : "green", margin:"5px" , cursor: "pointer"}} name="cil-pencil"/></Link>
                    <span style={{cursor:"pointer"}} onClick={() => handleDelete(item.id)}><img width="25" height="25" src="https://img.icons8.com/plasticine/50/000000/filled-trash.png"/></span>
                  </td>)
                }
            }}
          />
          <CPagination
            activePage={currentPage}
            onActivePageChange={pageChange}
            pages={props.totalPages}
            doubleArrows={false} 
            align="center"
          />
          </CCardBody>
        </CCard>
      </CCol>
      {description != null && 
            <CModal
            show={true}
            onClose={toggle}
          >
            <CModalHeader closeButton>Description</CModalHeader>
            <CModalBody>
            {description}
            </CModalBody>
            <CModalFooter>
              <CButton
                color="secondary"
                onClick={toggle}
              >Close</CButton>
            </CModalFooter>
          </CModal>
        }  
    </CRow>
  )
}

const mapStateToProps = ( state ) => ( {
  productList: state.user.productList,
  totalPages: state.user.totalPages,
  loading : state.user.product_detail_loading

} );

const mapDispatchToProps = {
  getProductList,
  deleteProductById,
  bulkUpload
};

export default connect( mapStateToProps, mapDispatchToProps )( ProductList );



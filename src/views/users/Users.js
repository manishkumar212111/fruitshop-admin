import React, { useState, useEffect } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom';

import { getUsers } from "../../actions/user";
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
  CSpinner
} from '@coreui/react'

import usersData from './UsersData'

const getBadge = status => {
  if(status){
    return 'success'
  } else {
    return 'danger'
  }
}

const Users = (props) => {
  const history = useHistory()
  const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)
  const [page, setPage] = useState(currentPage)
  const [users , setUser] = useState(props.users)
  
  const pageChange = newPage => {
    currentPage !== newPage && history.push(`/users?page=${newPage}`)
  }

  useEffect(() => {
    currentPage !== page && setPage(currentPage)
  }, [currentPage, page]);

  useEffect(() => {
    setUser(props.users)
  }, [props.users]);

  useEffect(() => {
    props.getUsers(currentPage);
  }, [props.getUsers , currentPage]);
  
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
            Users
            {/* <small className="text-muted"> example</small> */}
          </CCardHeader>
          <CCardBody>
          <CDataTable
            items={users}
            fields={[
              { key: 'userName',label:'User Name', _classes: 'font-weight-bold' },
              'email','category',
              {key:'logoUrl', lable : "Logo Url"},
               'createdAt', 'status', 'Products'
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
              'status':
                (item)=>(
                  <td>
                    <CBadge color={getBadge(item.status)}>
                      {item.status ? 'Active' : 'InActive'}
                    </CBadge>
                  </td>
                ),
                'category':
                (item, index)=>{
                  return(<td>{item.category.join(',')}</td>)
                },
                'Products':
                (item) => {
                  return(<td><CBadge><Link to={`products/${item.id}`}>View All</Link></CBadge></td>)
                },
                'logoUrl':
                (item) => {
                  return(<td><img width="50" height="50" src={item.style.logoUrl} /></td>)
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
    </CRow>
  )
}

const mapStateToProps = ( state ) => ( {
  users: state.user.users,
  totalPages: state.user.totalPages,
  loading : state.user.loading

} );

const mapDispatchToProps = {
  getUsers
};

export default connect( mapStateToProps, mapDispatchToProps )( Users );



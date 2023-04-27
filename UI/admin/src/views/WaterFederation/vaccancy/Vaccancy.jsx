import React, { useState, useEffect, useMemo, useRef } from 'react'

import axios from 'axios'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
import {
  CCard,
  CCardBody,
  CCardImage,
  CCol,
  CCardTitle,
  CCardText,
  CRow,
  CCardHeader,
  CCardLink,
  CCallout,
  CModalBody,
  CButton,
  CModal,
  CModalTitle,
  CModalHeader,
} from '@coreui/react'

import { urlVaccancy, assetUrl } from 'src/endpoints'
import { MDBCol, MDBRow, MDBCard, MDBCardBody, MDBCardImage } from 'mdb-react-ui-kit'
import dateFormat from 'dateformat'
import CIcon from '@coreui/icons-react'
import { cilPencil, cilObjectGroup } from '@coreui/icons'

import { HubConnectionBuilder, LogLevel, HttpTransportType } from '@microsoft/signalr'
import { customToast } from 'src/components/customToast'
import Pagination from 'src/components/Pagination'

let PageSize = 3

function Vaccancys({ user ,setIsLodding }) {
  const [vaccancys, setVaccancys] = useState([])
  const [visibleXL, setVisibleXL] = useState(false)
  const [vacc, setVacc] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  //const [toggle, setToggle] = useState(false);

  const handleToggle = (item) => {
    
   // setToggle(!toggle);
   handleSubmit(item)
  
  };

  const handleSubmit = async (item) => {      
    setIsLodding(true)  

    const formData = new FormData();      
    formData.set('Title', item.title)
    formData.set('AmharicTitle', item.amharicTitle)
    formData.set('ToDateTime', item.toDate)
    formData.set('FromDateTime', item.fromDate)
    formData.set('AmharicDescription', item.amharicDescription)
    formData.set('Description', item.description)
    formData.set('Company', item.company)
    formData.set('Email', item.email)

 
    try {

      await axios.put(urlVaccancy, formData).
      then((res) => {
        setIsLodding(false)
       
        customToast("Vaccancy Successfully update", 0)
      
        window.location.reload()

      }
      ).catch((err) => {
        setIsLodding(false)
        customToast(err,1)
        console.error(err)
      })

    }
    catch (error) {
      setIsLodding(false)
      customToast(error, 1)
      console.error(error)

    }
  }
  const naviagate = useNavigate()

  let connection = null
  const connectionRef = useRef(connection)

  useEffect(() => {
    getVaccancys()
  }, [])

  if (connection) {
    connection.on('getVaccancys', (result) => {
      setVaccancys(result)
      customToast('Vaccancy Updated', 0)
    })
  }

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize
    const lastPageIndex = firstPageIndex + PageSize
    return vaccancys.slice(firstPageIndex, lastPageIndex)
  }, [currentPage, vaccancys])

  const getVaccancys = () => {
    axios
      .get(urlVaccancy)
      .then((res) => {
        console.log(res.data)
       setVaccancys(res.data)
      })
      .catch((err) => console.error(err))
  }

  const addVaccancy = (e) => {
    e.preventDefault()
    naviagate('/vaccancy/create')
  }

  const getDate = (item) => {
    const startDate = moment(item)
    const timeEnd = moment(new Date())
    const diff = timeEnd.diff(startDate)
    const diffDuration = moment.duration(diff)
    return (
      diffDuration.days() +
      ' days ' +
      diffDuration.hours() +
      ' hrs ' +
      diffDuration.minutes() +
      ' mins'
    )
  }



  const navigateTo = (e, item) => {
    e.preventDefault()
    naviagate('/vaccancy/update', {
      state: {
      vaccancys: item,
      },
    })
  }

  return (
    <>
      <CModal size="xl" visible={visibleXL} onClose={() => setVisibleXL(false)}>
        <CModalHeader
          style={{
            backgroundColor: '#1e4356',
            color: '#fff',
          }}
        >
          <CModalTitle>Vaccancy Public View </CModalTitle>
          
      </CModalHeader>
     <CModalBody>
          <CCardBody>
            <MDBRow>
              <MDBCol lg="12">
                <MDBCard className="mb-4">
                  <MDBCardBody>
                    <h4 style={{ fontWeight: 'bold' }}>Position: {vacc.title} / {vacc.amharicTitle}</h4>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
              <MDBCol lg="6">
                <MDBCard className="mb-4">
                  <MDBCardBody>
                  <h6 style={{ fontWeight: 'bold' }} >From: {dateFormat(vacc.fromDateTime, 'mmm dd yyyy') } To {dateFormat(vacc.toDateTime, 'mmm dd yyyy') } </h6>    
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
              <MDBCol lg="6">
                <MDBCard className="mb-4">
                  <MDBCardBody>
                    <h6 style={{ fontWeight: 'bold' }}>Employer: {vacc.company}({vacc.email})</h6>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
              <MDBCol lg="6">
                <MDBCard className="mb-4">
                  <MDBCardBody>
                    <h6 style={{ fontWeight: 'bold' }}> Published By: {user.fullName}</h6>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>

              <MDBCol lg="12">
                <MDBCard className="mb-4">
                  <MDBCardBody>
                    <div dangerouslySetInnerHTML={{ __html: vacc.description }}></div>
                    <hr />
                    <div dangerouslySetInnerHTML={{ __html: vacc.amharicDescription }}></div>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </CCardBody>
        </CModalBody>
      </CModal>

      <CRow>
        <CCol xs={12}>
          <CCallout className="bg-white"></CCallout>
        </CCol>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader className="" style={{ backgroundColor: '#1e4356', color: '#fff' }}>
              <CRow>
                <CCol sm={10}>
                  <strong>Vaccancy</strong> <small>List</small>
                </CCol>
                <CCol sm={2} className="d-flex justify-content-end">
                  <CButton
                    className="text-right bg-white"
                    onClick={addVaccancy}
                    style={{ color: '#1e4356', borderColor: '#1e4356' }}
                    type="submit"
                  >
                    Add Vaccancy
                  </CButton>
                </CCol>
              </CRow>
            </CCardHeader>
            <CCardBody>
              <>
              <CRow>
                  {currentTableData.map((item) => (
                    <CCol lg={4} key={item.id}>
                      <CCard className="mb-3">
                        <CCardBody>
                          <CCardTitle>{item.title}</CCardTitle>
                          <CCardText>{item.subTitle}</CCardText>
                          <div className='row'>
                            <div className='col-8'>
                            <CCardText>
                            <small className="text-medium-emphasis">
                              created {getDate(item.createdAt)} ago <br />
                              {/* updated {item.updatedAt!="-infinity"&&getDate(item.updatedAt)} ago */}
                            </small>
                          </CCardText>
                            </div>
                          </div>
                        
                          <div className="d-flex justify-content-between">
                            <CCardLink
                              style={{ color: '#1e4356', cursor: 'pointer', textDecoration: 'none' }}
                              onClick={(e) => navigateTo(e, item)}
                            >
                              <CIcon icon={cilPencil} />
                              &nbsp; Edit
                            </CCardLink>
                            &nbsp;
                            <CCardLink
                              onClick={(e) => {
                                setVacc(item)
                                setVisibleXL(true)
                              }}
                              style={{ color: '#1e4356', cursor: 'pointer', textDecoration: 'none' }}
                            >
                              <CIcon icon={cilObjectGroup} />
                              &nbsp; Public View
                            </CCardLink>
                          </div>
                        </CCardBody>
                      </CCard>
                    </CCol>
                  ))}
                </CRow>
                <Pagination
                  className="pagination-bar"
                  currentPage={currentPage}
                  totalCount={vaccancys.length}
                  pageSize={PageSize}
                  onPageChange={(page) => setCurrentPage(page)}
                />
              </>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Vaccancys

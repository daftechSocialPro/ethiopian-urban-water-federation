import React, { useState, useEffect } from 'react'
import CIcon from '@coreui/icons-react'
import {
  CCol,
  CRow,
  CCallout,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CAvatar,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'

import moment from 'moment'
import dateformat from 'dateformat'
import { cilPeople, cilPencil } from '@coreui/icons'
import axios from 'axios'
import { assetUrl, urlSubscriber } from 'src/endpoints'

function Subscribers() {
  const [subscribe, setsubscribe] = useState([])

  useEffect(() => {
    axios
      .get(urlSubscriber)
      .then((res) => setsubscribe(res.data))
      .catch((err) => console.log(err))
  }, [])

  const getImage = (item) => {
    return `${assetUrl}/${item}`
  }
  const getDate = (item) => {
    const startDate = moment(item)
    const timeEnd = moment(new Date())
    const diff = timeEnd.diff(startDate)
    const diffDuration = moment.duration(diff)

    return diffDuration.days()
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCallout className="bg-white"></CCallout>
      </CCol>
      <CCol xs={6}>
        <CCard className="mb-4">
          <CCardHeader className="" style={{ backgroundColor: '#1e4356', color: '#fff' }}>
            <CRow>
              <CCol sm={10}>
                <strong>Subscribers</strong> <small>List</small>
              </CCol>
              <CCol sm={2} className="d-flex justify-content-end"></CCol>
            </CRow>
          </CCardHeader>
          <CCardBody>
            <CTable align="middle" className="mb-0 border" hover responsive>
              <CTableHead color="light">
                <CTableRow>
                  <CTableHeaderCell className="text-center">
                  Email
                  </CTableHeaderCell>
                  
                  <CTableHeaderCell>Subscrib Date Time</CTableHeaderCell>
                  
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {subscribe.map((item, index) => (
                  <CTableRow v-for="item in tableItems" key={index}>
                    <CTableDataCell>
                    <div>{item.email}</div>
                    </CTableDataCell>
                    <CTableDataCell>
                    
                      <div className="small text-medium-emphasis">
                        <span>{getDate(item.createdAt) < 5 ? 'New' : 'Recurring'}</span> |
                        Registered: {dateformat(item.createdAt)}
                      </div>
                      </CTableDataCell>
                 

                   
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Subscribers

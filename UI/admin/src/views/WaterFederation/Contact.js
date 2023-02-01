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
import { cilPeople, cilAlignCenter, cilPencil } from '@coreui/icons'
import axios from 'axios'
import { assetUrl, urlContact } from 'src/endpoints'

function Contact() {
  const [contact, setContact] = useState([])

  useEffect(() => {
    axios
      .get(urlContact)
      .then((res) => setContact(res.data))
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
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader className="" style={{ backgroundColor: '#1e4356', color: '#fff' }}>
            <CRow>
              <CCol sm={10}>
                <strong>Contact Us</strong> <small>List</small>
              </CCol>
              <CCol sm={2} className="d-flex justify-content-end"></CCol>
            </CRow>
          </CCardHeader>
          <CCardBody>
            <CTable align="middle" className="mb-0 border" hover responsive>
              <CTableHead color="light">
                <CTableRow>
                  <CTableHeaderCell className="text-center">
                    <CIcon icon={cilPeople} />
                  </CTableHeaderCell>
                  <CTableHeaderCell>Name</CTableHeaderCell>
                  <CTableHeaderCell>Email</CTableHeaderCell>
                  <CTableHeaderCell>Subject</CTableHeaderCell>

                  <CTableHeaderCell>Message</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {contact.map((item, index) => (
                  <CTableRow v-for="item in tableItems" key={index}>
                    <CTableDataCell>
                      <CAvatar size="md" src="logo.png" status="success" />
                    </CTableDataCell>
                    <CTableDataCell>
                      <div>{item.name}</div>
                      <div className="small text-medium-emphasis">
                        <span>{getDate(item.createdAt) < 5 ? 'New' : 'Recurring'}</span> |
                        Registered: {dateformat(item.createdAt)}
                      </div>
                    </CTableDataCell>
                    <CTableDataCell>
                      <div>{item.email}</div>
                    </CTableDataCell>
                    <CTableDataCell>
                      <div>{item.subject}</div>
                    </CTableDataCell>
                    <CTableDataCell>
                      <div>{item.message}</div>
                    </CTableDataCell>

                    {/* <CTableDataCell>
                      <CButton
                        style={{
                          backgroundColor: '#1e4356',
                          color: '#fff',
                          borderColor: '#1e4356',
                        }}
                        onClick={() => {
                          setVisibleXL(!visibleXL)
                          setboardmember(item)
                        }}
                      >
                        <CIcon icon={cilAlignCenter} />
                        &nbsp; Detail
                      </CButton>
                      <CButton
                        style={{
                          backgroundColor: '#1e4356',
                          color: '#fff',
                          borderColor: '#fff',
                          marginLeft: '5px',
                        }}
                        onClick={(e) => {
                          editboardmember(e, item)
                        }}
                      >
                        <CIcon icon={cilPencil} />
                        &nbsp; Edit
                      </CButton>
                    </CTableDataCell> */}
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

export default Contact

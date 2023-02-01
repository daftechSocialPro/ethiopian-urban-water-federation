import React, { useState, useEffect } from 'react'

import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CButton 
} from '@coreui/react'
import { urlQuestioner } from 'src/endpoints'
import axios from 'axios'
import dateformat from 'dateformat'
import WidgetsDropdown from '../widgets/WidgetsDropdown'
const Dashboard = ({ user }) => {
  const [Questioners, setQuestioners] = useState([])
  const forwhoms = ['Regional Association', 'Water Utility']
  const questionerStatus = ['Inactive', 'Active', 'Closed'

]
  useEffect(() => {
    axios
      .get(urlQuestioner)
      .then((res) => setQuestioners(res.data))
      .catch((err) => console.error(err))
  }, [])

  return (
    <>
      <WidgetsDropdown  />
    
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>Questioners</CCardHeader>
            <CCardBody>
              <br />

              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead color="light">
                  <CTableRow>
                    <CTableHeaderCell>No.</CTableHeaderCell>
                    <CTableHeaderCell>Title</CTableHeaderCell>
                    <CTableHeaderCell>For Whom</CTableHeaderCell>
                    <CTableHeaderCell>Submitted Date</CTableHeaderCell>
                    <CTableHeaderCell>Questioner Status</CTableHeaderCell>

                    <CTableHeaderCell>Details</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {Questioners.map((item, index) => (
                    <CTableRow v-for="item in tableItems" key={index}>
                      <CTableDataCell>{index + 1}</CTableDataCell>
                      <CTableDataCell>{item.title}</CTableDataCell>
                      <CTableDataCell>{forwhoms[item.forWhom - 1]}</CTableDataCell>
                      <CTableDataCell>{dateformat(item.submittedDate)}</CTableDataCell>
                      <CTableDataCell>{questionerStatus[item.status]}</CTableDataCell>

                      <CTableDataCell>
                      
                        <CButton
                          className="text-right "
                          onClick={() => {
                            setViewVissibleXL(true)
                            setSelectedQuestioner(item)
                          }}
                          style={{
                            backgroundColor: '#1e4356',
                            color: '#fff',
                            borderColor: '#1e4356',
                          }}
                        >
                          Answers
                        </CButton>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Dashboard

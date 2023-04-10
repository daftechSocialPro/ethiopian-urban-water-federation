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
  CButton ,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle
} from '@coreui/react'
import { MDBCol, MDBRow, MDBCard, MDBCardText, MDBCardBody } from 'mdb-react-ui-kit'
import { urlQuestioner } from 'src/endpoints'
import axios from 'axios'
import dateformat from 'dateformat'
import WidgetsDropdown from '../widgets/WidgetsDropdown'
const Dashboard = ({ user }) => {
  const [Questioners, setQuestioners] = useState([])
  const [selectedQuestioner,setSelectedQuestioner]=useState([])
  const [answer,setAnswer]=useState([])
  const [viewVissibleXL,setViewVissibleXL]=useState(false)

  const forwhoms = ['Regional Association', 'Water Utility']
  const questionerStatus = ['Inactive', 'Active', 'Closed']


  useEffect(() => {
    axios
      .get(`${urlQuestioner}/snswers?questionerId=${selectedQuestioner.id}`)
      .then((res) => {setAnswer(res.data)
      
      console.log("answer",res.data)
      
      })
      .catch((err) => console.error(err))
  }, [selectedQuestioner])




  useEffect(() => {
    axios
      .get(urlQuestioner)
      .then((res) => setQuestioners(res.data))
      .catch((err) => console.error(err))
  }, [])

  return (
    <>
      <WidgetsDropdown  />
      <CModal size="xl" visible={viewVissibleXL} onClose={() => setViewVissibleXL(false)}>
        <CModalHeader
          style={{
            backgroundColor: '#1e4356',
            color: '#fff',
          }}
        >
          <CModalTitle>
            <strong> </strong> <small>Choices</small>{' '}
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CCardBody>
            <MDBRow>
              <MDBCol lg="12">
                <MDBCard className="mb-4">
                {answer.length>0&&     <CForm className="row g-3 needs-validation" validated onSubmit={handleChange}>
                      {answer.map((item, index) => (
                        <>
                          {item.questions.answerType == 0 && (
                            <MDBRow key={index} style={{ marginTop: '20px' }}>
                              <MDBCol sm="12">
                                <MDBCardText style={{ fontSize: '24px' }}>
                                  {`${index + 1}. ${item.questions.question} ?`}
                                </MDBCardText>
                              </MDBCol>
                              <MDBCol sm="12" style={{ marginTop: '20px' }}>
                                <CFormTextarea
                                  type="text"
                                  
                                  required
                                  name="answers"
                                  rows={item.questions.numberOfRows}
                                  readOnly
                                  value={item.answers}
                                 
                                />
                              </MDBCol>
                            </MDBRow>
                          )}

                          {item.questions.answerType == 1 && (
                            <MDBRow key={item.id} style={{ marginTop: '10px' }}>
                              <MDBCol sm="12">
                                <MDBCardText style={{ fontSize: '24px' }}>
                                  {' '}
                                  {`${index + 1}. ${item.questions.question} ?`}
                                </MDBCardText>
                              </MDBCol>
                              <MDBCol sm="3" style={{ marginTop: '20px' }}>
                                <CFormInput
                                  type="number"
                                  placeholder="answer..."
                                  required
                                  name="answers"
                                  readOnly
                                  value={item.answers}
                                  // value={position}
                                 
                                />
                              </MDBCol>
                            </MDBRow>
                          )}
                          
                          {item.questions.answerType == 2 && (
                            <MDBRow key={item.id} style={{ marginTop: '10px' }}>
                              <MDBCol sm="12">
                                <MDBCardText style={{ fontSize: '24px' }}>
                                  {' '}
                                  {`${index + 1}. ${item.questions.question} ?`}
                                </MDBCardText>
                              </MDBCol>
                              <MDBCol sm="3" style={{ marginTop: '20px' }}>
                                <CFormInput
                                  type="text"
                                  placeholder="answer..."
                                  required
                                  name="answers"
                                  readOnly
                                  value={item.answers}
                                  // value={position}
                                 
                                />
                              </MDBCol>
                            </MDBRow>
                          )}
                        </>
                      ))}
                      <CCol
                        sm={12}
                        className="d-flex justify-content-end "
                        style={{ marginTop: '10px' }}
                      >
                     
                      </CCol>
                    </CForm>}
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </CCardBody>
        </CModalBody>
      </CModal>
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

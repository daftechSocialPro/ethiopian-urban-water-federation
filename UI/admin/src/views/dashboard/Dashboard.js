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
  CButton,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CForm,
} from '@coreui/react'
import { MDBCol, MDBRow, MDBCard, MDBCardText, MDBCardBody } from 'mdb-react-ui-kit'
import { urlQuestioner } from 'src/endpoints'
import axios from 'axios'
import dateformat from 'dateformat'
import WidgetsDropdown from '../widgets/WidgetsDropdown'
const Dashboard = ({ user }) => {
  const [Questioners, setQuestioners] = useState([])
  const [selectedQuestioner, setSelectedQuestioner] = useState([])
  const [answer, setAnswer] = useState([])
  const [viewVissibleXL, setViewVissibleXL] = useState(false)

  const forwhoms = ['Regional Association', 'Water Utility']
  const questionerStatus = ['Inactive', 'Active', 'Closed']

  const [selectedUser, setSelectedUser] = useState(null)

  const handleUserClick = (event, user) => {
    event.stopPropagation()
    console.log(user)
    setSelectedUser(user)
  }

  const handleAnswerClicked = (item) => {
    setViewVissibleXL(true)
    setSelectedQuestioner(item)

    axios
      .get(`${urlQuestioner}/snswers?questionerId=${item.id}`)
      .then((res) => {
        setAnswer(res.data)
      })
      .catch((err) => console.error(err))
  }

  useEffect(() => {
    axios
      .get(urlQuestioner)
      .then((res) => setQuestioners(res.data))
      .catch((err) => console.error(err))
  }, [])

  const getUserQuestionsAndAnswers = () => {
    if (!answer) return []

    if (!selectedUser) {
      return answer.map((item,index) => (

       
        <MDBCol key={index} sm="12">
          <MDBCardText 
         onClick={(e) => handleUserClick(e, item)}          
         style={{ fontSize: '24px',
         fontWeight: 'bold',
         marginBottom: '10px', }}>       
            {`${index + 1}. ${item.name}`}
          </MDBCardText>
        </MDBCol>
      
      ))
    } else {

      const selectedUserData = answer.find((user) => user.name === selectedUser.name)
       
      return selectedUserData.answers.map((qa,index) => (
        <MDBCol key={index} sm="12">
        <MDBCardText 
           
       style={{ fontSize: '22px',
       fontWeight: 'bold',
       marginLeft: '10px',
       marginBottom:'10px' }}>       
          {`${index + 1}. ${qa.question} ?`}
        </MDBCardText>
        <MDBCardText 
             
       style={{ fontSize: '18px',
      
       marginLeft: '20px',
       marginBottom:'10px' }}>       
          {`${qa.answer}`}
        </MDBCardText>
      </MDBCol>
      ))
    }
  }

  return (
    <>
      <WidgetsDropdown />
      <CModal size="xl" visible={viewVissibleXL} onClose={() => setViewVissibleXL(false)}>
        <CModalHeader
          style={{
            backgroundColor: '#1e4356',
            color: '#fff',
          }}
        >
          <CModalTitle onClick={()=>setSelectedUser(null)}>
            <strong>{selectedQuestioner.title} - {selectedUser && selectedUser.name} </strong> <small>Answers</small>{' '}
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CCardBody>
            <MDBRow>
              <MDBCol lg="12">
                <MDBCard className="mb-4">
                  
                   
                    <MDBRow  style={{ marginTop: '20px' }}>
                         {getUserQuestionsAndAnswers()}
                      </MDBRow>

                     
                
               
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
                            handleAnswerClicked(item)
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

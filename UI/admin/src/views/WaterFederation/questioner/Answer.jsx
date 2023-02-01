import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { urlQuestioner } from 'src/endpoints'
import dateformat from 'dateformat'
import {

    CCol,
    CRow,
    CCallout,
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,

  } from '@coreui/react'
import {useNavigate} from 'react-router-dom'
function Answer({user}) {

  const [questioners, setQuestioners] = useState([])
  const forwhoms = ['Regional Association', 'Water Utility']
  const questionerStatus = ['Inactive', 'Active', 'Closed']

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${urlQuestioner}/GetByUserId?userId=${user.id}`)
      .then((res) =>{console.log(res.data); setQuestioners(res.data)})
      .catch((err) => console.error(err))
  }, [])

  const navigateToAnswer =(item)=>{

    navigate('/submitanswer',{
        state:{
            questioner : item
        }
    })
  }

  return (
    <CRow>
    <CCol xs={12}>
      <CCallout className="bg-white"></CCallout>
    </CCol>
    <CCol xs={12}>
      <CCard className="mb-4">
        <CCardHeader style={{ backgroundColor: '#1e4356', color: '#fff' }} className="">
          <CRow>
            <CCol sm={10}>
              <strong>Questioner</strong>{' '}
            </CCol>          
          </CRow>
        </CCardHeader>
        <CCardBody>
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
              {questioners.map((item, index) => (
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
                        navigateToAnswer(item)
                        
                       //setViewVissibleXL(true)
                      // setSelectedQuestioner(item)
                      }}
                      style={{
                        backgroundColor: '#1e4356',
                        color: '#fff',
                        borderColor: '#1e4356',
                      }}
                    >
                      Answer
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
  )
  
    

}

export default Answer

import React, { useEffect, useState } from 'react'
import {

  CFormInput,
  CCol,
  CRow,

  CCallout,

  CFormTextarea,
  CCard,
  CCardBody,
} from '@coreui/react'
import axios from 'axios'
import { MDBCol, MDBRow, MDBCard, MDBCardText, MDBCardBody } from 'mdb-react-ui-kit'
import { urlQuestion } from 'src/endpoints'
function QuestionerView({ questionerId }) {
  const [quesitons, setQuestions] = useState([])

  useEffect(() => {
    axios
      .get(`${urlQuestion}?questionerId=${questionerId}`)
      .then((res) => {
        console.log(res.data)
        setQuestions(res.data)
      })
      .catch((err) => console.error(err))
  }, [questionerId])
  return (
    <MDBRow>
      <MDBCol lg="12">
        <MDBCard className="mb-4">
          <MDBCardBody>
            <CRow>
              <CCol xs={12}>
                <CCallout className="bg-white"><h3>Sample view of Questioner</h3> </CCallout>
              </CCol>
              <CCol xs={12}>
                <CCard className="mb-4">
                  <CCardBody>
                    {quesitons.map((item, index) => (
                      <>
                        {item.answerType == 0 && (
                          <MDBRow key={index} style={{ marginTop: '20px' }}>
                            <MDBCol sm="12">
                              <MDBCardText >
                                <h4>{' '}
                                {`${index + 1}. ${item.question} ?`}</h4>
                              </MDBCardText>
                            </MDBCol>
                            <MDBCol sm="12" style={{ marginTop: '20px' }}>
                              <CFormTextarea
                                type="text"
                                placeholder="answer..."
                                required
                                rows={item.numberOfRows}
                                // value={position}
                                // onChange={(e) => setPosition(e.target.value)}
                              />
                            </MDBCol>
                          </MDBRow>
                        )}

                        {item.answerType == 1 && (
                          <MDBRow key={index} style={{ marginTop: '10px' }}>
                            <MDBCol sm="12">
                              <MDBCardText style={{ fontSize: '24px' }}>
                                {' '}
                                {`${index + 1}. ${item.question} ?`}
                              </MDBCardText>
                            </MDBCol>
                            <MDBCol sm="3" style={{ marginTop: '20px' }}>
                              <CFormInput
                                type="number"
                                placeholder="answer..."
                                required
                               
                                // value={position}
                                // onChange={(e) => setPosition(e.target.value)}
                              />
                            </MDBCol>
                          </MDBRow>
                        )}
                      </>
                    ))}
                  </CCardBody>
                </CCard>
              </CCol>
            </CRow>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    </MDBRow>
  )
}

export default QuestionerView

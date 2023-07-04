import React, { useEffect, useState } from 'react'
import {
  CFormInput,
  CCol,
  CRow,
  CCallout,
  CFormTextarea,
  CCard,
  CCardBody,
  CForm,
  CButton,
} from '@coreui/react'

import axios from 'axios'
import { MDBCol, MDBRow, MDBCard, MDBCardText, MDBCardBody } from 'mdb-react-ui-kit'
import { urlQuestion, urlQuestioner } from 'src/endpoints'
import { useLocation } from 'react-router-dom'
import { customToast } from 'src/components/customToast'

function SubmitAnswer({ user, setIsLodding }) {
  const location = useLocation()
  const [questioner, setQuestioner] = useState(location.state.questioner)
  const [quesitons, setQuestions] = useState([])
  const [answer,setAnswer] =useState([])

  const [answers, setAnswers] = useState([
    { questionerId: '', questionId: '', answers: null, userId: null },
    { questionerId: '', questionId: '', answers: null, userId: null },
    { questionerId: '', questionId: '', answers: null, userId: null },
  ])

  const handleInputChange = (index, event, questionId) => {
    //    values.push ({
    //       QuestionerId: questioner.id,
    //       quesitonId: quesitonId,
    //       answers: value,
    //       userId: user.id,
    //     })

    console.log('index', index)
    const values = [...answers]
    const updatedValue = event.target.name
    values[index][updatedValue] = event.target.value
    values[index]['questionId'] = questionId
    values[index]['questionerId'] = questioner.id
    values[index]['userId'] = user.id

    setAnswers(values)
  }

  useEffect(() => {
    axios
      .get(`${urlQuestion}?questionerId=${questioner.id}`)
      .then((res) => {
        console.log(res.data)
        setQuestions(res.data)
      })
      .catch((err) => console.error(err))
  }, [questioner])

  useEffect(() => {
    axios
      .get(`${urlQuestioner}/snswers?questionerId=${questioner.id}`)
      .then((res) => setAnswer(res.data))
      .catch((err) => console.error(err))
  }, [])

  const handleChange = (event) => {
    event.preventDefault()

    var bodyFormData = new FormData()
    bodyFormData.append('answers', JSON.stringify(answers))
    setIsLodding(true)
    axios
      .post(`${urlQuestion}/submitanswer?answers=${JSON.stringify(answers)}`)
      .then((res) => {
        setIsLodding(false)

        customToast('Questioner Submitted Successfully', 0)
      })
      .catch((err) => console.error(err))
  }

  return (
    <MDBRow>
      <MDBCol lg="12">
        <MDBCard className="mb-4">
          <MDBCardBody>
            <CRow>
              <CCol xs={12}>
                <CCallout  className={answer.length>0?"bg-success text-white":"bg-white"}>
                  <h3>{questioner.title}</h3>{' '} {answer.length>0 && '(Already Submitted)'} 
                </CCallout>
              </CCol>
              <CCol xs={12}>
                <CCard className="mb-4">
                  <CCardBody>
               {answer.length===0&&     <CForm className="row g-3 needs-validation" validated onSubmit={handleChange}>
                      {quesitons.map((item, index) => (
                        <>
                          {item.answerType == 0 && (
                            <MDBRow key={item.id} style={{ marginTop: '20px' }}>
                              <MDBCol sm="12">
                                <MDBCardText style={{ fontSize: '24px' }}>
                                  {`${index + 1}. ${item.question} ?`}
                                </MDBCardText>
                              </MDBCol>
                              <MDBCol sm="12" style={{ marginTop: '20px' }}>
                                <CFormTextarea
                                  type="text"
                                  placeholder="answer..."
                                  required
                                  name="answers"
                                  rows={item.numberOfRows}
                                  // value={position}
                                  onChange={(event) => handleInputChange(index, event, item.id)}
                                />
                              </MDBCol>
                            </MDBRow>
                          )}

                          {item.answerType == 1 && (
                            <MDBRow key={item.id} style={{ marginTop: '10px' }}>
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
                                  name="answers"
                                  // value={position}
                                  onChange={(event) => handleInputChange(index, event, item.id)}
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
                        <CButton
                          className="text-right "
                          style={{
                            backgroundColor: '#1e4356',
                            color: '#fff',
                            borderColor: '#1e4356',
                            marginTop: '20px',
                          }}
                          type="submit"
                        >
                          Submit
                        </CButton>
                      </CCol>
                    </CForm>}
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
                        </>
                      ))}
                      <CCol
                        sm={12}
                        className="d-flex justify-content-end "
                        style={{ marginTop: '10px' }}
                      >
                     
                      </CCol>
                    </CForm>}
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

export default SubmitAnswer

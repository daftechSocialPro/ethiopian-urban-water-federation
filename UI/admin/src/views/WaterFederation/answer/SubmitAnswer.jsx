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
  const [answer, setAnswer] = useState([])

  const [answers, setAnswers] = useState([])
  const [answerss, setAnswerss] = useState([])

  const handleInputChange = (index, event, questionId) => {
    event.preventDefault()

    const answe = [...answers]
    const answee = [...answerss]

    answee[index] = {
      QuestionerId: questioner.id,
      QuestionId: questionId,
      answers: event.target.value,
      userId: user.id,
    }

    answe[index] = event.target.value

    setAnswers(answe)
    setAnswerss(answee)
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
      .then((res) => {
        setAnswer(res.data)

        console.log('answer', res.data)
      })
      .catch((err) => console.error(err))
  }, [])

  const handleChange = (event) => {
    event.preventDefault()

    console.log(answerss)
    setIsLodding(true)
    axios
      .post(`${urlQuestion}/submitanswer?answers=${JSON.stringify(answerss)}`)
      .then((res) => {
        setIsLodding(false)
        window.location.reload()

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
                <CCallout className={answer.length > 0 ? 'bg-success text-white' : 'bg-white'}>
                  <h3>{questioner.title}</h3> {answer.length > 0 && '(Already Submitted)'}
                </CCallout>
              </CCol>
              <CCol xs={12}>
                <CCard className="mb-4">
                  <CCardBody>
                    {answer.length === 0 && (
                      <CForm className="row g-3 needs-validation" validated onSubmit={handleChange}>
                        {quesitons.map((item, index) => (
                          <div key={index}>
                            {item.answerType == 0 && (
                              <MDBRow key={item.id} style={{ marginTop: '20px' }}>
                                <MDBCol sm="12">
                                  <MDBCardText
                                    style={{
                                      fontSize: '24px',
                                      fontWeight: 'bold',
                                      marginBottom: '10px',
                                    }}
                                  >
                                    {`${index + 1}. ${item.question} ?`}
                                  </MDBCardText>
                                </MDBCol>
                                <MDBCol sm="12" style={{ marginTop: '20px' }}>
                                  <CFormTextarea
                                    type="text"
                                    placeholder="answer..."
                                    required
                                    rows={item.numberOfRows}
                                    value={answers[index]}
                                    onChange={(event) => handleInputChange(index, event, item.id)}
                                  />
                                </MDBCol>
                              </MDBRow>
                            )}

                            {item.answerType == 1 && (
                              <MDBRow key={item.id} style={{ marginTop: '10px' }}>
                                <MDBCol sm="12">
                                  <MDBCardText
                                    style={{
                                      fontSize: '24px',
                                      fontWeight: 'bold',
                                      marginBottom: '10px',
                                    }}
                                  >
                                    {' '}
                                    {`${index + 1}. ${item.question} ?`}
                                  </MDBCardText>
                                </MDBCol>
                                <MDBCol sm="3" style={{ marginTop: '20px' }}>
                                  <CFormInput
                                    type="number"
                                    placeholder="answer..."
                                    required
                                    defaultValue={0}
                                    // // value={position}
                                    // onChange={(event) => handleInputChange( index,event, item.id)}

                                    value={answers[index]}
                                    onChange={(event) => handleInputChange(index, event, item.id)}
                                  />
                                </MDBCol>
                              </MDBRow>
                            )}
                            {item.answerType == 2 && (
                              <MDBRow key={item.id} style={{ marginTop: '10px' }}>
                                <MDBCol sm="12">
                                  <MDBCardText
                                    style={{
                                      fontSize: '24px',
                                      fontWeight: 'bold',
                                      marginBottom: '10px',
                                    }}
                                  >
                                    {' '}
                                    {`${index + 1}. ${item.question} ?`}
                                  </MDBCardText>
                                </MDBCol>
                                {item.choices &&
                                  item.choices.map((choice, inde) => (
                                    <div
                                      style={{
                                        fontSize: '18px',
                                        marginBottom: '20px',
                                      }}
                                      key={inde}
                                    >
                                      <input
                                        type="radio"
                                        name="choice"
                                        value={choice}
                                        checked={answers[index] === choice}
                                        onChange={(event) =>
                                          handleInputChange(index, event, item.id)
                                        }
                                      ></input>{' '}
                                      &nbsp;
                                      <label style={{ marginRight: '10px' }}>{choice}</label>
                                    </div>
                                  ))}
                              </MDBRow>
                            )}
                          </div>
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
                      </CForm>
                    )}
                    {answer.length > 0 && (
                      <MDBRow style={{ marginTop: '20px' }}>
                        {answer.map((item, index) => 
                        {

                          return (

                          <div key={index}>
                            {/* <MDBCol key={index} sm="12">
                              <MDBCardText
                                onClick={(e) => handleUserClick(e, item)}
                                style={{
                                  fontSize: '24px',
                                  fontWeight: 'bold',
                                  marginBottom: '10px',
                                }}
                              >
                                {`${index + 1}. ${item.name}`}
                              </MDBCardText>
                            </MDBCol> */}

                            {item.answers.map((qa, inde) => {

                              return (
                              <MDBCol key={inde} sm="12">
                                <MDBCardText
                                  style={{
                                    fontSize: '22px',
                                    fontWeight: 'bold',
                                    marginLeft: '10px',
                                    marginBottom: '10px',
                                  }}
                                >
                                  {`${inde + 1}. ${qa.question} ?`}
                                </MDBCardText>
                                <MDBCardText
                                  style={{
                                    fontSize: '18px',
                                    
                                    marginLeft: '20px',
                                    marginBottom: '10px',
                                  }}
                                >
                                  {`${qa.answer}`}
                                </MDBCardText>
                              </MDBCol>
                              )
                            })}
                          </div>
                          )
                        })}
                      </MDBRow>
                    )}
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

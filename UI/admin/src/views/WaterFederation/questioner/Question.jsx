import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
  CForm,
  CFormInput,
  CCol,
  CRow,
  CModalBody,
  CCallout,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CModal,
  CModalHeader,
  CModalTitle,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CFormSwitch,
  CTableHeaderCell,
  CTableRow,
  CFormSelect,
  CFormTextarea,
} from '@coreui/react'
import { MDBCol, MDBRow, MDBCard, MDBCardBody } from 'mdb-react-ui-kit'
import { useState, useEffect } from 'react'
import { customToast } from 'src/components/customToast'
import axios from 'axios'
import { urlQuestion } from 'src/endpoints'
import { useLocation } from 'react-router-dom'

function Question({ setIsLodding }) {
  const [addvisibleXL, setAddVisibleXL] = useState(false)
  const [updatevisibleXL, setUpdateVisibleXL] = useState(false)
  const [choicevisibleXL, setChoiceVisibleXL] = useState(false)

  const [selectedQuestion, setSelectedQuestion] = useState([])

  const [questions, setQuestions] = useState([])

  const location = useLocation()

  const questionerId = location.state.questionerId && location.state.questionerId

  const [question, setQuestion] = useState('')

  const [selectedQuetion,setselectedQuestion ]=useState({})


  const [answerType, setAnswerType] = useState(0)
  const [numberOfRows, setNumberOfRows] = useState(0)
 
  const [includeDashboard, setIncludeDashboard] = useState(false)
  const [includeReport, setIncludeReport] = useState(false)
  const navigate = useNavigate()
  const answerTypes = ['Text', 'Number', 'choose']

  const navigateToChoose = (item) => {
    navigate('/choose', {
      state: {},
    })
  }
  useEffect(() => {
    axios
      .get(`${urlQuestion}?questionerId=${questionerId}`)
      .then((res) => {
        console.log(res.data)
        setQuestions(res.data)
      })
      .catch((err) => console.error(err))
  }, [addvisibleXL, updatevisibleXL])

  const handleSubmit = async (event) => {
    event.preventDefault()

    const formData = new FormData()

    formData.set('question', question)
    formData.set('answerType', answerType)
    formData.set('includeDashboard', includeDashboard)
    formData.set('includeReport', includeReport)
    formData.set('questionerId', questionerId)
    choices.forEach((choice) => {
      formData.append('choices[]', choice)
    })
    formData.set('numberOfRows', numberOfRows)

    console.log(formData)

    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.stopPropagation()
    }

    try {
      setIsLodding(true)
      axios.defaults.withCredentials = true
      axios
        .post(urlQuestion, formData)
        .then((res) => {
          setIsLodding(false)
          setAddVisibleXL(false)

          customToast('Question Successfully created', 0)
        })
        .catch((err) => {
          setIsLodding(false)
          setAddVisibleXL(false)
          setChoices([])
          alert(err)
          console.error(err)
        })
    } catch (error) {
      setIsLodding(false)
      setAddVisibleXL(false)
      customToast(error, 1)
      setChoices([])
      console.error(error)
    }
  }

  const handleUpdate = async (event) => {
    event.preventDefault()

    const formData = new FormData()

    formData.set('question', question)
    formData.set('answerType', answerType)
    formData.set('includeDashboard', includeDashboard)
    formData.set('includeReport', includeReport)
    formData.set('questionerId', questionerId)
    formData.set('numberOfRows', numberOfRows)
    choices.forEach((choice) => {
      formData.append('choices[]', choice)
    })
    formData.set('id', selectedQuestion.id)

    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.stopPropagation()
    }
    try {
      setIsLodding(true)
      axios.defaults.withCredentials = true
      axios
        .put(urlQuestion, formData)
        .then((res) => {
          setIsLodding(false)
          setUpdateVisibleXL(false)

          customToast('Question Successfully Updated', 0)
        })
        .catch((err) => {
          setIsLodding(false)
          setIsLodding(false)
          alert(err)
          console.error(err)
        })
    } catch (error) {
      setIsLodding(false)
      setIsLodding(false)
      customToast(error, 1)
      console.error(error)
    }
  }

  const [choices, setChoices] = useState([])

  const handleChoiceChange = (event, index) => {
    const newChoices = [...choices]
    newChoices[index] = event.target.value
    setChoices(newChoices)
  }

  const addChoice = () => {
    setChoices([...choices, ''])
  }

  const removeChoice = (event, index) => {
    event.preventDefault()

    const newChoices = [...choices]
    newChoices.splice(index, 1)
    setChoices(newChoices)
  }

  return (
    <>
      <CModal size="xl" visible={addvisibleXL} onClose={() => setAddVisibleXL(false)}>
        <CModalHeader
          style={{
            backgroundColor: '#1e4356',
            color: '#fff',
          }}
        >
          <CModalTitle>
            <strong>Add </strong> <small>Question</small>{' '}
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CCardBody>
            <MDBRow>
              <MDBCol lg="12">
                <MDBCard className="mb-4">
                  <MDBCardBody>
                    <CRow>
                      <CCol xs={12}>
                        <CCallout className="bg-white"></CCallout>
                      </CCol>
                      <CCol xs={12}>
                        <CCard className="mb-4">
                          <CCardBody>
                            <CForm
                              className="row g-3 needs-validation"
                              validated
                              onSubmit={handleSubmit}
                            >
                              <CCol xs="12">
                                <CFormTextarea
                                  type="text"
                                  label="Question"
                                  rows={3}
                                  placeholder="question ...."
                                  required
                                  value={question}
                                  onChange={(e) => setQuestion(e.target.value)}
                                />
                              </CCol>

                              <CCol xs="3">
                                <CFormSelect
                                  type="text"
                                  label="Answer Type"
                                  placeholder="for ...."
                                  required
                                  value={answerType}
                                  onChange={(e) => setAnswerType(e.target.value)}
                                >
                                  <option value={-1}>---Select Answer Types -----</option>
                                  {answerTypes.map((item, index) => (
                                    <option key={index} value={index}>
                                      {item}
                                    </option>
                                  ))}
                                </CFormSelect>
                              </CCol>

                              {answerType == 0 && (
                                <CCol xs="3">
                                  <CFormInput
                                    type="number"
                                    label="Number of Rows"
                                    placeholder=""
                                    required
                                    value={numberOfRows}
                                    onChange={(e) => setNumberOfRows(e.target.value)}
                                  />
                                </CCol>
                              )}
                              {answerType == 2 && (
                                <>
                                  {/* <CCol xs="3">
                                    <CFormInput
                                      type="number"
                                      label="Number of choise"
                                      placeholder=""
                                      required
                                      value={numberOfChoise}
                                      onChange={(e) => setNumberOfChoise(e.target.value)}
                                    />
                                  </CCol> */}
                                  <CCol xs="3">
                                    <CButton
                                      className="mt-4"
                                      style={{
                                        backgroundColor: '#2eb85c',
                                        color: '#fff',
                                        borderColor: '#2eb85c',
                                      }}
                                      onClick={addChoice}
                                    >
                                      Add Choice
                                    </CButton>
                                  </CCol>
                                </>
                              )}

                              <CCol xs="3">
                                <MDBRow>
                                  <MDBCol sm="12">
                                    <CFormSwitch
                                      checked={includeReport}
                                      onChange={() => setIncludeReport(!includeReport)}
                                      label="Include in Report"
                                    />
                                  </MDBCol>
                                </MDBRow>
                              </CCol>

                              <CCol xs="3">
                                <MDBRow>
                                  <MDBCol sm="12">
                                    <CFormSwitch
                                      checked={includeDashboard}
                                      onChange={() => setIncludeDashboard(!includeDashboard)}
                                      label="Include in Dashboard"
                                    />
                                  </MDBCol>
                                </MDBRow>
                              </CCol>

                              <div className="card">
                                {answerType == 2 &&
                                  choices.map((choice, index) => (
                                    <div className="row p-2 b-1" key={index}>
                                      <CCol xs="10" key={index}>
                                        <CFormTextarea
                                          type="text"
                                          label={`Choise ${index + 1}`}
                                          rows={3}
                                          placeholder="Choise ...."
                                          required
                                          value={choice}
                                          onChange={(event) => handleChoiceChange(event, index)}
                                        />
                                        <hr />
                                      </CCol>
                                      <CCol xs="2">
                                        <CButton
                                          className="mt-3"
                                          style={{
                                            backgroundColor: '#e74c3c',
                                            color: '#fff',
                                            borderColor: '#e74c3c',
                                          }}
                                          onClick={(e) => removeChoice(e, index)}
                                        >
                                          Remove Choice
                                        </CButton>
                                      </CCol>
                                    </div>
                                  ))}
                              </div>

                              <CCol xs="2">
                                <CButton
                                  style={{
                                    backgroundColor: '#1e4356',
                                    color: '#fff',
                                    borderColor: '#1e4356',
                                  }}
                                  type="submit"
                                >
                                  Submit
                                </CButton>
                              </CCol>
                            </CForm>
                          </CCardBody>
                        </CCard>
                      </CCol>
                    </CRow>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </CCardBody>
        </CModalBody>
      </CModal>

      <CModal size="xl" visible={updatevisibleXL} onClose={() => setUpdateVisibleXL(false)}>
        <CModalHeader
          style={{
            backgroundColor: '#1e4356',
            color: '#fff',
          }}
        >
          <CModalTitle>
            <strong>Update </strong> <small>Questioner</small>{' '}
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CCardBody>
            <MDBRow>
              <MDBCol lg="12">
                <MDBCard className="mb-4">
                  <MDBCardBody>
                    <CRow>
                      <CCol xs={12}>
                        <CCallout className="bg-white"></CCallout>
                      </CCol>
                      <CCol xs={12}>
                        <CCard className="mb-4">
                          <CCardBody>
                            <CForm
                              className="row g-3 needs-validation"
                              validated
                              onSubmit={handleUpdate}
                            >
                              <CCol xs="12">
                                <CFormTextarea
                                  type="text"
                                  label="Question"
                                  rows={3}
                                  placeholder="question ...."
                                  required
                                  value={question}
                                  onChange={(e) => setQuestion(e.target.value)}
                                />
                              </CCol>

                              <CCol xs="3">
                                <CFormSelect
                                  type="text"
                                  label="Answer Type"
                                  placeholder="for ...."
                                  required
                                  value={answerType}
                                  onChange={(e) => setAnswerType(e.target.value)}
                                >
                                  <option value={-1}>---Select Answer Types -----</option>
                                  {answerTypes.map((item, index) => (
                                    <option key={index} value={index}>
                                      {item}
                                    </option>
                                  ))}
                                </CFormSelect>
                              </CCol>

                              {answerType == 0 && (
                                <CCol xs="3">
                                  <CFormInput
                                    type="number"
                                    label="Number of Rows"
                                    placeholder=""
                                    required
                                    value={numberOfRows}
                                    onChange={(e) => setNumberOfRows(e.target.value)}
                                  />
                                </CCol>
                              )}

{answerType == 2 && (
                                <>
                                 
                                  <CCol xs="3">
                                    <CButton
                                      className="mt-4"
                                      style={{
                                        backgroundColor: '#2eb85c',
                                        color: '#fff',
                                        borderColor: '#2eb85c',
                                      }}
                                      onClick={addChoice}
                                    >
                                      Add Choice
                                    </CButton>
                                  </CCol>
                                </>
                              )}

                              <CCol xs="3">
                                <MDBRow>
                                  <MDBCol sm="12">
                                    <CFormSwitch
                                      checked={includeReport}
                                      onChange={() => setIncludeReport(!includeReport)}
                                      label="Include in Report"
                                    />
                                  </MDBCol>
                                </MDBRow>
                              </CCol>

                              <CCol xs="3">
                                <MDBRow>
                                  <MDBCol sm="12">
                                    <CFormSwitch
                                      checked={includeDashboard}
                                      onChange={() => setIncludeDashboard(!includeDashboard)}
                                      label="Include in Dashboard"
                                    />
                                  </MDBCol>
                                </MDBRow>
                              </CCol>

                              <div className="card">
                                {answerType == 2 &&
                                  choices.map((choice, index) => (
                                    <div className="row p-2 b-1" key={index}>
                                      <CCol xs="10" key={index}>
                                        <CFormTextarea
                                          type="text"
                                          label={`Choise ${index + 1}`}
                                          rows={3}
                                          placeholder="Choise ...."
                                          required
                                          value={choice}
                                          onChange={(event) => handleChoiceChange(event, index)}
                                        />
                                        <hr />
                                      </CCol>
                                      <CCol xs="2">
                                        <CButton
                                          className="mt-3"
                                          style={{
                                            backgroundColor: '#e74c3c',
                                            color: '#fff',
                                            borderColor: '#e74c3c',
                                          }}
                                          onClick={(e) => removeChoice(e, index)}
                                        >
                                          Remove Choice
                                        </CButton>
                                      </CCol>
                                    </div>
                                  ))}
                              </div>

                              <CCol xs="2">
                                <CButton
                                  style={{
                                    backgroundColor: '#1e4356',
                                    color: '#fff',
                                    borderColor: '#1e4356',
                                  }}
                                  type="submit"
                                >
                                  Update
                                </CButton>
                              </CCol>
                            </CForm>
                          </CCardBody>
                        </CCard>
                      </CCol>
                    </CRow>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </CCardBody>
        </CModalBody>
      </CModal>

      <CModal size="xl" visible={choicevisibleXL} onClose={() => setChoiceVisibleXL(false)}>
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
                  <MDBCardBody>
                    <CRow>
                      <CCol xs={12}>
                        <CCallout className="bg-white"></CCallout>
                      </CCol>
                      <CCol xs={12}>
                        <CCard className="mb-4">
                          <CCardBody>
                            <CForm
                              className="row g-3 needs-validation"
                              validated
                              onSubmit={handleSubmit}
                            >
                              <label
                                style={{
                                  fontSize: '24px',
                                  fontWeight: 'bold',
                                  marginBottom: '10px',
                                }}
                              >
                                {selectedQuetion.question && selectedQuetion.question}
                              </label>

                              {selectedQuetion.choices &&
                                selectedQuetion.choices.map((choice, index) => (
                                  <div
                                    style={{
                                      fontSize: '18px',
                                      marginBottom: '20px',
                                    }}
                                    key={index}
                                  >
                                    <input type="radio" name="answer" id="paris" value="paris"></input> &nbsp;
                                    <label style={{ marginRight: '10px' }}>
                                       {choice}
                                    </label>
                                  </div>
                                ))}
                            </CForm>
                          </CCardBody>
                        </CCard>
                      </CCol>
                    </CRow>
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
            <CCardHeader style={{ backgroundColor: '#1e4356', color: '#fff' }} className="">
              <CRow>
                <CCol sm={10}>
                  <strong>Questioner</strong>{' '}
                </CCol>
                <CCol sm={2} className="d-flex justify-content-end">
                  <CButton
                    className="text-right bg-white"
                    onClick={() => {
                      setAddVisibleXL(true)
                      setQuestion('')
                      setAnswerType('')
                      setIncludeReport(false)
                      setIncludeDashboard(false)
                      setNumberOfRows(0)
                    }}
                    style={{ color: '#1e4356', borderColor: '#fff' }}
                    type="submit"
                  >
                    Add Question
                  </CButton>
                </CCol>
              </CRow>
            </CCardHeader>
            <CCardBody>
              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead color="light">
                  <CTableRow>
                    <CTableHeaderCell>No.</CTableHeaderCell>
                    <CTableHeaderCell>Question</CTableHeaderCell>
                    <CTableHeaderCell>AnswerType</CTableHeaderCell>
                    <CTableHeaderCell>Include In Report </CTableHeaderCell>
                    <CTableHeaderCell>Include In Dashboard</CTableHeaderCell>
                    <CTableHeaderCell>Details</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {questions.map((item, index) => (
                    <CTableRow key={index}>
                      <CTableDataCell>{index + 1}</CTableDataCell>
                      <CTableDataCell>{item.question}</CTableDataCell>
                      <CTableDataCell>
                        {answerTypes[item.answerType]}
                        {item.answerType == 0 ? `(${item.numberOfRows}) number of rows ` : ''}{' '}
                      </CTableDataCell>
                      <CTableDataCell>
                        {item.includeReport ? 'Included' : 'Not Included'}
                      </CTableDataCell>
                      <CTableDataCell>
                        {item.includeDashboard ? 'Included' : 'Not Included'}
                      </CTableDataCell>

                      <CTableDataCell>
                        <CButton
                          className="text-right "
                          onClick={() => {
                            setUpdateVisibleXL(true)
                            setSelectedQuestion(item)
                            setQuestion(item.question&&item.question)
                            setChoices(item.choices)
                            setAnswerType(item.answerType)
                            setIncludeDashboard(item.includeDashboard)
                            setIncludeReport(item.includeReport)
                            setNumberOfRows(item.numberOfRows)
                          }}
                          style={{
                            backgroundColor: '#1e4356',
                            color: '#fff',
                            borderColor: '#1e4356',
                          }}
                        >
                          Update
                        </CButton>
                        {item.choices.length > 0 && (
                          <>
                            &nbsp;| &nbsp;
                            <CButton
                              className="text-right "
                              onClick={() => {
                                setChoiceVisibleXL(true)
                                setselectedQuestion(item)
                              }}
                              style={{
                                backgroundColor: '#1e4356',
                                color: '#fff',
                                borderColor: '#1e4356',
                              }}
                            >
                              choices
                            </CButton>
                          </>
                        )}
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

export default Question

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

  const [selectedQuestion, setSelectedQuestion] = useState([])

  const [questions, setQuestions] = useState([])

  const location = useLocation()

  const questionerId = location.state.questionerId && location.state.questionerId

  const [question, setQuestion] = useState('')
  const [answerType, setAnswerType] = useState('')
  const [numberOfRows, setNumberOfRows] = useState(0)
  const [numberOfChoise, setNumberOfChoise] = useState(0)
  const [includeDashboard, setIncludeDashboard] = useState(false)
  const [includeReport, setIncludeReport] = useState(false)
  const navigate = useNavigate()
  const answerTypes = ['Text', 'Number', 'choose']

  const [choises,setChoises] =useState([])

  const navigateToChoose = (item) => {

    navigate('/choose', {
      state: {

      }
    }
    )

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
    formData.set('numberOfChoise', numberOfChoise)
    formData.set('numberOfRows', numberOfRows)

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
          alert(err)
          console.error(err)
        })
    } catch (error) {
      setIsLodding(false)
      setAddVisibleXL(false)
      customToast(error, 1)
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
    formData.set('numberOfChoise', numberOfChoise)
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


  const [formValues, setFormValues] = useState({});
  const handleChange = (e) => {

    console.log(formValues.choises)
    setFormValues({ ...formValues, [e.target.id]: e.target.value });
  };
 

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
                                <CCol xs="3">
                                  <CFormInput
                                    type="number"
                                    label="Number of choise"
                                    placeholder=""
                                    required
                                    value={numberOfChoise}
                                    onChange={(e) => setNumberOfChoise(e.target.value)}
                                  />
                                </CCol>
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

                                {(function () {
                                  var rows = [], i = 0;
                                  while (++i <= numberOfChoise) {
                                    rows.push(
                                      <CCol xs="12" key={i}>
                                        <CFormTextarea
                                          type="text"
                                          label={`Choise ${i}`}
                                          rows={3}
                                          placeholder="Choise ...."
                                          required
                                          value={formValues.choises}
                                         onChange={(e) => {
                                          
                                          handleChange(e)}}
                                          //console.log(e.target.value)}}
                                        />
                                      </CCol>
                                    )
                                  }
                                  return rows;
                                })([], 0, 10)}

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
                        {answerTypes[item.answerType]}{' '}
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
                            setQuestion(item.question)
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

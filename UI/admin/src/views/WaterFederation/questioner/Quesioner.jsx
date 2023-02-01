import React from 'react'
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
  CTableHeaderCell,
  CTableRow,
  CFormSelect,
} from '@coreui/react'

import { MDBCol, MDBRow, MDBCard, MDBCardBody } from 'mdb-react-ui-kit'
import { useState, useEffect } from 'react'
import { customToast } from 'src/components/customToast'
import axios from 'axios'
import { urlQuestioner } from 'src/endpoints'
import { useNavigate } from 'react-router-dom'
import dateformat from 'dateformat'
import QuestionerView from './QuestionerView'

function Questioner({ setIsLodding }) {
  const [addvisibleXL, setAddVisibleXL] = useState(false)
  const [updatevisibleXL, setUpdateVisibleXL] = useState(false)
  const [selectedQuestioner, setSelectedQuestioner] = useState([])
  const [viewVisibleXL, setViewVissibleXL] = useState(false)

  const navigation = useNavigate()

  const navigatetoQuestion = (questionerId) => {
    navigation('/question', {
      state: {
        questionerId: questionerId,
      },
    })
  }

  const [title, setTitle] = useState('')
  const [forWhom, setForWhom] = useState('')
  const [submittedDate, setSubmittedDate] = useState('')
  const [status, setStatus] = useState('')

  const forwhoms = ['Regional Association', 'Water Utility']
  const questionerStatus = ['Inactive', 'Active', 'Closed']

  const [Questioners, setQuestioners] = useState([])

  useEffect(() => {
    axios
      .get(urlQuestioner)
      .then((res) => setQuestioners(res.data))
      .catch((err) => console.error(err))
  }, [addvisibleXL, updatevisibleXL])

  const handleSubmit = async (event) => {
    event.preventDefault()

    const formData = new FormData()

    //user)
    formData.set('title', title)
    formData.set('forWhom', forWhom)
    formData.set('submittedDate', submittedDate)
    formData.set('status', status)

    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.stopPropagation()
    }
    try {
      setIsLodding(true)
      axios.defaults.withCredentials = true
      axios
        .post(urlQuestioner, formData)
        .then((res) => {
          setIsLodding(false)
          setAddVisibleXL(false)

          customToast('Questioner Successfully created', 0)
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

    //user)
    formData.set('title', title)
    formData.set('forWhom', forWhom)
    formData.set('submittedDate', submittedDate)
    formData.set('status', status)
    formData.set('id', selectedQuestioner.id)

    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.stopPropagation()
    }
    try {
      setIsLodding(true)
      axios.defaults.withCredentials = true
      axios
        .put(urlQuestioner, formData)
        .then((res) => {
          setIsLodding(false)
          setUpdateVisibleXL(false)

          customToast('Questioner Successfully UPdated', 0)
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

  return (
    <>
      <CModal size="xl" visible={viewVisibleXL} onClose={() => setViewVissibleXL(false)}>
        <CModalHeader
          style={{
            backgroundColor: '#1e4356',
            color: '#fff',
          }}
        >
          <CModalTitle>
            <strong>Questioner </strong> <small>view</small>{' '}
          </CModalTitle>
        </CModalHeader>
        <CModalBody>

            <QuestionerView questionerId={selectedQuestioner&& selectedQuestioner.id}/>

        </CModalBody>
      </CModal>
      <CModal size="xl" visible={addvisibleXL} onClose={() => setAddVisibleXL(false)}>
        <CModalHeader
          style={{
            backgroundColor: '#1e4356',
            color: '#fff',
          }}
        >
          <CModalTitle>
            <strong>Add </strong> <small>Questioner</small>{' '}
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
                              <CCol xs="3">
                                <CFormInput
                                  type="text"
                                  label="Title"
                                  placeholder="title ...."
                                  required
                                  value={title}
                                  onChange={(e) => setTitle(e.target.value)}
                                />
                              </CCol>

                              <CCol xs="3">
                                <CFormSelect
                                  type="text"
                                  label="For Whom"
                                  placeholder="for ...."
                                  required
                                  value={forWhom}
                                  onChange={(e) => setForWhom(e.target.value)}
                                >
                                  <option>---Select For Whom -----</option>
                                  {forwhoms.map((item, index) => (
                                    <option key={index} value={index + 1}>
                                      {item}
                                    </option>
                                  ))}
                                </CFormSelect>
                              </CCol>
                              <CCol xs="3">
                                <CFormInput
                                  type="datetime-local"
                                  label="Submitted Date "
                                  placeholder=""
                                  required
                                  value={submittedDate}
                                  onChange={(e) => setSubmittedDate(e.target.value)}
                                />
                              </CCol>

                              <CCol xs="3">
                                <CFormSelect
                                  type="text"
                                  label="Questioner Status"
                                  required
                                  value={status}
                                  onChange={(e) => setStatus(e.target.value)}
                                >
                                  <option>---Select Status -----</option>
                                  {questionerStatus.map((item, index) => (
                                    <option key={index} value={index}>
                                      {item}
                                    </option>
                                  ))}
                                </CFormSelect>
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
                              <CCol xs="3">
                                <CFormInput
                                  type="text"
                                  label="Title"
                                  placeholder="title ...."
                                  required
                                  value={title}
                                  onChange={(e) => setTitle(e.target.value)}
                                />
                              </CCol>

                              <CCol xs="3">
                                <CFormSelect
                                  type="text"
                                  label="For Whom"
                                  placeholder="for ...."
                                  required
                                  value={forWhom}
                                  onChange={(e) => setForWhom(e.target.value)}
                                >
                                  <option>---Select For Whom -----</option>
                                  {forwhoms.map((item, index) => (
                                    <option key={index} value={index + 1}>
                                      {item}
                                    </option>
                                  ))}
                                </CFormSelect>
                              </CCol>
                              <CCol xs="3">
                                <CFormInput
                                  type="datetime-local"
                                  label="Submitted Date "
                                  placeholder=""
                                  required
                                  value={submittedDate}
                                  onChange={(e) => setSubmittedDate(e.target.value)}
                                />
                              </CCol>

                              <CCol xs="3">
                                <CFormSelect
                                  type="text"
                                  label="Questioner Status"
                                  required
                                  value={status}
                                  onChange={(e) => setStatus(e.target.value)}
                                >
                                  <option>---Select Status -----</option>
                                  {questionerStatus.map((item, index) => (
                                    <option key={index} value={index}>
                                      {item}
                                    </option>
                                  ))}
                                </CFormSelect>
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
                      setTitle('')
                      setForWhom('')
                      setSubmittedDate('')
                      setStatus('')
                    }}
                    style={{ color: '#1e4356', borderColor: '#fff' }}
                    type="submit"
                  >
                    Add Questioner
                  </CButton>
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
                            navigatetoQuestion(item.id)
                          }}
                          style={{
                            backgroundColor: '#1e4356',
                            color: '#fff',
                            borderColor: '#1e4356',
                          }}
                        >
                          Quesitons
                        </CButton>
                        &nbsp;&nbsp;
                        <CButton
                          className="text-right "
                          onClick={() => {
                            setUpdateVisibleXL(true)
                            setSelectedQuestioner(item)
                            setTitle(item.title)
                            setForWhom(item.forWhom)
                            setSubmittedDate(item.submittedDate)
                            setStatus(item.status)
                          }}
                          style={{
                            backgroundColor: '#1e4356',
                            color: '#fff',
                            borderColor: '#1e4356',
                          }}
                        >
                          Update
                        </CButton>
                        &nbsp;&nbsp;
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
                          View
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

export default Questioner

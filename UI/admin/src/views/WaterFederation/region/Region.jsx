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
  CAvatar,
  CModal,
  CModalHeader,
  CModalTitle,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { MDBCol, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage } from 'mdb-react-ui-kit'
import { useState, useEffect } from 'react'
import { customToast } from 'src/components/customToast'
import axios from 'axios'
import { urlRegion } from 'src/endpoints'
function Region({ setIsLodding }) {
  const [addvisibleXL, setAddVisibleXL] = useState(false)
  const [updatevisibleXL, setUpdateVisibleXL] = useState(false)
  const [selectedRegion, setSelectedRegion] = useState([])
  const [regionName, setRegionName] = useState('')
  const [regions, setRegions] = useState([])

  useEffect(() => {
    axios
      .get(urlRegion)
      .then((res) => setRegions(res.data))
      .catch((err) => console.error(err))
  }, [addvisibleXL, updatevisibleXL])

  const handleSubmit = async (event) => {
    event.preventDefault()

    const formData = new FormData()

    //user)
    formData.set('regionName', regionName)

    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.stopPropagation()
    }
    try {
      setIsLodding(true)
      axios.defaults.withCredentials = true
      axios
        .post(urlRegion, formData)
        .then((res) => {
          setIsLodding(false)
          setAddVisibleXL(false)

          customToast('Region Successfully created', 0)
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
    formData.set('regionName', regionName)
    formData.set('id', selectedRegion.id)

    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.stopPropagation()
    }
    try {
      setIsLodding(true)
      axios.defaults.withCredentials = true
      axios
        .put(urlRegion, formData)
        .then((res) => {
          setIsLodding(false)
          setUpdateVisibleXL(false)

          customToast('Region Successfully UPdated', 0)
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
      <CModal size="xl" visible={addvisibleXL} onClose={() => setAddVisibleXL(false)}>
        <CModalHeader
          style={{
            backgroundColor: '#1e4356',
            color: '#fff',
          }}
        >
          <CModalTitle>
            <strong>Add </strong> <small>Region</small>{' '}
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
                              <CCol xs="5">
                                <CFormInput
                                  type="text"
                                  placeholder="region ...."
                                  required
                                  value={regionName}
                                  onChange={(e) => setRegionName(e.target.value)}
                                />
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
            <strong>Update </strong> <small>Region</small>{' '}
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
                              <CCol xs="5">
                                <CFormInput
                                  type="text"
                                  placeholder="region ...."
                                  required
                                  value={regionName}
                                  onChange={(e) => setRegionName(e.target.value)}
                                />
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
                  <strong>Region</strong>{' '}
                </CCol>
                <CCol sm={2} className="d-flex justify-content-end">
                  <CButton
                    className="text-right bg-white"
                    onClick={() => {setRegionName(''); setAddVisibleXL(true)}}
                    style={{ color: '#1e4356', borderColor: '#fff' }}
                    type="submit"
                  >
                    Add Region
                  </CButton>
                </CCol>
              </CRow>
            </CCardHeader>
            <CCardBody>
              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead color="light">
                  <CTableRow>
                    <CTableHeaderCell>No.</CTableHeaderCell>
                    <CTableHeaderCell>Region Name</CTableHeaderCell>

                    <CTableHeaderCell>Details</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {regions.map((item, index) => (
                    <CTableRow v-for="item in tableItems" key={index}>
                      <CTableDataCell>{index + 1}</CTableDataCell>
                      <CTableDataCell>{item.regionName}</CTableDataCell>

                      <CTableDataCell>
                    
                        <CButton
                          className="text-right "
                          onClick={() => {
                            setUpdateVisibleXL(true)
                            setSelectedRegion(item)
                            setRegionName(item.regionName)
                          }}
                          style={{ backgroundColor: '#1e4356',
                          color: '#fff',
                          borderColor: '#1e4356',}}
                         
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

export default Region

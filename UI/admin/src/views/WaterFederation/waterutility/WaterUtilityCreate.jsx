import React, { useState, useEffect } from 'react'
import ReactQuill, { Quill } from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import ImageResize from 'quill-image-resize-module-react'
import { customToast } from '../../../components/customToast'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
Quill.register('modules/imageResize', ImageResize)
import { MDBCol, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage } from 'mdb-react-ui-kit'

import {
  CCard,
  CCardHeader,
  CRow,
  CCol,
  CCardBody,
  CCallout,
  CButton,
  CFormInput,
  CFormLabel,
  CForm,
  CFormSelect,
} from '@coreui/react'
import { urlRegionalFederation, urlWaterUtility } from '../../../endpoints'

export default function RegionalFederationCreate({ user, setIsLodding }) {
  const [img, setImg] = useState('')
  const [description, setDescription] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [kmfromaa, setKm] = useState('')
  const [establisheddate, setDate]= useState('')
  const [source, setSource]=useState('')
  const [noemployees, setNoemployees] =useState('')
  const [distributionkm, setDistrbutionkm]= useState('')
  const [mainpresure, setMainpresure]= useState('')
  const [reservwire, setReservewire]= useState('')
  const [purification, setpurifications]= useState('')
  const [prodcapa, setProdcap]= useState('')
  const [regionalWaterFederationId, setRegionalWaterFederationId] = useState('')
  const [regionalFederations, setRegionalFederations] = useState([])

  const sources =["Surface","Spring","Settel"]

  useEffect(() => {
    axios
      .get(urlRegionalFederation)
      .then((res) => setRegionalFederations(res.data))
      .catch((err) => console.error(err))
  }, [])

  const navigate = useNavigate()

  const photoInputHandler = (event) => {
    setImg(event.target.files[0])
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const formData = new FormData()

    //user)
    formData.append('Photo', img)
    formData.set('name', name)
    formData.set('email', email)
    formData.set('phone', phone)
    formData.set('password',password)
    formData.set('description', description)
    formData.set('regionalWaterFederationId', regionalWaterFederationId)
    formData.set('kmfromaa', kmfromaa)
    formData.set('establisheddate', establisheddate)
    formData.set('source',source)
    formData.set('noemployees',noemployees)
    formData.set('distributionkm',distributionkm)
    formData.set('mainpresure',mainpresure)
    formData.set('reservwire',reservwire)
    formData.set('Purification',purification)
    formData.set('prodcapa', prodcapa)
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.stopPropagation()
    }
    try {
      setIsLodding(true)
      axios.defaults.withCredentials = true
      axios
        .post(urlWaterUtility, formData)
        .then((res) => {
          setIsLodding(false)
          navigate('/waterutility')
          customToast('Water Utility Successfully created', 0)
        })
        .catch((err) => {
          setIsLodding(false)
          alert(err)
          console.error(err)
        })
    } catch (error) {
      setIsLodding(false)
      customToast(error, 1)
      console.error(error)
    }
  }

  const modules = {
    toolbar: [
      [{ header: '1' }, { header: '2' }, { font: [] }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
      ['link', 'image', 'video'],
      ['clean'],
    ],
    clipboard: {
      matchVisual: false,
    },
    imageResize: {
      parchment: Quill.import('parchment'),
      modules: ['Resize', 'DisplaySize'],
    },
  }

  const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'video',
  ]

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
                <strong>Water Utility</strong> <small>Create</small>
              </CCol>
            </CRow>
          </CCardHeader>
          <CForm validated onSubmit={handleSubmit}>
            <CCardBody>
              <MDBRow>
                <MDBCol lg="4">
                  <MDBCard className="mb-4">
                    <MDBCardBody className="text-center">
                      {img && (
                        <MDBCardImage
                          src={URL.createObjectURL(img)}
                          alt="avatar"
                          style={{ width: '280px', borderRadius: '20px', border: 'solid #fff' }}
                          fluid
                        />
                      )}

                      <div className="d-flex justify-content-center mb-10">
                        <CCol md={4}>
                          <CFormLabel htmlFor="formFileLg">Logo</CFormLabel>
                          <CFormInput
                            type="file"
                            size="sm"
                            accept="image/*"
                            onChange={photoInputHandler}
                            required
                            id="formFileLg"
                          />
                        </CCol>
                      </div>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>

                <MDBCol lg="8">
                  <MDBCard className="mb-4">
                    <MDBCardBody>
                      <MDBRow>
                        <MDBCol sm="3">
                          <MDBCardText> Name</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                          <CFormInput
                            type="text"
                            placeholder="name ..."
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                        </MDBCol>
                      </MDBRow>
                      <hr />
                      <MDBRow>
                        <MDBCol sm="3">
                          <MDBCardText>Email</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                          <CFormInput
                            type="email"
                            placeholder="email..."
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </MDBCol>
                      </MDBRow>
                      <hr />
                      <MDBRow>
                        <MDBCol sm="3">
                          <MDBCardText>Password</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                          <CFormInput
                            type="password"
                            placeholder="password ..."
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </MDBCol>
                      </MDBRow>

                      <hr />
                      <MDBRow>
                        <MDBCol sm="3">
                          <MDBCardText>Phone Nmber</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                          <CFormInput
                            type="text"
                            placeholder="phone number ..."
                            required
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                          />
                        </MDBCol>
                      </MDBRow>
                      <hr />
                      <MDBRow>
                        <MDBCol sm="3">
                          <MDBCardText>Number of Employees</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                          <CFormInput
                            type="number"
                            placeholder="Number of Employees ..."
                            required
                            value={noemployees}
                            onChange={(e) => setNoemployees(e.target.value)}
                          />
                        </MDBCol>
                      </MDBRow>
                      <hr />
                      <MDBRow>
                        <MDBCol sm="3">
                          <MDBCardText>Purification</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                          <CFormInput
                            type="text"
                            placeholder="purification ..."
                            required
                            value={purification}
                            onChange={(e) => setpurifications(e.target.value)}
                          />
                        </MDBCol>
                      </MDBRow>
                      <hr />
                      <MDBRow>
                        <MDBCol sm="3">
                          <MDBCardText>Production Capacity</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                          <CFormInput
                            type="number"
                            placeholder="production capacity ..."
                            required
                            value={prodcapa}
                            onChange={(e) => setProdcap(e.target.value)}
                          />
                        </MDBCol>
                      </MDBRow>
                      <hr />
                      <MDBRow>
                        <MDBCol sm="3" className='mb-2'>
                          <MDBCardText>Main System Contains </MDBCardText>
                        </MDBCol>
                        <hr/>
                        <MDBCol sm="4">
                          <CFormInput
                            type="number"
                            placeholder="Distribution KM ..."
                            required
                            value={distributionkm}
                            onChange={(e) => setDistrbutionkm(e.target.value)}
                          />
                        </MDBCol>
                        <MDBCol sm="4">
                          <CFormInput
                            type="number"
                            placeholder="main pressure ..."
                            required
                            value={mainpresure}
                            onChange={(e) => setMainpresure(e.target.value)}
                          />
                        </MDBCol>
                        <MDBCol sm="4">
                          <CFormInput
                            type="number"
                            placeholder="reserve wire capacity ..."
                            required
                            value={reservwire}
                            onChange={(e) => setReservewire(e.target.value)}
                          />
                        </MDBCol>
                      </MDBRow>
                      <hr />
                      <MDBRow>
                        <MDBCol sm="3">
                          <MDBCardText>Source</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                          <CFormSelect
                            type="text"
                            required
                            value={source}
                            onChange={(e) => setSource(e.target.value)}
                          >
                            <option>--- Select Source ----</option>

                            {sources.map((item, index) => (
                              <option key={index} value={item}>
                                {item}
                              </option>
                            ))}
                          </CFormSelect>
                        </MDBCol>
                      </MDBRow>
                      <hr />
                      <MDBRow>
                        <MDBCol sm="3">
                          <MDBCardText>Established Date</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                          <CFormInput
                            type="date"
                            required
                            value={establisheddate}
                            onChange={(e) => setDate(e.target.value)}
                          />
                        </MDBCol>
                      </MDBRow>
                      <hr />
                      <MDBRow>
                        <MDBCol sm="3">
                          <MDBCardText>KM from AA</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                          <CFormInput
                            type="number"
                            placeholder="killo meter from Addis Abeba ..."
                            required
                            value={kmfromaa}
                            onChange={(e) => setKm(e.target.value)}
                          />
                        </MDBCol>
                      </MDBRow>
                      <hr />
                      <MDBRow>
                        <MDBCol sm="3">
                          <MDBCardText>Regional Association</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                          <CFormSelect
                            type="text"
                            required
                            value={regionalWaterFederationId}
                            onChange={(e) => setRegionalWaterFederationId(e.target.value)}
                          >
                            <option>--- Select Regional Association ----</option>
                            {regionalFederations.map((item, index) => (
                              <option key={index} value={item.id}>
                                {item.name}
                              </option>
                            ))}
                          </CFormSelect>
                        </MDBCol>
                      </MDBRow>
                      <hr/>
                      <MDBRow>
                        <MDBCol sm="3">
                          <MDBCardText>Description</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                          <ReactQuill
                            formats={formats}
                            modules={modules}
                            theme="snow"
                            required
                            value={description}
                            onChange={setDescription}
                          />
                        </MDBCol>
                      </MDBRow>
                      <hr />
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
              </MDBRow>

              <CCol xs={12} className="d-flex justify-content-end">
                <CButton
                  className="text-right"
                  size="lg"
                  style={{ backgroundColor: '#1e4356', color: '#fff', borderColor: '#fff' }}
                  type="submit"
                >
                  Save
                </CButton>
              </CCol>
            </CCardBody>
          </CForm>
        </CCard>
      </CCol>
    </CRow>
  )
}

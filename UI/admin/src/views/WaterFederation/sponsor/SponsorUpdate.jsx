import React, { useState, useEffect } from 'react'
import ReactQuill, { Quill } from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import ImageResize from 'quill-image-resize-module-react'
import { customToast } from '../../../components/customToast'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
Quill.register('modules/imageResize', ImageResize)
import { MDBCol, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage } from 'mdb-react-ui-kit'
import { useLocation } from 'react-router-dom'

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
  CFormSelect,
  CForm,
} from '@coreui/react'
import { assetUrl, urlboardmember, urlSponsor } from '../../../endpoints'

function SponsorUpdate({ user, setIsLodding }) {
  const location = useLocation()

  const sponsor = location.state.sponsor

  console.log("sponser update", sponsor)

  //bordMember)

  const [img, setImg] = useState('')
  const [description, setDescription] = useState(sponsor.description)
  const [companyName, setCompanyName] = useState(sponsor.companyName)
  const [amharicCompanyName, setAmharicCompanyName] = useState(sponsor.amharicCompanyName)
  const [sponcerLevel, setSponcerLevel] = useState(sponsor.sponcerLevel)
  const [type, setType] = useState(sponsor.supportType)
  const [weblink,setWebLink]= useState(sponsor.webLink)
  const SponsorLevels = ['Platinum', 'Diamond', 'Gold', 'Silver']
  const Types = ["Sponser", "Partnership"]
  const navigate = useNavigate()
  const [file, setFile] = useState('')
  const photoInputHandler = (event) => {
    setImg(event.target.files[0])
  }

  const fileInputHandler = (event) => {
   
    setFile(event.target.files[0])
  }


  const handleSubmit = async (event) => {
    event.preventDefault()

    const formData = new FormData()

    if (file != ''){
      formData.append('Brocher', file)
    }
    else{
      formData.append('Brocher', getImage(sponsor.brocherPath))
    }

    formData.append('Photo', img)
  
    formData.set('companyName', companyName)
    formData.set('amharicCompanyName', amharicCompanyName)
    formData.set('sponcerLevel', sponcerLevel)
    formData.set('Description', description)
    formData.set('ID', sponsor.id)
    formData.set('SupportType', type)
    formData.set('WebLink', weblink)
   
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.stopPropagation()
    }
    
    try {
      setIsLodding(true)
      axios.defaults.withCredentials = true
      axios
        .put(urlSponsor, formData)
        .then((res) => {
          setIsLodding(false)
          navigate('/sponsor')
          customToast('Sponsor Successfully updated', 0)
        })
        
        .catch((err) => {
          setIsLodding(false)
          alert(err)
          
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
  const getImage = (item) => {
    return `${assetUrl}/${item}`
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
                <strong>Research</strong> <small>Update</small>
              </CCol>
            </CRow>
          </CCardHeader>
          <CForm validated onSubmit={handleSubmit}>
            <CCardBody>
              <MDBRow>
                <MDBCol lg="4">
                  <MDBCard className="mb-4">
                    <MDBCardBody className="text-center">
                      <MDBCardImage
                        src={img ? URL.createObjectURL(img) : getImage(sponsor.logo)}
                        alt="avatar"
                        style={{ width: '280px', borderRadius: '20px', border: 'solid #fff' }}
                        fluid
                      />

                      <div className="d-flex justify-content-center mb-10">
                        <CCol md={4}>
                          <CFormLabel htmlFor="formFileLg">Photo</CFormLabel>
                          <CFormInput
                            type="file"
                            size="sm"
                            accept="image/*"
                            onChange={photoInputHandler}
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
                          <MDBCardText>Company Name</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                          <CFormInput
                            type="text"
                            placeholder="company name ..."
                            required
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                          />
                        </MDBCol>
                      </MDBRow>
                      <hr />
                      <MDBRow>
                        <MDBCol sm="3">
                          <MDBCardText>Amharic Company Name</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                          <CFormInput
                            type="text"
                            placeholder="amharic company name..."
                            required
                            value={amharicCompanyName}
                            onChange={(e) => setAmharicCompanyName(e.target.value)}
                          />
                        </MDBCol>
                      </MDBRow>
                      <hr />
                      <MDBRow>
                        <MDBCol sm="3">
                          <MDBCardText>Web Link</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                          <CFormInput
                            type="url"
                            placeholder="http://example.com"
                            
                            value={weblink}
                            onChange={(e) => setWebLink(e.target.value)}
                          />
                        </MDBCol>
                      </MDBRow>
                      <hr />
                      <MDBRow>
                        <MDBCol sm="3">
                          <MDBCardText>Brocher</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="4">
                          <CFormInput
                            type="file"
                            size="sm"
                            onChange={fileInputHandler}
                            
                            id="formFileLg"
                          />
                          </MDBCol>
                           <MDBCol sm="5">
                       <a    style={{
                            backgroundColor: '#1e4356',
                            color: '#fff',
                            borderColor: '#fff',
                            marginLeft:"5px",
                            padding:'10px',
                            borderRadius:'10px'
                          }} href={sponsor && file ? URL.createObjectURL(file) : getImage(sponsor.brocherPath)}  target="_blank">Open File</a>
                        

                        </MDBCol>
                      </MDBRow>
                      <hr />
                      <MDBRow>
                        <MDBCol sm="3">
                          <MDBCardText>Type </MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                          <CFormSelect
                            required
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                          >
                            <option>--- Select Type ---</option>

                            {Types.map((item, index) => (
                              <option value={index} key={index}>
                                {item}
                              </option>
                            ))}
                          </CFormSelect>
                        </MDBCol>
                      </MDBRow>
                      <hr />
                      <MDBRow>
                        <MDBCol sm="3">
                          <MDBCardText>Sponsor Level </MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                          <CFormSelect
                            required
                            value={sponcerLevel}
                            onChange={(e) => setSponcerLevel(e.target.value)}
                          >
                            <option>--- Select Sponsor Level ---</option>

                            {SponsorLevels.map((item, index) => (
                              <option value={index} key={index}>
                                {item}
                              </option>
                            ))}
                          </CFormSelect>
                        </MDBCol>
                      </MDBRow>


                      <hr />

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
                  Update
                </CButton>
              </CCol>
            </CCardBody>
          </CForm>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default SponsorUpdate

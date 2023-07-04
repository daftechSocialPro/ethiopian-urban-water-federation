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
  CFormSwitch,
  CForm,
} from '@coreui/react'
import { assetUrl, urlresearch } from '../../../endpoints'

function ResearchUpdate({ user, setIsLodding }) {
  const location = useLocation()

  const research = location.state.research



  const [img, setImg] = useState('')
  const [file, setFile] = useState('')

  const [author, setAuthor] = useState(research.author)
  const [title, setTitle] = useState(research.title)
  const [description, setDescription] = useState(research.description)
  const [amharicAuthor, setAmharicAuthor] = useState(research.amharicAuthor)
  const [amharicTitle, setAmharicTitle] = useState(research.amharicTitle)

  const [publishedAt, setPublishedAt] = useState(research.publishedAt.toString('yyyy-mm-dd'))


  console.log("published at",publishedAt)

  const navigate = useNavigate()

  const photoInputHandler = (event) => {
    setImg(event.target.files[0])
  }

  const fileInputHandler = (event) => {
    setFile(event.target.files[0])
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const formData = new FormData()

    //user)
    formData.append('AutherImage', img)
    formData.append('ResearchFile', file)
    formData.set('author', author)
    formData.set('title', title)
    formData.set('description', description)
    formData.set('amharicDescription', description)

    formData.set('amharicAuthor', amharicAuthor)

    formData.set('amharicTitle', amharicTitle)

    formData.set('publishedAt', publishedAt)
    formData.set('ID',research.id)

    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.stopPropagation()
    }
    try {
      setIsLodding(true)
      axios.defaults.withCredentials = true
      axios
        .put(urlresearch, formData)
        .then((res) => {
          setIsLodding(false)
          navigate('/research')
          customToast('research Successfully updated', 0)
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
                        src={img ? URL.createObjectURL(img) : getImage(research.authorImagePath)}
                        alt="avatar"
                        style={{ width: '280px', borderRadius: '20px', border: 'solid #fff' }}
                        fluid
                      />

                      <div className="d-flex justify-content-center mb-10">
                        <CCol md={4}>
                          <CFormLabel htmlFor="formFileLg">Author Image</CFormLabel>
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
                          <MDBCardText>Author</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                          <CFormInput
                            type="text"
                            placeholder="author ..."
                            required
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                          />
                        </MDBCol>
                      </MDBRow>
                      <hr />
                      <MDBRow>
                        <MDBCol sm="3">
                          <MDBCardText>Author Amharic Name</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                          <CFormInput
                            type="text"
                            placeholder="author amharic..."
                            required
                            value={amharicAuthor}
                            onChange={(e) => setAmharicAuthor(e.target.value)}
                          />
                        </MDBCol>
                      </MDBRow>
                      <hr />
                      <MDBRow>
                        <MDBCol sm="3">
                          <MDBCardText>Title</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                          <CFormInput
                            type="text"
                            placeholder="title..."
                            required
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                          />
                        </MDBCol>
                      </MDBRow>
                      <hr />

                      <MDBRow>
                        <MDBCol sm="3">
                          <MDBCardText>Amharic Title</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                          <CFormInput
                            type="text"
                            placeholder="amharic title..."
                            required
                            value={amharicTitle}
                            onChange={(e) => setAmharicTitle(e.target.value)}
                          />
                        </MDBCol>
                      </MDBRow>
                      <hr />
                      <MDBRow>
                        <MDBCol sm="3">
                          <MDBCardText>Published At</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                          <CFormInput
                            type="datetime-local"
                            required
                            value={publishedAt}
                            onChange={(e) => setPublishedAt(e.target.value)}
                          />
                        </MDBCol>
                      </MDBRow>
                      <hr />

                      <MDBRow>
                        <MDBCol sm="3">
                          <MDBCardText>Research File</MDBCardText>
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
                          }} href={research && getImage(research.researchFilePath)}  target="_blank">Open File</a>
                        

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

export default ResearchUpdate

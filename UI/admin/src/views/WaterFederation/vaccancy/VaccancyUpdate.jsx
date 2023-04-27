
import React, { useState } from 'react'
import axios from 'axios'
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ImageResize from 'quill-image-resize-module-react';
import { useNavigate,useLocation } from 'react-router-dom'

Quill.register('modules/imageResize', ImageResize);
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CRow,
  CFormLabel,
  CCallout,
  CFormSwitch
} from '@coreui/react'

import { customToast } from 'src/components/customToast';

import {   urlVaccancy } from '../../../endpoints'

export default function VaccancyCreate({ user,setIsLodding }) {

    const location = useLocation();
    const vaccancy = location.state.vaccancys;
    const navigate = useNavigate();
  const [title, setTitle] = useState(vaccancy.title)
  const [description, setDescription] = useState(vaccancy.description)
  const [amharicTitle, setAmharicTitle] = useState(vaccancy.amharicTitle)
  const [fromDate, setFromDate] = useState(vaccancy.fromDateTime)
  const [toDate, setToDate] = useState(vaccancy.toDateTime)
  const [amharicDescription, setAmharicDescription] = useState(vaccancy.amharicDescription)
  const [company, setCompany] = useState(vaccancy.company)
  const [email, setEmail] = useState(vaccancy.email)
  
  
  
  
    const handleSubmit = async (event) => {      
      setIsLodding(true)  
      event.preventDefault()  
      const formData = new FormData();  
      formData.set('Title', title)
    formData.set('AmharicTitle', amharicTitle)
    formData.set('ToDateTime', toDate)
    formData.set('FromDateTime', fromDate)
    formData.set('AmharicDescription', amharicDescription)
    formData.set('Description', description)
    formData.set('Company', company)
    formData.set('Email', email)    
  
      const form = event.currentTarget

      if (form.checkValidity() === false) {
          event.stopPropagation()
      }
      try {
  
        await axios.put(urlVaccancy, formData)
        .then((res) => {
            setIsLodding(false)
            navigate('/vaccancy')
            customToast('Vaccancy Successfully Updated', 0)
          })
     
        .catch((err) => {
          setIsLodding(false)
          customToast(err,1)
          console.error(err)
        })
  
      }
      catch (error) {
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
        [
          { list: 'ordered' },
          { list: 'bullet' },
          { indent: '-1' },
          { indent: '+1' }
        ],
        ['link', 'image', 'video'],
        ['clean']
      ],
      clipboard: {
        matchVisual: false
      },
      imageResize: {
        parchment: Quill.import('parchment'),
        modules: ['Resize', 'DisplaySize']
      }
    };
  
  
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
      'video'
    ];


    
  return (
    <CRow>
    <CCol xs={12}>
      <CCallout className='bg-white'>
       
      </CCallout>

    </CCol>
    <CCol xs={12}>
      <CCard className="mb-4">
        <CCardHeader style={{ backgroundColor: '#1e4356', color: '#fff' }}>
          <strong>Update </strong> <small>Vaccancy</small>
        </CCardHeader>
        <CCardBody>
          <CForm
            className="row g-3 needs-validation"

            validated
            onSubmit={handleSubmit}
          >
            <CCol md={3}></CCol>
         
            <CCol md={3}></CCol>

           

            <CCol md={5}>
              <CFormInput
                type="text"
                placeholder="title..."

                label="Title"
                required
                value={title}

                onChange={(e) => setTitle(e.target.value)}

              />

            </CCol>
            <CCol md={5}>
              <CFormInput
                type="text"
                placeholder="amharicTitle .... "


                label="Amharic Title"

                required
                value={amharicTitle}
                onChange={(e) => setAmharicTitle(e.target.value)}
              />
            </CCol>
            <CCol md={5}>
              <CFormInput
                type="text"
                placeholder="company .... "


                label="Company"

                required
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
            </CCol>
            <CCol md={5}>
              <CFormInput
                type="text"
                placeholder="email .... "


                label="Email"

                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </CCol>
            <CCol md={5}>
              <CFormInput
                type="date"
               


                label="To date"

                required
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
              />
            </CCol>
            <CCol md={5}>
              <CFormInput
                type="date"
               


                label="From Date"

                required
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
              />
            </CCol>


           
                        
                       
            <CCol xs={12}>
              <CFormLabel htmlFor="formFileLg">Description</CFormLabel>
              <ReactQuill formats={formats} modules={modules} theme="snow" required value={description} onChange={setDescription} />
            </CCol>
            <CCol xs={12}>
              <CFormLabel htmlFor="formFileLg"> Amharic Description</CFormLabel>
              <ReactQuill formats={formats} modules={modules} theme="snow" required value={amharicDescription} onChange={setAmharicDescription} />
            </CCol>

            <CCol xs={12} className="d-flex justify-content-end">

              <CButton size='lg' style={{ backgroundColor: '#1e4356', color: '#fff', borderColor: '#1e4356' }} type="submit">
                Update
              </CButton>
            </CCol>
          </CForm>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
  )
}


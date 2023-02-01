
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
  CFormSwitch,
  CFormSelect
} from '@coreui/react'



import { assetUrl, urlForum } from 'src/endpoints'
import { customToast } from 'src/components/customToast';


function ForumEdit({setIsLodding}) {
    
    
    const navigate = useNavigate();
    const location = useLocation();
    const Forum = location.state.Forum;
   
    
    const [description, setDescription] = useState(Forum.description);
    const [title, setTitle] = useState(Forum.title);
    const [isforumEvent, setIsForumEvent] = useState(Forum.isForumEvent)
    const [img, setImg] = useState('');
    
  
  
    const photoInputHandler = (event) => {
      setImg(event.target.files[0]);
    };
    
  
    const handleSubmit = async (event) => {      
      setIsLodding(true)  
      event.preventDefault()  
      const formData = new FormData();  
      formData.append("Photo", img);
      formData.set("title", title);
      formData.set('IsForumEvent', isforumEvent)
      formData.set("description", description);
      formData.set("ID",Forum.id)
        
  
      const form = event.currentTarget

      if (form.checkValidity() === false) {
          event.stopPropagation()
      }
      try {
  
        await axios.put(urlForum, formData).
        then((res) => {
          setIsLodding(false)
          setTitle('')
          setDescription('')
          setImg('');
       
          customToast("Forum Successfully update", 0)
          navigate("/Forum")
          window.location.reload()
  
        }
        ).catch((err) => {
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

    const getImage =(item) =>{
        return `${assetUrl}/${item}`
    }

    
  return (
    <CRow>
    <CCol xs={12}>
      <CCallout className='bg-white'>
       
      </CCallout>

    </CCol>
    <CCol xs={12}>
      <CCard className="mb-4">
        <CCardHeader style={{ backgroundColor: '#1e4356', color: '#fff' }}>
          <strong>Update </strong> <small>Forum</small>
        </CCardHeader>
        <CCardBody>
          <CForm
            className="row g-3 needs-validation"

            validated
            onSubmit={handleSubmit}
          >
            <CCol md={3}></CCol>
            <CCol md={6}>
               <img style={{ maxHeight: '400px', width: "100%", border: "solid #1e4356", borderRadius: "20px" }} src={!img?getImage(Forum.img):URL.createObjectURL(img)} />
            </CCol>
            <CCol md={3}></CCol>

            <CCol md={2}>

              <CFormLabel htmlFor="formFileLg">Image</CFormLabel>
              <CFormInput type="file" size="md" accept='image/*' onChange={photoInputHandler}  id="formFileLg" />
            </CCol>

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
                <CFormSelect
                  label="Is Forum or Event"
                  required
                  value={isforumEvent}
                  onChange={(e) => setIsForumEvent(e.target.value)}
                >
                  <option value={-1}> ---Select Option ---</option>
                  <option value={0}> Forum</option>
                  <option value={1}> Event</option>
                </CFormSelect>
              </CCol>


           
                        
                       
            <CCol xs={12}>
              <CFormLabel htmlFor="formFileLg">Description</CFormLabel>
              <ReactQuill formats={formats} modules={modules} theme="snow" required value={description} onChange={setDescription} />
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

export default ForumEdit
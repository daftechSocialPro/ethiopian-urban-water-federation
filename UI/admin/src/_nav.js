import React from 'react'
import CIcon from '@coreui/icons-react'
import {cilAddressBook, cilAlbum, cilApplications, cilContact, cilCouch, cilEnvelopeOpen, cilFolder, cilMediaStop, cilNewspaper, cilPaperPlane, cilPeople, cilSpeedometer} from '@coreui/icons'
import { CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    component: CNavTitle,
    name: 'Ethiopian Water Federation',
  },
  {
    
    component:CNavItem,
    name:'Regional Association',
    to:"/regionalwaterfederation",
    icon:<CIcon icon={cilSpeedometer} customClassName="nav-icon" />
  },
  {
    
    component:CNavItem,
    name:'Board Members',
    to:"/boardmember",
    icon:<CIcon icon={cilPeople} customClassName="nav-icon" />
  },
  {
    
    component:CNavItem,
    name:'Minister',
    to:"/minister",
    icon:<CIcon icon={cilPeople} customClassName="nav-icon" />
  },
  {
    
    component:CNavItem,
    name:'News',
    to:"/news",
    icon:<CIcon icon={cilNewspaper} customClassName="nav-icon" />
  },
  {
    
    component:CNavItem,
    name:'Forum',
    to:"/forum",
    icon:<CIcon icon={cilNewspaper} customClassName="nav-icon" />
  },
 
  {
    
    component:CNavItem,
    name:'Researches',
    to:"/research",
    icon:<CIcon icon={cilAddressBook} customClassName="nav-icon" />
  },
  {
    
    component:CNavItem,
    name:'Vaccancy',
    to:"/vaccancy",
    icon:<CIcon icon={cilAlbum} customClassName="nav-icon" />
  },
  {
    
    component:CNavItem,
    name:'Contact Us',
    to:"/contact",
    icon:<CIcon icon={cilContact} customClassName="nav-icon" />
  }, 
  {
    
    component:CNavItem,
    name:'Email Subscribers',
    to:"/subscriber",
    icon:<CIcon icon={cilEnvelopeOpen} customClassName="nav-icon" />
  },  
  {        
    component:CNavItem,
    name:'Region',
    to:"/region",
    icon:<CIcon icon={cilCouch} customClassName="nav-icon" />
  },
  {
    
    component:CNavItem,
    name:'Questioner',
    to:"/questioner",
    icon:<CIcon icon={cilFolder} customClassName="nav-icon" />
  },
  {
    
    component:CNavItem,
    name:'Sponsor',
    to:"/sponsor",
    icon:<CIcon icon={cilApplications} customClassName="nav-icon" />
  }



 
 
 
 
]

export default _nav

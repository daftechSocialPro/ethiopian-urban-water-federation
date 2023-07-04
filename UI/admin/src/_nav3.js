import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilFile, cilSpeedometer} from '@coreui/icons'
import { CNavItem, CNavTitle } from '@coreui/react'

const _nav3 = [
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
    name:'Questioner',
    to:"/answer",
    icon:<CIcon icon={cilFile} customClassName="nav-icon" />
  },
  
 
]

export default _nav3

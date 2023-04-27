import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilFile,cilNewspaper,cilSpeedometer} from '@coreui/icons'
import { CNavItem } from '@coreui/react'

const _nav4 = [
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
    
    component:CNavItem,
    name:'News',
    to:"/news",
    icon:<CIcon icon={cilNewspaper} customClassName="nav-icon" />
  },

  {
    
    component:CNavItem,
    name:'Questioner',
    to:"/questioner",
    icon:<CIcon icon={cilFile} customClassName="nav-icon" />
  },
 
 
 
 
]

export default _nav4

import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
  CAvatar,

  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import {

  cilLockLocked,

  cilUser,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'

import avatar8 from './../../assets/logo4.png'
import axios from 'axios'
import { urlusers } from 'src/endpoints'

const AppHeaderDropdown = ({ setIsLoggedIn, user }) => {
  const navigate = useNavigate()

  const logOut = (e) => {
    e.preventDefault()
    axios.defaults.withCredentials = true
    axios.post(`${urlusers}/logout`).then((res) => {
      //res.data)
      setIsLoggedIn(false)
      navigate('/login')
    })
  }

  const navigateTo = (e) => {
    e.preventDefault()
    navigate('/mahber/profile')
  }

  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <CAvatar src={avatar8} size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        
        <CDropdownHeader className="bg-light fw-semibold py-2">Settings</CDropdownHeader>

        {user.userRole == 1 && (
          <CDropdownItem onClick={navigateTo}>
            <CIcon icon={cilUser} className="me-2" />
            Profile
          </CDropdownItem>
        )}

    
        <CDropdownDivider />
        <CDropdownItem onClick={logOut}>
          <CIcon icon={cilLockLocked} className="me-2" />
          Log Out
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown

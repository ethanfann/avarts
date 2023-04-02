import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import UserContext from '../userContext'
import { toggleSidebar } from '../utils/sideBar'
import AvatarDropdown from './AvatarDropdown'
import { Link, useLocation } from 'react-router-dom'
import LoginDropdown from './LoginDropdown'
import DarkModeToggleButton from './DarkModeToggleButton'
import styled from 'styled-components'

const Header: React.FC = () => {
  const location = useLocation()

  const handleClick = () => {
    // Scroll to the top if we're already viewing the timeline
    if (location.pathname === '/') {
      const contentWrapper = document.getElementById('contentWrapper')
      if (contentWrapper !== null) {
        contentWrapper.scrollTo(0, 0)
      }
    }
  }

  return (
    <UserContext.Consumer>
      {(ctx) => (
        <nav className="d-flex navbar">
          <div className="navbar-content mr-auto">
            {ctx.user.id !== '0' && (
              <button
                id="toggleSidebarButton"
                className="btn"
                onClick={toggleSidebar}
                aria-label={'toggle sidebar'}
              >
                <FontAwesomeIcon icon={faBars} />
              </button>
            )}
            <Link
              className="navbar-brand font-weight-bolder"
              to="/"
              onClick={handleClick}
            >
              Avarts
            </Link>
          </div>
          <StyledDarkModeToggle />
          {ctx.user.id === '0' ? <LoginDropdown /> : <AvatarDropdown />}
        </nav>
      )}
    </UserContext.Consumer>
  )
}

const StyledDarkModeToggle = styled(DarkModeToggleButton)`
  margin-right: 10px;
`

export default Header

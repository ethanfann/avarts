import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import UserContext from '../userContext'
import { toggleSidebar } from '../utils/sideBar'
import AvatarDropdown from './AvatarDropdown'
import { Link } from 'react-router-dom'
import LoginDropdown from './LoginDropdown'

const Header: React.FC = () => {
  return (
    <UserContext.Consumer>
      {(ctx) => (
        <nav className="navbar">
          <div className="navbar-content">
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
            <Link className="navbar-brand font-weight-bolder" to="/">
              Avarts
            </Link>
          </div>
          <div className="navbar-content ml-auto">
            {ctx.user.id === '0' ? <LoginDropdown /> : <AvatarDropdown />}
          </div>
        </nav>
      )}
    </UserContext.Consumer>
  )
}

export default Header

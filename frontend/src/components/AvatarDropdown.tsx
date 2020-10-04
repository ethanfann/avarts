import { faMoon } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect } from 'react'
import UserContext from '../userContext'
import { Link } from 'react-router-dom'

const halfmoon = require('halfmoon')

export const AvatarDropdown = () => {
  useEffect(() => {
    halfmoon.onDOMContentLoaded()
  }, [])

  const toggleDarkMode = () => {
    halfmoon.toggleDarkMode()

    const darkModePref = localStorage.getItem('prefer-dark-mode')

    if (darkModePref) {
      if (darkModePref === 'true') {
        localStorage.setItem('prefer-dark-mode', 'false')
      } else if (darkModePref === 'false') {
        localStorage.setItem('prefer-dark-mode', 'true')
      }
    } else {
      localStorage.setItem('prefer-dark-mode', 'false')
    }
  }
  return (
    <UserContext.Consumer>
      {(ctx) => (
        <>
          <div className="dropdown with-arrow">
            <a
              data-toggle="dropdown"
              id="avatar-popover-toggle"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <div className="text-center">
                <img
                  style={{
                    verticalAlign: 'middle',
                    width: '30px',
                    height: '30px',
                  }}
                  src={
                    ctx.user && ctx.user.img !== ''
                      ? ctx.user?.img
                      : 'https://kctherapy.com/wp-content/uploads/2019/09/default-user-avatar-e1569863570634.png'
                  }
                  className="rounded-circle"
                  alt="..."
                />
              </div>
            </a>
            <div
              className="dropdown-menu dropdown-menu-right mr-5"
              aria-labelledby="avatar-popover-toggle"
            >
              <h5 className="dropdown-header">{ctx.user.name}</h5>
              <Link to="/settings">Settings</Link>
              <div className="dropdown-divider"></div>
              <button className="btn mt-5" onClick={ctx.logout}>
                Sign Out
              </button>
              <button
                className="btn btn-action float-right mt-5"
                type="button"
                onClick={toggleDarkMode}
                aria-label="Toggle dark mode"
              >
                <FontAwesomeIcon icon={faMoon} />
              </button>
            </div>
          </div>
        </>
      )}
    </UserContext.Consumer>
  )
}

export default AvatarDropdown

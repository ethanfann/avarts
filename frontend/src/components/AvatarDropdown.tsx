import { faMoon, faCog } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect } from 'react'
import UserContext from '../userContext'
import DarkModeToggleButton from './DarkModeToggleButton'

const halfmoon = require('halfmoon')

export const AvatarDropdown = () => {
  useEffect(() => {
    halfmoon.onDOMContentLoaded()
  }, [])

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
              <div className="d-flex d-flex-inline align-items-center">
                <div className="w-full">
                  <h5 className="dropdown-header">{ctx.user.name}</h5>
                </div>

                <div className="flex-shrink-1">
                  <a href="/settings">
                    <button className="btn btn-action float-right">
                      <FontAwesomeIcon icon={faCog} />
                    </button>
                  </a>
                </div>
              </div>
              {/* <Link to="/settings">Settings</Link> */}

              <div className="dropdown-divider"></div>
              <button className="btn mt-5" onClick={ctx.logout}>
                Sign Out
              </button>
              <DarkModeToggleButton />
            </div>
          </div>
        </>
      )}
    </UserContext.Consumer>
  )
}

export default AvatarDropdown

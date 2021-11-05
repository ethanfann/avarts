import { faCog } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect } from 'react'
import UserContext from '../userContext'
import DarkModeToggleButton from './DarkModeToggleButton'
import { Link } from 'react-router-dom'

const halfmoon = require('halfmoon')

export const AvatarDropdown = () => {
  return (
    <UserContext.Consumer>
      {(ctx) => (
        <>
          <div className="dropdown with-arrow">
            <button
              data-toggle="dropdown"
              id="avatar-popover-toggle"
              aria-haspopup="true"
              aria-expanded="false"
              style={{
                border: 'none',
                background: 'none',
              }}
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
            </button>
            <div
              className="dropdown-menu dropdown-menu-right mr-5"
              aria-labelledby="avatar-popover-toggle"
            >
              <div className="d-flex d-flex-inline align-items-center">
                <div className="w-full">
                  <h5 className="dropdown-header">{ctx.user.name}</h5>
                </div>

                <div className="flex-shrink-1">
                  <Link to="/settings">
                    <button className="btn btn-action float-right">
                      <FontAwesomeIcon icon={faCog} />
                    </button>
                  </Link>
                </div>
              </div>

              <div className="dropdown-divider"></div>
              <button
                className="btn mt-5"
                onClick={() => {
                  localStorage.removeItem('token')
                  ctx.refetch()
                }}
              >
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

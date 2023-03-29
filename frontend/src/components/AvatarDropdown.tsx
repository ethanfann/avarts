import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import UserContext from '../userContext'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'

export const AvatarDropdown = () => {
  const navigate = useNavigate()

  return (
    <UserContext.Consumer>
      {(ctx) => (
        <>
          <div className="dropdown toggle-on-hover">
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
              <img
                style={{
                  verticalAlign: 'middle',
                  width: '30px',
                  height: '30px',
                }}
                src={
                  ctx.user && ctx.user.img !== ''
                    ? ctx.user?.img
                    : '/default-user-avatar.png'
                }
                className="rounded-circle"
                alt="profile avatar"
              />
              <FontAwesomeIcon
                className="text-muted position-fixed"
                icon={faAngleDown}
              />
            </button>

            <div className="doprdown dropdown-menu dropdown-menu-right">
              <h5 className="dropdown-header">{ctx.user.name}</h5>

              <Link className="dropdown-item" to="/settings">
                Settings
              </Link>

              <div className="dropdown-divider"></div>

              <div className="dropdown-content">
                <button
                  className="btn btn-block"
                  onClick={() => {
                    localStorage.removeItem('token')
                    navigate(0)
                  }}
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </UserContext.Consumer>
  )
}

export default AvatarDropdown

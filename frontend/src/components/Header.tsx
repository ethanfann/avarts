import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState, useEffect } from 'react'
import { useLoginMutation } from '../generated/graphql'
import UserContext from '../userContext'
import { toggleSidebar } from '../utils/sideBar'
import AvatarDropdown from './AvatarDropdown'
import { Link } from 'react-router-dom'

const Header: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [signinMutation] = useLoginMutation()

  const login = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const result = await signinMutation({
        variables: {
          email: email,
          password: password,
        },
        refetchQueries: ['me'],
      })
      if (result && result.data && result.data.login?.token) {
        localStorage.setItem('token', result.data.login.token)
      }
    } catch (error) {
      console.log(error)
    }
  }

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
              >
                <FontAwesomeIcon icon={faBars} />
              </button>
            )}
            <Link className="navbar-brand font-weight-bolder" to="/">
              Avarts
            </Link>
          </div>
          <div className="navbar-content ml-auto">
            {ctx.user.id === '0' ? (
              <div className="dropdown">
                <button
                  className="btn btn-primary"
                  data-toggle="dropdown"
                  type="button"
                  id="sign-in-dropdown-toggle-btn"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Sign In
                </button>
                <div
                  className="dropdown-menu w-250 w-sm-350 dropdown-menu-right"
                  aria-labelledby="sign-in-dropdown-toggle-btn"
                >
                  <div className="dropdown-content p-20">
                    <form onSubmit={(e) => login(e)}>
                      <div className="form-group">
                        <label className="required">Username</label>
                        <input
                          type="email"
                          name="email"
                          className="form-control"
                          placeholder="Email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <label className="required">Password</label>
                        <input
                          type="password"
                          name="password"
                          className="form-control"
                          placeholder="Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                      <input
                        className="btn btn-primary btn-block"
                        type="submit"
                        value="Sign In"
                      />
                    </form>
                  </div>
                </div>
              </div>
            ) : (
              <AvatarDropdown />
            )}
          </div>
        </nav>
      )}
    </UserContext.Consumer>
  )
}

export default Header

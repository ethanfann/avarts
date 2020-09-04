import React, { useEffect } from 'react'
import UserContext from '../userContext'
import { toggleSidebar } from '../utils/sideBar'
import SignUp from './SignUp'
import TimeLine from './TimeLine'

const halfmoon = require('halfmoon')

export const Main = () => {
  useEffect(() => {
    halfmoon.onDOMContentLoaded()
    toggleSidebar()
  }, [])

  return (
    <UserContext.Consumer>
      {(ctx) => (
        <>
          <div className="content-wrapper">
            <div className="container-fluid">
              <div className="d-flex justify-content-center">
                {ctx.user.id !== '0' ? (
                  <TimeLine userId={ctx.user.id} />
                ) : (
                  <SignUp />
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </UserContext.Consumer>
  )
}

export default Main

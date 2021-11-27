import React from 'react'
import UserContext from '../userContext'
import SignUp from './SignUp'
import TimeLine from './TimeLine'

const Main = () => {
  return (
    <UserContext.Consumer>
      {(ctx) => <>{ctx.user ? <TimeLine /> : <SignUp />}</>}
    </UserContext.Consumer>
  )
}

export default Main

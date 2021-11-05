import React from 'react'
import UserContext from '../userContext'
import SignUp from './SignUp'
import TimeLine from './TimeLine'

const Main = () => {
  return (
    <UserContext.Consumer>
      {(ctx) => (
        <>
          {ctx.user.id !== '0' ? (
            <TimeLine userId={ctx.user.id} strokeColor={ctx.user.strokeColor} />
          ) : (
            <SignUp />
          )}
        </>
      )}
    </UserContext.Consumer>
  )
}

export default Main

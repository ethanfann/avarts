import DayJs from 'dayjs'
import React from 'react'
import UserContext from '../userContext'

require('halfmoon/css/halfmoon.min.css')

const UserCard: React.FC = () => {
  return (
    <UserContext.Consumer>
      {(ctx) => (
        <div>
          {ctx.user.id !== '0' && (
            <div className="card text-center">
              <img
                src={ctx.user?.img ? ctx.user.img : 'default-user-avatar.png'}
                className="img-fluid rounded-circle"
                alt="rounded circle image"
              />
              <h1 className="card-title text-center font-weight-bold font-size-22 text-primary mt-10 mb-10">
                {ctx.user?.name}
              </h1>
              <p className="font-weight-bold mb-0 pb-0 mt-0 font-size-14">
                {ctx.user.activityCount} activities
              </p>
              <hr />
              {ctx.user.latestActivity.title !== '' && (
                <>
                  <p className="text-left mb-5 font-weight-semi-bold font-size-14">
                    Latest Activity
                  </p>
                  <p className=" text-left mt-0 pt-0 font-size 12">
                    <strong>{ctx.user.latestActivity.title} • </strong>
                    <span className="font-weight-normal">
                      {DayJs.unix(ctx.user.latestActivity.startTime).format(
                        'MMMM D, YYYY'
                      )}
                    </span>
                  </p>
                </>
              )}
            </div>
          )}
        </div>
      )}
    </UserContext.Consumer>
  )
}

export default UserCard

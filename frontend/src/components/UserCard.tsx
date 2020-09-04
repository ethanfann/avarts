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
              <h1
                style={{ marginTop: 10 }}
                className="card-title text-center font-weight-bold font-size-22 text-primary"
              >
                {ctx.user?.name}
              </h1>
              <p className="font-weight-bold mb-0 pb-0">
                {ctx.user.activityCount} activities
              </p>
              <hr />
              {ctx.user.latestActivity && (
                <>
                  <p
                    style={{ lineHeight: '17 .4px', fontSize: '10px' }}
                    className="text-left mb-5 font-weight-semi-bold"
                  >
                    Latest Activity
                  </p>
                  <p
                    style={{ fontSize: '10px' }}
                    className=" text-left mt-0 pt-0"
                  >
                    <strong>{ctx.user.latestActivity.title} • </strong>
                    <span className="font-weight-normal">
                      {DayJs(ctx.user.latestActivity.createdAt).format(
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

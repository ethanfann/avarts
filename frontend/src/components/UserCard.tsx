import DayJs from 'dayjs'
import React from 'react'
import UserContext from '../userContext'
import { Link } from 'react-router-dom'

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
                style={{
                  width: 100,
                  height: 100,
                }}
                alt="user avatar"
              />
              <h1 className="card-title text-center font-weight-bold font-size-22 text-primary mt-10 mb-10">
                {ctx.user?.name}
              </h1>
              <p className="font-weight-bold mb-0 pb-0 mt-0 font-size-16">
                {ctx.user.activityCount} activities
              </p>
              <hr />
              {ctx.user.latestActivity.title !== '' && (
                <>
                  <p className="text-left mb-5 font-weight-semi-bold font-size-16">
                    Latest Activity
                  </p>
                  <div className="text-left mt-0 pt-0">
                    <Link to={`/activity/${ctx.user.latestActivity.id}`}>
                      <span className="text-primary font-weight-bolder font-size-14">
                        {ctx.user.latestActivity.title}
                      </span>
                    </Link>
                    <strong className="font-size-14"> • </strong>
                    <span className="font-weight-normal font-size-14">
                      {DayJs.unix(ctx.user.latestActivity.startTime).format(
                        'MMMM D, YYYY'
                      )}
                    </span>
                  </div>
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

import React, { useState } from 'react'
import ClimbingBoxLoader from 'react-spinners/ClimbingBoxLoader'
import { useMyActivitiesQuery } from '../../generated/graphql'
import ThemeContext from '../../themeContext'
import { CommentEnabledType } from '../../types/types'
import Activity from './Activity'
import UserContext from '../../userContext'

const TimeLine = () => {
  const [commentEnabled, enableComment] = useState<CommentEnabledType>()

  const { loading, error, data, fetchMore } = useMyActivitiesQuery({
    variables: { limit: 10, offset: 0 },
  })

  if (loading) {
    return (
      <div className="d-flex justify-content-center mt-20">
        <ClimbingBoxLoader color="grey" />
      </div>
    )
  }

  if (error) return <div>Error</div>

  if (data && data.myActivities.length === 0) {
    return (
      <div className="d-flex justify-content-center mt-20">
        <h4 className="text-primary text-align-center">No Activities</h4>
      </div>
    )
  }

  return (
    <UserContext.Consumer>
      {(userCtx) => (
        <ThemeContext.Consumer>
          {(themeCtx) => (
            <div>
              {data &&
                data.myActivities.map((activity, index) => (
                  <Activity
                    key={index}
                    id={activity.id}
                    img={activity.user.img}
                    name={activity.user.name}
                    startTime={activity.startTime}
                    title={activity.title}
                    description={activity.description}
                    polyline={activity.polyline}
                    duration={activity.duration}
                    elevation={activity.elevation}
                    distance={activity.distance}
                    darkMode={themeCtx.darkMode}
                    strokeColor={userCtx.user.strokeColor}
                    comments={activity.activityComment}
                    commentEnabled={commentEnabled}
                    enableComment={enableComment}
                  />
                ))}

              <div
                style={{
                  margin: 40,
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                {data &&
                  data.myActivities &&
                  data.myActivities.length !== userCtx.user.activityCount && (
                    <button
                      className="btn"
                      onClick={async () =>
                        fetchMore({
                          variables: { offset: data.myActivities.length },
                        })
                      }
                    >
                      Load More
                    </button>
                  )}
              </div>
            </div>
          )}
        </ThemeContext.Consumer>
      )}
    </UserContext.Consumer>
  )
}

export default TimeLine

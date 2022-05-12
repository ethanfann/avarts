import React, { useState, useContext } from 'react'
import ClimbingBoxLoader from 'react-spinners/ClimbingBoxLoader'
import { useMyActivitiesQuery } from '../../generated/graphql'
import ThemeContext from '../../themeContext'
import { CommentEnabledType } from '../../types/types'
import Activity from './Activity'
import UserContext from '../../userContext'
import styled from 'styled-components'

const TimeLine = () => {
  const [commentEnabled, enableComment] = useState<CommentEnabledType>()
  const { user } = useContext(UserContext)
  const { darkMode } = useContext(ThemeContext)

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
    <TimelineContainer>
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
            darkMode={darkMode}
            strokeColor={user.strokeColor}
            comments={activity.activityComment}
            commentEnabled={commentEnabled}
            enableComment={enableComment}
            mapImgLight={activity.mapImgLight}
            mapImgDark={activity.mapImgDark}
            mapboxToken={user.mapboxToken}
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
          data.myActivities.length !== user.activityCount && (
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
    </TimelineContainer>
  )
}

const TimelineContainer = styled.div`
  margin: auto;
  max-width: 60%;
  @media (max-width: 769px) {
    max-width: 100%;
  }
`

export default TimeLine

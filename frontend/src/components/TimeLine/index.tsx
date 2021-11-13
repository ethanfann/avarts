import { faBicycle, faComment } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import DayJs from 'dayjs'
import React, { useState } from 'react'
import ClimbingBoxLoader from 'react-spinners/ClimbingBoxLoader'
import { useMyActivitiesQuery } from '../../generated/graphql'
import { staticRideImg } from '../../utils/mapbox'
import ActivityCommentBox from './ActivityCommentBox'
import ActivityComments from './ActivityComments'
import MetricRow from './MetricRow'
import ThemeContext from '../../themeContext'

type CommentEnabledType = {
  activityId: String
  enabled: boolean
}

type PropsType = {
  strokeColor: string
}

const TimeLine = (props: PropsType) => {
  const { strokeColor } = props
  const [commentEnabled, enableComment] = useState<CommentEnabledType>()

  const { loading, error, data } = useMyActivitiesQuery()

  const activityTime = (startTime: number) => {
    const timeStr = DayJs.unix(startTime).format('MMMM D, YYYY--h:mm A')
    const timeStrSplit = timeStr.split('--')

    return DayJs(timeStrSplit[0]).isSame(DayJs(), 'day')
      ? `Today at ${timeStrSplit[1]}`
      : timeStrSplit[0] + ` at ${timeStrSplit[1]}`
  }

  // TODO: This is the thing that really needs to be tested first. We need to use just the right tolerance factor,
  // IE: most detail, without making the requst to mapbox fail.
  const activityImg = (
    polyline: string,
    darkMode: boolean,
    strokeColor: string
  ) => {
    return staticRideImg(polyline, darkMode, strokeColor)
  }

  const toggleComment = (comment: CommentEnabledType) => {
    let enabled = comment.enabled

    if (
      commentEnabled?.enabled &&
      comment.activityId !== commentEnabled.activityId
    ) {
      enabled = true
    }

    enableComment({
      activityId: comment.activityId,
      enabled: enabled,
    })
  }

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
    <ThemeContext.Consumer>
      {(ctx) => (
        <div>
          {data &&
            data.myActivities.map((activity, index) => (
              <div
                key={index}
                style={{ width: '100%', maxWidth: '800px' }}
                className="card mb-0 pb-0"
              >
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-2">
                      <div className="d-flex flex-column mr-10">
                        <div className="text-center">
                          <img
                            className="img-fluid rounded-circle w-auto h-auto w-sm-three-quarter w-md-half"
                            src={
                              activity.user.img
                                ? activity.user.img
                                : 'default-user-avatar.png'
                            }
                            alt="user avatar"
                          ></img>
                        </div>
                        <FontAwesomeIcon
                          className="m-auto pt-5"
                          size="2x"
                          icon={faBicycle}
                        />
                      </div>
                    </div>

                    <div className="col-10">
                      <p className="font-weight-bold m-0">
                        {activity?.user.name}
                      </p>
                      <p className="m-0">{activityTime(activity.startTime)}</p>
                      <h1 className="card-title font-weight-bolder font-size-20 mt-5 text-primary mb-5">
                        {activity?.title}
                      </h1>
                      {activity?.description !== '' && (
                        <p className="mb-10 font-size-12">
                          {activity.description}
                        </p>
                      )}
                      <MetricRow
                        duration={activity?.duration}
                        elevation={activity?.elevation}
                        distance={activity?.distance}
                      />
                    </div>
                  </div>
                </div>
                <div
                  className="align-center mt-10"
                  style={{
                    width: '100%',
                  }}
                >
                  <img
                    src={activityImg(
                      activity?.polyline,
                      ctx.darkMode,
                      strokeColor
                    )}
                    width="100%"
                    className="img-fluid rounded w-full h-full"
                    alt="activity route"
                  />
                </div>
                <div className="clearfix pt-5">
                  <div className="float-right d-inline-block">
                    {/* <button className="btn">
           <FontAwesomeIcon className="m-auto" icon={faThumbsUp} />
         </button> */}
                    <button
                      className="btn ml-5"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() =>
                        activity?.id &&
                        toggleComment({
                          activityId: activity.id,
                          enabled: !commentEnabled?.enabled,
                        })
                      }
                    >
                      <FontAwesomeIcon className="m-auto" icon={faComment} />
                    </button>
                  </div>
                </div>

                <ActivityComments
                  comments={activity.activityComment.map((comment: any) => ({
                    id: comment.id,
                    comment: comment.comment,
                    userName: comment.user.name,
                    userImg: comment.user.img,
                  }))}
                />

                <ActivityCommentBox
                  hidden={
                    !(
                      commentEnabled?.enabled &&
                      activity.id === commentEnabled.activityId
                    )
                  }
                  activityId={activity?.id}
                  toggleComment={toggleComment}
                />
              </div>
            ))}
        </div>
      )}
    </ThemeContext.Consumer>
  )
}

export default TimeLine

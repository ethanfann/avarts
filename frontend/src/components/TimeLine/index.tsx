import { faBicycle, faComment } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import DayJs from 'dayjs'
import React, { useState } from 'react'
import ClimbingBoxLoader from 'react-spinners/ClimbingBoxLoader'
import { ActivitiesByUserIdComponent } from '../../generated/graphql'
import { staticRideImg } from '../../utils/mapbox'
import ActivityCommentBox from './ActivityCommentBox'
import ActivityComments from './ActivityComments'
import MetricRow from './MetricRow'

// TODO: Don't parse JSON so much
// TODO: Break out into more components

type CommentEnabledType = {
  activityId: number
  enabled: boolean
}

type PropsType = {
  userId: string
}

const TimeLine: React.FC<PropsType> = (props: PropsType) => {
  const { userId } = props
  const [commentEnabled, enableComment] = useState<CommentEnabledType>()

  const activityTime = (startTime: number) => {
    const timeStr = DayJs.unix(startTime).format('MMMM D, YYYY--h:mm A')
    const timeStrSplit = timeStr.split('--')

    return DayJs(timeStrSplit[0]).isSame(DayJs(), 'day')
      ? `Today at ${timeStrSplit[1]}`
      : timeStrSplit[0] + ` at ${timeStrSplit[1]}`
  }

  // TODO: This is the thing that really needs to be tested first. We need to use just the right tolerance factor,
  // IE: most detail, without making the requst to mapbox fail.
  const activityImg = (polyline: string) => {
    return staticRideImg(polyline)
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

  return (
    <ActivitiesByUserIdComponent variables={{ userId: userId }}>
      {({ loading, error, data }) => {
        if (loading)
          return (
            <div className="d-flex justify-content-center mt-20">
              <ClimbingBoxLoader color="grey" />
            </div>
          )

        if (error) return <div>Error</div>

        if (data && data.activitiesByUserId?.length === 0)
          return (
            <div className="d-flex justify-content-center mt-20">
              <h4 className="text-primary text-align-center">No Activities</h4>
            </div>
          )

        return (
          <div>
            {data &&
              data.activitiesByUserId &&
              data.activitiesByUserId.length > 0 &&
              data.activitiesByUserId.map((activity: any, index: number) => (
                <div
                  key={index}
                  style={{ maxWidth: '800px' }}
                  className="card mb-0 pb-0"
                >
                  <div className="container-fluid">
                    <div className="row">
                      <div className="col-2">
                        <div className="d-flex flex-column mr-10">
                          <div className="text-center">
                            <img
                              className="img-fluid rounded-circle w-auto h-auto w-half"
                              src={
                                activity.user.img
                                  ? activity.user.img
                                  : 'default-user-avatar.png'
                              }
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
                        <p className="m-0">
                          {activityTime(activity?.startTime)}
                        </p>
                        <h1 className="card-title font-weight-bolder font-size-20 mt-5 text-primary mb-5">
                          {activity?.title}
                        </h1>
                        {activity?.description !== '' && (
                          <p className="mb-10 font-size-12">
                            {activity?.description}
                          </p>
                        )}
                        <MetricRow
                          geoJson={activity?.geoJson}
                          duration={activity?.duration}
                          elevation={activity?.elevation}
                          distance={activity?.distance}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="align-center mt-10">
                    <img
                      src={activityImg(activity?.polyline)}
                      className="img-fluid rounded w-full h-full"
                      alt="responsive image"
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
                            activityId: activity?.id,
                            enabled: !commentEnabled?.enabled,
                          })
                        }
                      >
                        <FontAwesomeIcon className="m-auto" icon={faComment} />
                      </button>
                    </div>
                  </div>

                  <ActivityComments
                    comments={activity.comments.map((comment: any) => ({
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
        )
      }}
    </ActivitiesByUserIdComponent>
  )
}

export default TimeLine

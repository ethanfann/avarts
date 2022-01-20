import React from 'react'
import DayJs from 'dayjs'
import { faBicycle, faComment } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ActivityComments from './ActivityComments'
import MetricRow from './MetricRow'
import { staticRideImg } from '../../utils/mapbox'
import { CommentEnabledType } from '../../types/types'
import { Link } from 'react-router-dom'

type ActivityProps = {
  id: string
  img: string
  name: string
  startTime: number
  title: string
  description: string
  polyline: string
  duration: number
  elevation: number
  distance: number
  darkMode: boolean
  strokeColor: string
  comments: any
  commentEnabled: CommentEnabledType | undefined
  enableComment: any
  mapImgDark: string
  mapImgLight: string
}

const Activity = (props: ActivityProps) => {
  const {
    id,
    img,
    name,
    startTime,
    title,
    description,
    polyline,
    duration,
    elevation,
    distance,
    darkMode,
    strokeColor,
    comments,
    commentEnabled,
    enableComment,
    mapImgLight,
    mapImgDark,
  } = props

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
    strokeColor: string,
    mapImgLight: string,
    mapImgDark: string
  ) => {
    if (mapImgDark !== '' && mapImgLight !== '') {
      return darkMode ? mapImgDark : mapImgLight
    }

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

  return (
    <div>
      <div style={{ maxWidth: '800px' }} className="card mb-0 pb-0">
        <div className="container-fluid">
          <div className="row">
            <div className="col-2">
              <div className="d-flex flex-column mr-10">
                <div className="text-center">
                  <img
                    className="img-fluid rounded-circle w-auto h-auto w-sm-three-quarter w-md-half"
                    src={img ? img : 'default-user-avatar.png'}
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
              <p className="font-weight-bold m-0">{name}</p>
              <p className="m-0">{activityTime(startTime)}</p>
              <Link to={`/activity/${id}`}>
                <h1 className="card-title font-weight-bolder font-size-20 mt-5 text-primary mb-5">
                  {title}
                </h1>
              </Link>
              {description !== '' && (
                <p className="mb-10 font-size-12">{description}</p>
              )}
              <MetricRow
                duration={duration}
                elevation={elevation}
                distance={distance}
              />
            </div>
          </div>
        </div>
        <div className="align-center mt-10">
          <img
            src={activityImg(
              polyline,
              darkMode,
              strokeColor,
              mapImgLight,
              mapImgDark
            )}
            className="img-fluid rounded w-full h-full"
            alt="activity route"
          />
        </div>
        <div className="clearfix pt-5">
          <div className="float-right d-inline-block">
            <button
              className="btn ml-5"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() =>
                id &&
                toggleComment({
                  activityId: id,
                  enabled: !commentEnabled?.enabled,
                })
              }
            >
              <FontAwesomeIcon className="m-auto" icon={faComment} />
            </button>
          </div>
        </div>

        <ActivityComments
          comments={comments.map((comment: any) => ({
            id: comment.id,
            comment: comment.comment,
            userName: comment.user.name,
            userImg: comment.user.img,
          }))}
          commentEnabled={commentEnabled}
          activityId={id}
          enableComment={enableComment}
          toggleComment={toggleComment}
        />
      </div>
    </div>
  )
}

export default Activity

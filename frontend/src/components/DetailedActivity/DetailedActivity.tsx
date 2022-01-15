import React from 'react'
import { useParams } from 'react-router-dom'
import { useActivityByIdQuery } from '../../generated/graphql'
import { MapBoxView } from './MapBoxView'
import MetricRow from '../TimeLine/MetricRow'
import DayJs from 'dayjs'

type DetailedActivityParams = {
  id: string
}

const DetailedActivity = () => {
  const { id } = useParams<DetailedActivityParams>()

  const { loading, error, data } = useActivityByIdQuery({
    variables: { id: id },
  })

  const activityTime = (startTime: number) => {
    const timeStr = DayJs.unix(startTime).format('MMMM D, YYYY--h:mm A')
    const timeStrSplit = timeStr.split('--')

    return DayJs(timeStrSplit[0]).isSame(DayJs(), 'day')
      ? `Today at ${timeStrSplit[1]}`
      : timeStrSplit[0] + ` at ${timeStrSplit[1]}`
  }

  return (
    <>
      {data && data.activityById && (
        <div className="w-full w-lg-three-quarter">
          <div className="card p-0 border-0">
            <div className="px-card py-10 border-bottom">
              <p
                style={{ fontSize: 34 }}
                className="m-0 pl-10 font-weight-bold"
              >
                {data.activityById.user.name} - Ride
              </p>
            </div>
            <div className="content">
              <div className="container-fluid">
                <div className="row mb-5">
                  <div className="col-2">
                    <div className="d-flex flex-column">
                      <img
                        className="img-fluid rounded-circle mr-10"
                        src={
                          data.activityById.user.img
                            ? data.activityById.user.img
                            : 'default-user-avatar.png'
                        }
                        alt="user avatar"
                      />
                    </div>
                  </div>
                  <div className="col-10">
                    {activityTime(data.activityById.startTime)}
                    <p className="font-weight-bold m-0 font-size-24">
                      {data.activityById.title}
                    </p>
                    {data.activityById.description !== '' && (
                      <p className="mb-10 font-size-12">
                        {data.activityById.description}
                      </p>
                    )}
                    <MetricRow
                      duration={data.activityById.duration}
                      elevation={data.activityById.elevation}
                      distance={data.activityById.distance}
                    />
                  </div>
                </div>
              </div>

              {data && data.activityById && (
                <MapBoxView initPolyline={data.activityById.polyline} />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default DetailedActivity

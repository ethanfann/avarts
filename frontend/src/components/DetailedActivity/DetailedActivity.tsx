import React from 'react'
import { useParams } from 'react-router-dom'
import { useActivityByIdQuery } from '../../generated/graphql'
import { MapBoxView } from './MapBoxView'
import MetricRow from '../TimeLine/MetricRow'
import DayJs from 'dayjs'
import styled from 'styled-components'

type DetailedActivityParams = {
  id: string
}

const DetailedActivity = () => {
  const { id } = useParams<DetailedActivityParams>()

  const { loading, error, data } = useActivityByIdQuery({
    variables: { id: id ? id : '' },
  })

  const activityTime = (startTime: number) => {
    const timeStr = DayJs.unix(startTime).format('MMMM D, YYYY--h:mm A')
    const timeStrSplit = timeStr.split('--')

    return DayJs(timeStrSplit[0]).isSame(DayJs(), 'day')
      ? `Today at ${timeStrSplit[1]}`
      : timeStrSplit[0] + ` at ${timeStrSplit[1]}`
  }

  return (
    <StyledContainer>
      {data && data.activityById && (
        <div className="w-full w-lg">
          <div className="card border-0">
            <div className="px-card border-bottom">
              <p style={{ fontSize: 34 }} className="m-0 font-weight-bold">
                {data.activityById.user.name} - Ride
              </p>
            </div>
            <div className="content">
              <div className="container-fluid">
                <div className="row mb-20">
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
              <div style={{ height: '400px', width: '100%' }}>
                {data && data.activityById && (
                  <MapBoxView initPolyline={data.activityById.polyline} />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </StyledContainer>
  )
}

const StyledContainer = styled.div`
  width: 100%;
  max-width: 1200px;
`

export default DetailedActivity

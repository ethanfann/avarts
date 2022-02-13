import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { useActivityByIdQuery } from '../../generated/graphql'
import { MapBoxView } from './MapBoxView'
import MetricRow from '../TimeLine/MetricRow'
import DayJs from 'dayjs'
import { formatSpeed } from '../../utils/conversions'
import UserContext from '../../userContext'
import ClimbingBoxLoader from 'react-spinners/ClimbingBoxLoader'

type DetailedActivityParams = {
  id: string
}

const DetailedActivity = () => {
  const { id } = useParams<DetailedActivityParams>()
  const [width, setWidth] = useState<number>(window.innerWidth)
  const { user } = useContext(UserContext)

  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth)
  }

  const isMobile = width <= 650

  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange)
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange)
    }
  }, [])

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

  if (loading) {
    return (
      <div className="d-flex justify-content-center mt-20">
        <ClimbingBoxLoader color="grey" />
      </div>
    )
  }

  if (error) return <div>Error</div>

  if (isMobile) {
    return (
      <div>
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
                      <div className="d-flex flex-column mr-10">
                        <div className="text-center">
                          <img
                            className="img-fluid rounded-circle"
                            src={
                              data.activityById.user.img
                                ? data.activityById.user.img
                                : 'default-user-avatar.png'
                            }
                            width={100}
                            height={100}
                            alt="user avatar"
                          ></img>
                        </div>
                      </div>
                    </div>
                    <div className="col-10">
                      <div className="m-5">
                        {activityTime(data.activityById.startTime)}
                        <p className="font-weight-bold m-0 font-size-24">
                          {data.activityById.title}
                        </p>
                        {data.activityById.description !== '' && (
                          <p className="mb-10 font-size-12">
                            {data.activityById.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="row mb-20">
                    <div className="col-12">
                      <div className="d-flex justify-content-center">
                        <MetricRow
                          duration={data.activityById.duration}
                          elevation={data.activityById.elevation}
                          distance={data.activityById.distance}
                        />
                      </div>
                      <div className="table-responsive">
                        <table className="table mt-20">
                          <thead>
                            <tr>
                              <th></th>
                              <th>Avg</th>
                              <th>Max</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>
                                Speed (
                                {user.measurementPreference === 'feet'
                                  ? 'mph'
                                  : 'kph'}
                                )
                              </td>
                              <td>
                                {formatSpeed(
                                  data.activityById.avgSpeed,
                                  user.measurementPreference
                                )}
                              </td>
                              <td>
                                {formatSpeed(
                                  data.activityById.maxSpeed,
                                  user.measurementPreference
                                )}
                              </td>
                            </tr>
                            <tr>
                              <td>Power (w)</td>
                              <td>{data.activityById.avgPower}</td>
                              <td>{data.activityById.maxPower}</td>
                            </tr>
                            <tr>
                              <td>Heart Rate</td>
                              <td>{data.activityById.avgHr}</td>
                              <td>{data.activityById.maxHr}</td>
                            </tr>
                            <tr>
                              <td>Cadence</td>
                              <td>{data.activityById.avgCadence}</td>
                              <td>{data.activityById.maxCadence}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                <div style={{ height: '400px', width: '100%' }}>
                  {data && data.activityById && (
                    <MapBoxView
                      initPolyline={data.activityById.polyline}
                      mapboxToken={user.mapboxToken}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  } else {
    return (
      <div>
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
                      <div className="d-flex flex-column mr-10">
                        <div className="text-center">
                          <img
                            className="img-fluid rounded-circle"
                            src={
                              data.activityById.user.img
                                ? data.activityById.user.img
                                : 'default-user-avatar.png'
                            }
                            width={100}
                            height={100}
                            alt="user avatar"
                          ></img>
                        </div>
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="m-5">
                        {activityTime(data.activityById.startTime)}
                        <p className="font-weight-bold m-0 font-size-24">
                          {data.activityById.title}
                        </p>
                        {data.activityById.description !== '' && (
                          <p className="mb-10 font-size-12">
                            {data.activityById.description}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="d-flex justify-content-center">
                        <MetricRow
                          duration={data.activityById.duration}
                          elevation={data.activityById.elevation}
                          distance={data.activityById.distance}
                        />
                      </div>
                      <div className="table-responsive">
                        <table className="table mt-20">
                          <thead>
                            <tr>
                              <th></th>
                              <th>Avg</th>
                              <th>Max</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>
                                Speed (
                                {user.measurementPreference === 'feet'
                                  ? 'mph'
                                  : 'kph'}
                                )
                              </td>
                              <td>
                                {formatSpeed(
                                  data.activityById.avgSpeed,
                                  user.measurementPreference
                                )}
                              </td>
                              <td>
                                {formatSpeed(
                                  data.activityById.maxSpeed,
                                  user.measurementPreference
                                )}
                              </td>
                            </tr>
                            <tr>
                              <td>Power (w)</td>
                              <td>{data.activityById.avgPower}</td>
                              <td>{data.activityById.maxPower}</td>
                            </tr>
                            <tr>
                              <td>Heart Rate</td>
                              <td>{data.activityById.avgHr}</td>
                              <td>{data.activityById.maxHr}</td>
                            </tr>
                            <tr>
                              <td>Cadence</td>
                              <td>{data.activityById.avgCadence}</td>
                              <td>{data.activityById.maxCadence}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                <div style={{ height: '400px', width: '100%' }}>
                  {data && data.activityById && (
                    <MapBoxView
                      initPolyline={data.activityById.polyline}
                      mapboxToken={user.mapboxToken}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default DetailedActivity

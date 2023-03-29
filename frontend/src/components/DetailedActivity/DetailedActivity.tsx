import React, { useState, useEffect, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  useActivityByIdQuery,
  useDeleteActivityMutation,
} from '../../generated/graphql'
import { MapBoxView } from './MapBoxView'
import MetricRow from '../TimeLine/MetricRow'
import DayJs from 'dayjs'
import UserContext from '../../userContext'
import ClimbingBoxLoader from 'react-spinners/ClimbingBoxLoader'
import { faEllipsisV, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import MetricsTable from './MetricsTable'

type DetailedActivityParams = {
  id: string
}

const DetailedActivity = () => {
  const { id } = useParams<DetailedActivityParams>()
  const [width, setWidth] = useState<number>(window.innerWidth)
  const { user } = useContext(UserContext)
  const [deleteActivity] = useDeleteActivityMutation()
  const navigate = useNavigate()

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

  const handleDelete = async (e: React.FormEvent, id: string) => {
    e.preventDefault()
    try {
      const result = await deleteActivity({
        variables: {
          activityId: id,
        },
        refetchQueries: ['me', 'myActivities'],
      })
      if (result && result.data && result.data.deleteActivity) {
        navigate('/', { replace: true })
      }
    } catch (error) {
      console.log(error)
    }
  }

  if (loading) {
    return (
      <div className="d-flex justify-content-center mt-20">
        <ClimbingBoxLoader color="grey" />
      </div>
    )
  }

  if (error) return <div>Error</div>

  return (
    <div>
      {data && data.activityById && (
        <div className="w-full mt-10">
          <div className="card border-0 mt-0">
            <div className="px-card border-bottom d-flex align-items-center">
              <p
                style={{ fontSize: 28 }}
                className="m-0 font-weight-bold w-full"
              >
                {data.activityById.user.name} - Ride
              </p>
              <div className="flex-shrink-1">
                <div className="dropdown dropleft with-arrow">
                  <button
                    className="btn"
                    data-toggle="dropdown"
                    type="button"
                    aria-label="view more activity options"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <FontAwesomeIcon icon={faEllipsisV} />
                  </button>
                  <div className="dropdown-menu dropdown-menu-center">
                    <div className="dropdown-content">
                      <button
                        className="btn btn-block"
                        onClick={(e) => handleDelete(e, data.activityById.id)}
                        aria-label={'delete activity'}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
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
                            data.activityById.user.img !== ''
                              ? data.activityById.user.img
                              : '/default-user-avatar.png'
                          }
                          width={100}
                          height={100}
                          alt="user avatar"
                        ></img>
                      </div>
                    </div>
                  </div>
                  <div className={`col-${isMobile ? 10 : 4}`}>
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
                  {!isMobile && (
                    <div className="col-6">
                      <MetricRow
                        duration={data.activityById.duration}
                        elevation={data.activityById.elevation}
                        distance={data.activityById.distance}
                      />
                      <MetricsTable
                        avgSpeed={data.activityById.avgSpeed}
                        maxSpeed={data.activityById.maxSpeed}
                        avgPower={data.activityById.avgPower}
                        maxPower={data.activityById.maxPower}
                        avgHr={data.activityById.avgHr}
                        maxHr={data.activityById.maxHr}
                        avgCadence={data.activityById.avgCadence}
                        maxCadence={data.activityById.maxCadence}
                        measurementPreference={user.measurementPreference}
                      />
                    </div>
                  )}
                </div>
                {isMobile && (
                  <div className="row mb-20">
                    <div className="col-12">
                      <MetricRow
                        duration={data.activityById.duration}
                        elevation={data.activityById.elevation}
                        distance={data.activityById.distance}
                      />
                      <MetricsTable
                        avgSpeed={data.activityById.avgSpeed}
                        maxSpeed={data.activityById.maxSpeed}
                        avgPower={data.activityById.avgPower}
                        maxPower={data.activityById.maxPower}
                        avgHr={data.activityById.avgHr}
                        maxHr={data.activityById.maxHr}
                        avgCadence={data.activityById.avgCadence}
                        maxCadence={data.activityById.maxCadence}
                        measurementPreference={user.measurementPreference}
                      />
                    </div>
                  </div>
                )}
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

export default DetailedActivity

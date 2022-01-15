import React from 'react'
import { useParams } from 'react-router-dom'
import { useActivityByIdQuery } from '../../generated/graphql'
import { MapBoxView } from './MapBoxView'

type DetailedActivityParams = {
  id: string
}

const DetailedActivity = () => {
  const { id } = useParams<DetailedActivityParams>()

  const { loading, error, data } = useActivityByIdQuery({
    variables: { id: id },
  })

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
                {data.activityById.title}
              </p>
            </div>
            <div className="content">
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

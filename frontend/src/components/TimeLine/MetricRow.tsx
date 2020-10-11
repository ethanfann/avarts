import DayJs from 'dayjs'
import React from 'react'
import styled from 'styled-components'
import Metric from './Metric'

const {
  getElevationGain,
} = require('geojson-elevation-gain/build/geojson-elevation')

const geojsonLength = require('geojson-length')

type Props = {
  geoJson: string
  distance: number
  elevation: number
  duration: number
}

const MetricRow = (props: Props) => {
  const { geoJson, distance, elevation, duration } = props

  // const rideLength = (distance: number) => {
  //   var area = geojsonLength(json['features'].geometry)
  //   return area
  // }

  // elevation = meters
  const elevGain = (elevation: number) => {
    return Math.round(elevation * 3.28084)
  }

  // duration is in seconds
  const elapsedTime = (duration: number) => {
    const seconds = duration
    const time = new Date(seconds * 1000).toISOString().substr(11, 8)
    const split = time.split(':')
    return (
      <>
        {parseInt(split[0])}
        <abbr>h</abbr> {parseInt(split[1])}
        <abbr>m</abbr>
      </>
    )
  }

  return (
    <>
      <div className="d-flex w-full">
        <div>
          <Metric
            header="Distance"
            value={
              <>
                {(distance * 0.000621371).toFixed(2)}
                <abbr>mi</abbr>
              </>
            }
          />
        </div>
        <Divider />
        <div className="">
          <Metric
            header="Elev Gain"
            value={
              <>
                {elevGain(elevation).toString()}
                <abbr>ft</abbr>
              </>
            }
          />
        </div>
        <Divider />
        <div className="">
          <Metric header="Time" value={elapsedTime(duration)} />
        </div>
      </div>
    </>
  )
}

const Divider = styled.div`
  margin: auto;
  width: 1px;
  background: grey;
  height: 24px;
  opacity: 30%;
  align-self: center;
`

export default MetricRow

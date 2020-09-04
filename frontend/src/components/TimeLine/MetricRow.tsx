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
}

const MetricRow = (props: Props) => {
  const { geoJson } = props

  const rideLength = (geoJsonStr: string) => {
    const json = JSON.parse(geoJsonStr)
    var area = geojsonLength(json['features'][0].geometry)
    return area
  }

  const elevGain = (geoJsonStr: string) => {
    const json = JSON.parse(geoJsonStr)
    return Math.round(
      getElevationGain(json['features'][0].geometry, 40) * 3.28084
    )
  }

  const elapsedTime = (geoJsonStr: string) => {
    const json = JSON.parse(geoJsonStr)
    const coordTimes = json['features'][0].properties.coordTimes
    const firstCoordTime = DayJs(coordTimes[0])
    const lastCoordTime = DayJs(coordTimes[coordTimes.length - 1])
    const seconds = lastCoordTime.diff(firstCoordTime, 'second')
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
                {(rideLength(geoJson) * 0.000621371).toFixed(2)}
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
                {elevGain(geoJson).toString()}
                <abbr>ft</abbr>
              </>
            }
          />
        </div>
        <Divider />
        <div className="">
          <Metric header="Time" value={elapsedTime(geoJson)} />
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

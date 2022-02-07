import React, { useContext } from 'react'
import styled from 'styled-components'
import UserContext from '../../userContext'
import Metric from './Metric'

type Props = {
  distance: number
  elevation: number
  duration: number
}

const MetricRow = (props: Props) => {
  const { distance, elevation, duration } = props
  const { user } = useContext(UserContext)

  const elevGain = (elevation: number) => {
    return user.measurementPreference === 'feet'
      ? Math.round(elevation * 3.28084)
      : elevation
  }

  const formatDistance = (distance: number) => {
    return user.measurementPreference === 'feet'
      ? (distance * 0.000621371).toFixed(2)
      : (distance / 1000).toFixed(2)
  }

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
    <div style={{ minWidth: 190 }} className="d-flex w-full">
      <Metric
        header="Distance"
        value={
          <>
            {formatDistance(distance)}
            <abbr>{user.measurementPreference === 'feet' ? 'mi' : 'km'}</abbr>
          </>
        }
      />
      <Divider />
      <Metric
        header="Elev Gain"
        value={
          <>
            {elevGain(elevation).toString()}
            <abbr>{user.measurementPreference === 'feet' ? 'ft' : 'm'}</abbr>
          </>
        }
      />
      <Divider />
      <Metric header="Time" value={elapsedTime(duration)} />
    </div>
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

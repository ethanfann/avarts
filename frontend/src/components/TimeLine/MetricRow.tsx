import React from 'react'
import styled from 'styled-components'
import Metric from './Metric'

type Props = {
  distance: number
  elevation: number
  duration: number
}

const MetricRow = (props: Props) => {
  const { distance, elevation, duration } = props

  const elevGain = (elevation: number) => {
    return Math.round(elevation * 3.28084)
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
            {(distance * 0.000621371).toFixed(2)}
            <abbr>mi</abbr>
          </>
        }
      />
      <Divider />
      <Metric
        header="Elev Gain"
        value={
          <>
            {elevGain(elevation).toString()}
            <abbr>ft</abbr>
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

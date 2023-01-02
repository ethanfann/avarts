import React from 'react'
import { formatSpeed } from '../../utils/conversions'

type MetricsTableProps = {
  avgSpeed: number
  maxSpeed: number
  avgPower: number
  maxPower: number
  avgHr: number
  maxHr: number
  avgCadence: number
  maxCadence: number
  measurementPreference: string
}

const MetricsTable = (props: MetricsTableProps) => {
  return (
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
              Speed ({props.measurementPreference === 'feet' ? 'mph' : 'kph'})
            </td>
            <td>{formatSpeed(props.avgSpeed, props.measurementPreference)}</td>
            <td>{formatSpeed(props.maxSpeed, props.measurementPreference)}</td>
          </tr>
          <tr>
            <td>Power (w)</td>
            <td>{props.avgPower}</td>
            <td>{props.maxPower}</td>
          </tr>
          <tr>
            <td>Heart Rate</td>
            <td>{props.avgHr}</td>
            <td>{props.maxHr}</td>
          </tr>
          <tr>
            <td>Cadence</td>
            <td>{props.avgCadence}</td>
            <td>{props.maxCadence}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default MetricsTable

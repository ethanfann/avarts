import React from 'react'
import { useMonthlyActivityQuery } from '../../generated/graphql'
import CalendarHeatMap from 'react-calendar-heatmap'
import dayjs, { Dayjs } from 'dayjs'

import './styles.css'

const MonthHeatMap = () => {
  const { loading, error, data } = useMonthlyActivityQuery()

  const today = dayjs()
  const thirtyDaysAgo = dayjs().subtract(30, 'day')

  const formatDate = (date: Dayjs) => {
    return `${date.year()}-${date.month() + 1}-${date.date()}`
  }

  if (loading) {
    return <div>Loading</div>
  }

  if (error) {
    return <div>Error</div>
  }

  return (
    <div className="w-full">
      <div className="card p-0">
        <h2 className="px-card py-10 card-title border-bottom">Last 30 Days</h2>
        <div className="content">
          {data && data.monthlyActivity && (
            <CalendarHeatMap
              startDate={formatDate(thirtyDaysAgo)}
              endDate={formatDate(today)}
              values={data.monthlyActivity.map((activity) => ({
                date: formatDate(dayjs(activity.startTime)),
                count: 1,
              }))}
              gutterSize={2}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default MonthHeatMap

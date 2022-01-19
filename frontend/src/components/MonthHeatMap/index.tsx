import React from 'react'
import { useMonthlyActivityQuery } from '../../generated/graphql'
import HeatMap from '@uiw/react-heat-map'
import Tooltip from '@uiw/react-tooltip'
import dayjs, { Dayjs } from 'dayjs'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

const MonthHeatMap = () => {
  const { loading, error, data } = useMonthlyActivityQuery()
  const nav = useNavigate()

  const thirtyDaysAgo = dayjs().subtract(30, 'day').toDate()
  const today = new Date()

  const formatDate = (date: Dayjs) => {
    return `${date.year()}/${date.month() + 1}/${date.date()}`
  }

  const handleClick = (id: any) => {
    nav(`activity/${id}`)
  }

  if (loading) {
    return <div>Loading</div>
  }

  if (error) {
    return <div>Error</div>
  }

  return (
    <>
      {data && data.monthlyActivity && (
        <div className="w-full">
          <div className="card p-0">
            <h2 className="px-card py-10 card-title border-bottom">
              Last 30 Days
            </h2>
            <div
              style={{ height: '250px', width: '100%', padding: 0, margin: 0 }}
              className="content"
            >
              <HeatMap
                value={data.monthlyActivity.map((activity) => ({
                  date: formatDate(dayjs(activity.startTime * 1000)),
                  count: 1,
                  content: activity.id,
                }))}
                style={{ height: '100%', width: '100%' }}
                startDate={thirtyDaysAgo}
                endDate={today}
                rectSize={25}
                legendCellSize={0}
                space={2}
                rectRender={(props, rectData) => {
                  if (!rectData.content) return <rect {...props} />
                  return (
                    <Tooltip
                      key={props.key}
                      placement="top"
                      content={
                        data.monthlyActivity.find(
                          (activity) => activity.id === rectData.content
                        )?.title
                      }
                    >
                      <rect
                        {...props}
                        onClick={() => {
                          handleClick(rectData.content)
                        }}
                      />
                    </Tooltip>
                  )
                }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default MonthHeatMap

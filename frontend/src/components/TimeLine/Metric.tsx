import React from 'react'

type Props = {
  header: string
  value: React.ReactNode
}

const Metric = (props: Props) => {
  const { header, value } = props

  return (
    <div>
      <div className="text-muted font-size-12">{header}</div>
      <div className="font-weight-medium font-size-16">{value}</div>
    </div>
  )
}

export default Metric

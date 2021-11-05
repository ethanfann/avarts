const urlencode = require('urlencode')
require('dotenv').config()

const strokeWidth = 3
const mapboxToken = process.env.REACT_APP_MAPBOX_TOKEN

function makePath(polyline: string, strokeColor: string) {
  return `path-${strokeWidth}+${strokeColor.replace('#', '')}(${polyline})`
}

export function staticRideImg(
  polyline: string,
  darkMode: boolean,
  strokeColor: string
) {
  const mapType: string = darkMode === true ? 'dark-v10' : 'outdoors-v11'

  return `https://api.mapbox.com/styles/v1/mapbox/${mapType}/static/${urlencode(
    makePath(polyline, strokeColor)
  )}/auto/750x300?access_token=${mapboxToken}`
}

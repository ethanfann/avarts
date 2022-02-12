const urlencode = require('urlencode')

const strokeWidth = 3

function makePath(polyline: string, strokeColor: string) {
  return `path-${strokeWidth}+${strokeColor.replace('#', '')}(${polyline})`
}

export function staticRideImg(
  polyline: string,
  darkMode: boolean,
  strokeColor: string,
  mapboxToken: string
) {
  const mapType: string = darkMode === true ? 'dark-v10' : 'outdoors-v11'

  return `https://api.mapbox.com/styles/v1/mapbox/${mapType}/static/${urlencode(
    makePath(polyline, strokeColor)
  )}/auto/750x300@2x?access_token=${mapboxToken}`
}

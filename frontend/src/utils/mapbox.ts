const polyline = require('@mapbox/polyline')
const urlencode = require('urlencode')
const { createSpectrum, rgbToHexString, hexStringToRGB } = require('./color')
require('dotenv').config()

type Coord = {
  x: number
  y: number
}

const startColor = '#2193b0'
const endColor = '#6dd5ed'
const strokeWidth = 3
const mapboxToken = process.env.REACT_APP_MAPBOX_TOKEN

const colorA = hexStringToRGB(startColor)
const colorB = hexStringToRGB(endColor)

function makePathWithGradient(polyline: string) {
  return `path-${strokeWidth}(${polyline})`
}

// function pathWithGradient(coords: Array<Coord>) {
//   const firstCoord: Coord = coords[0]
//   const lastCoord = coords[coords.length - 1]
//   const startMarker = `pin-s-a+${rgbToHexString(colorA)}(${firstCoord.y},${
//     firstCoord.x
//   })`
//   const endMarker = `pin-s-b+${rgbToHexString(colorB)}(${lastCoord.y},${
//     lastCoord.x
//   })`
//   return makePathWithGradient(coords) + ',' + startMarker + ',' + endMarker
// }

export function staticRideImg(polyline: string) {
  return `https://api.mapbox.com/styles/v1/mapbox/outdoors-v11/static/${urlencode(
    makePathWithGradient(polyline)
  )}/auto/750x300?access_token=${mapboxToken}`
}

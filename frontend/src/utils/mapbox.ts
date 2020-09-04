const polyline = require('@mapbox/polyline')
const urlencode = require('urlencode')
const { createSpectrum, rgbToHexString, hexStringToRGB } = require('./color')
require('dotenv').config()

type Coord = {
  x: number
  y: number
}

const startColor = '#FF512F'
const endColor = '#F09819'
const strokeWidth = 4
const mapboxToken = process.env.REACT_APP_MAPBOX_TOKEN

const colorA = hexStringToRGB(startColor)
const colorB = hexStringToRGB(endColor)

function makePathWithGradient(coords: Array<Coord>) {
  const pathStrings = []
  const spectrumColors = createSpectrum(colorA, colorB, coords.length - 1)

  for (let i = 0; i < coords.length - 1; i++) {
    const path = polyline.encode([
      [coords[i].x, coords[i].y],
      [coords[i + 1].x, coords[i + 1].y],
    ])
    pathStrings.push(`path-${strokeWidth}+${spectrumColors[i]}(${path})`) // format from https://docs.mapbox.com/api/maps/#path
  }

  return pathStrings.join(',')
}

function pathWithGradient(coords: Array<Coord>) {
  const firstCoord: Coord = coords[0]
  const lastCoord = coords[coords.length - 1]
  const startMarker = `pin-s-a+${rgbToHexString(colorA)}(${firstCoord.y},${
    firstCoord.x
  })`
  const endMarker = `pin-s-b+${rgbToHexString(colorB)}(${lastCoord.y},${
    lastCoord.x
  })`
  return makePathWithGradient(coords) + ',' + startMarker + ',' + endMarker
}

export function staticRideImg(coords: Array<Array<number>>) {
  const newCoords: Array<Coord> = coords.map((coord: any) => ({
    x: coord[1],
    y: coord[0],
  }))

  return `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/${urlencode(
    pathWithGradient(newCoords)
  )}/auto/550x220?access_token=${mapboxToken}`
}

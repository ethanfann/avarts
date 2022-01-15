import React, { useState, useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl'
const polyline = require('@mapbox/polyline')
require('dotenv').config()

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN
  ? process.env.REACT_APP_MAPBOX_TOKEN
  : ''

type MapBoxViewProps = {
  initPolyline: string
}

export const MapBoxView = (props: MapBoxViewProps) => {
  const { initPolyline } = props

  const coords = polyline
    .decode(initPolyline)
    .map((coord: number[]) => [coord[1], coord[0]])

  const mapContainer = useRef<any>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const [lng, setLng] = useState(coords[0][0])
  const [lat, setLat] = useState(coords[0][1])
  const [zoom, setZoom] = useState(9)

  useEffect(() => {
    if (map.current) return // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom,
      attributionControl: false,
    })

    const bounds = new mapboxgl.LngLatBounds(coords[0], coords[0])

    for (const coord of coords) {
      bounds.extend(coord)
    }

    map.current.on('load', () => {
      if (map.current) {
        map.current.addSource('route', {
          type: 'geojson',
          data: {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: coords,
            },
          },
        })
        map.current.addLayer({
          id: 'route',
          type: 'line',
          source: 'route',
          layout: {
            'line-join': 'round',
            'line-cap': 'round',
          },
          paint: {
            'line-color': '#FF7F50',
            'line-width': 4,
          },
        })
        map.current.fitBounds(bounds, {
          padding: 20,
        })
      }
    })
  })

  return (
    <div>
      <div style={{ height: 400, width: '100%' }} ref={mapContainer} />
    </div>
  )
}

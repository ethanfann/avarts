import React, { useContext } from 'react'
import { Map as MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet'
import ThemeContext from '../../themeContext'
import L from 'leaflet'
import * as greenIconUrl from '../../images/marker-icon-2x-green.png'
import * as redIconUrl from '../../images/marker-icon-2x-red.png'
import * as shadowIconUrl from '../../images/marker-shadow.png'
import 'leaflet/dist/leaflet.css'

const polyline = require('@mapbox/polyline')

type MapBoxViewProps = {
  initPolyline: string
  mapboxToken: string
}

export const MapBoxView = (props: MapBoxViewProps) => {
  const { initPolyline, mapboxToken } = props
  const { darkMode } = useContext(ThemeContext)

  const coords = polyline.decode(initPolyline)
  const start: L.LatLngExpression = [coords[0][0], coords[0][1]]
  const end: L.LatLngExpression = [
    coords[coords.length - 1][0],
    coords[coords.length - 1][1],
  ]
  const bounds = new L.LatLngBounds(coords)

  const greenIcon = new L.Icon({
    iconUrl: greenIconUrl.default,
    shadowUrl: shadowIconUrl.default,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    shadowSize: [41, 41],
  })

  const redIcon = new L.Icon({
    iconUrl: redIconUrl.default,
    shadowUrl: shadowIconUrl.default,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    shadowSize: [41, 41],
  })

  return (
    <div style={{ height: '100%', width: '100%', marginBottom: 10 }}>
      <MapContainer
        bounds={bounds}
        scrollWheelZoom={false}
        style={{ height: '500px', width: '100%', zIndex: 1 }}
        zoom={13}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.mapbox.com/about/maps/">Mapbox</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url={`https://api.mapbox.com/styles/v1/mapbox/${
            darkMode ? 'dark-v10' : 'outdoors-v11'
          }/tiles/{z}/{x}/{y}?access_token=${mapboxToken}`}
        />
        <Marker position={start} icon={greenIcon} />
        <Marker position={end} icon={redIcon} />
        <Polyline positions={coords} color="red" />
      </MapContainer>
    </div>
  )
}

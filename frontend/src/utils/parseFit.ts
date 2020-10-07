import { faRecordVinyl } from '@fortawesome/free-solid-svg-icons'

const FitParser = require('fit-file-parser').default

const fitToGeoJson = (data: any): JSON => {
  let geo: any = {}
  if (data && data.records) {
    let firstValidIndex

    const coordTimes = data.records.map((record: any) => record.timestamp)
    const coordProps = data.records

    const coords = data.records
      .map((record: any) => [
        record.position_long,
        record.position_lat,
        record.altitude,
      ])
      .filter((coord: any) => coord[0] && coord[1] && coord[2])

    geo.type = 'FeatureCollection'
    geo.features = {
      type: 'Feature',
      properties: {
        name: 'Cool Ride',
        type: 1,
        time: '',
        coordTimes: coordTimes,
        coordProps: coordProps,
      },
      geometry: {
        type: 'LineString',
        coordinates: coords,
      },
    }
  }
  return geo
}

export const parseFit = (file: ArrayBuffer) => {
  const fitParser = new FitParser({
    force: false,
    mode: 'list',
  })

  let geoJson: any
  fitParser.parse(file, (error: any, data: any) => {
    // Handle result of parse method
    if (error) {
      console.log(error)
    } else {
      geoJson = fitToGeoJson(data)
    }
  })

  return geoJson
}

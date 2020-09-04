import { faUpload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect } from 'react'
import { useUploadActivityMutation } from '../generated/graphql'

const toGeoJson = require('@tmcw/togeojson')
const DOMParser = require('xmldom').DOMParser
const halfmoon = require('halfmoon')

interface Props {
  userId: string
}

const Upload = (props: Props) => {
  let fileReader: FileReader
  const [uploadActivityMutation] = useUploadActivityMutation()

  const handleFileRead = async () => {
    const content = fileReader.result

    const gpx = new DOMParser().parseFromString(content)
    const converted = toGeoJson.gpx(gpx)
    const json = converted['features'][0]

    try {
      await uploadActivityMutation({
        variables: {
          title: json.properties.name,
          description: '',
          geoJson: JSON.stringify(converted),
          userId: props.userId,
        },
        refetchQueries: ['activitiesByUserId', 'me'],
      })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    halfmoon.onDOMContentLoaded()
  }, [])

  const handleFileChosen = (file: any) => {
    fileReader = new FileReader()
    fileReader.onloadend = handleFileRead
    fileReader.readAsText(file)
  }

  return (
    <>
      <button className="btn btn-primary mr-10" type="button">
        <label>
          <FontAwesomeIcon className="mr-10" icon={faUpload} />
          Upload
          <input
            type="file"
            id="file"
            className="input-file d-none"
            accept=".gpx"
            onChange={(e) =>
              e.target.files && handleFileChosen(e.target.files[0])
            }
          />
        </label>
      </button>
    </>
  )
}

export default Upload

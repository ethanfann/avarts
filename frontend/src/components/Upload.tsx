import { faUpload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect } from 'react'
import { useUploadActivityMutation } from '../generated/graphql'
import { parseFit } from '../utils/parseFit'

const halfmoon = require('halfmoon')

interface Props {
  userId: string
}

const Upload = (props: Props) => {
  let file: File
  let fitReader: FileReader

  const [uploadActivityMutation] = useUploadActivityMutation()

  const handleFitRead = async () => {
    const arrayBuffer = fitReader.result

    if (arrayBuffer && typeof arrayBuffer !== 'string') {
      let json = parseFit(arrayBuffer)

      handleUpload('Cool Ride', json)
    }
  }

  const handleUpload = async (title: string, converted: JSON) => {
    try {
      await uploadActivityMutation({
        variables: {
          title: title,
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
    // halfmoon.onDOMContentLoaded()
  }, [])

  const handleFileChosen = (selected: any) => {
    file = selected
    fitReader = new FileReader()

    fitReader.onloadend = handleFitRead
    fitReader.readAsArrayBuffer(file)
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
            accept=".fit"
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

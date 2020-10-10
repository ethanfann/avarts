import { faUpload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { useUploadActivityMutation } from '../generated/graphql'
import { parseFit } from '../utils/parseFit'
import { useForm } from 'react-hook-form'

type FormData = {
  title: string
  description: string
  geoJson: JSON
}

const halfmoon = require('halfmoon')

interface Props {
  userId: string
}

const UploadForm = (props: Props) => {
  let fitReader: FileReader
  let [selectedFile, setSelectedFile] = useState<File | null>()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const { register, setValue, handleSubmit } = useForm<FormData>()

  const onSubmit = (data: any) => {
    const { title, description } = data

    if (selectedFile) {
      handleUpload(title, description, selectedFile)
    }
  }

  const [uploadActivityMutation] = useUploadActivityMutation()

  const handleFitRead = async () => {
    const arrayBuffer = fitReader.result

    if (arrayBuffer && typeof arrayBuffer !== 'string') {
      let json = parseFit(arrayBuffer)
    }
  }

  const handleUpload = async (
    title: string,
    description: string,
    converted: File
  ) => {
    try {
      await uploadActivityMutation({
        variables: {
          title: title,
          description: description,
          fitFile: converted,
          userId: props.userId,
        },
        refetchQueries: ['activitiesByUserId', 'me'],
      })

      setTitle('')
      setDescription('')
      setSelectedFile(null)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    halfmoon.onDOMContentLoaded()
  }, [])

  const disableUpload = (): boolean => {
    return title.length === 0 || !selectedFile
  }

  const handleFileChosen = (selected: any) => {
    setSelectedFile(selected)
    // fitReader = new FileReader()

    // fitReader.onloadend = handleFitRead
    // fitReader.readAsArrayBuffer(selected)
  }

  return (
    <>
      <div className="w-full">
        <div className="card p-0">
          <div className="px-card py-10 border-bottom">
            <h2 className="card-title font-size-18 m-0">Upload</h2>
          </div>
          <div className="content">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group input-group">
                <label className="required">Title</label>
                <div>
                  <input
                    name="title"
                    type="text"
                    ref={register({ required: true })}
                    required={true}
                    onChange={(e) => setTitle(e.target.value.trim())}
                    className="form-control"
                    placeholder="Title"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Description</label>
                <div>
                  <textarea
                    name="description"
                    ref={register({ required: false })}
                    required={false}
                    onChange={(e) => setDescription(e.target.value.trim())}
                    className="form-control"
                    placeholder="Description"
                  ></textarea>
                </div>
              </div>

              <div className="form-group">
                <label className="required">File</label>
                <button className="btn btn btn-block" type="button">
                  <label>
                    Select File
                    <input
                      name="geoJson"
                      type="file"
                      id="file"
                      ref={register({ required: true })}
                      className="input-file d-none"
                      accept=".fit"
                      onChange={(e) =>
                        e.target.files && handleFileChosen(e.target.files[0])
                      }
                    />
                  </label>
                </button>
                <p className="text-muted font-size-12">
                  {selectedFile ? selectedFile.name : 'No file selected'}
                </p>
              </div>

              <input
                className="btn btn-primary btn-block"
                type="submit"
                value="Upload"
                disabled={disableUpload()}
              />
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default UploadForm

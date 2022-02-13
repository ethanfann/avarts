import React, { useState } from 'react'
import { useUploadActivityMutation } from '../generated/graphql'
import { useForm } from 'react-hook-form'

type FormData = {
  title: string
  description: string
  file: File
}

interface Props {
  userId: string
}

const UploadForm = (props: Props) => {
  const [selectedFile, setSelectedFile] = useState<File | null>()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [uploadActivityMutation] = useUploadActivityMutation()
  const { register, handleSubmit } = useForm<FormData>()

  const onSubmit = () => {
    if (selectedFile) {
      handleUpload()
    }
  }

  const handleUpload = async () => {
    try {
      await uploadActivityMutation({
        variables: {
          title: title.trim(),
          description: description.trim(),
          fitFile: selectedFile,
          userId: props.userId,
        },
        refetchQueries: ['myActivities', 'me'],
      })

      setTitle('')
      setDescription('')
      setSelectedFile(null)
    } catch (error) {
      console.log(error)
    }
  }

  const disableUpload = (): boolean => {
    return title.length === 0 || !selectedFile
  }

  const handleFileChosen = (selected: File) => {
    setSelectedFile(selected)
  }

  const handleFileSelectClick = () => {
    const hiddenUploadElement = document.getElementById('file')
    if (hiddenUploadElement) {
      hiddenUploadElement.click()
    }
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
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
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
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    className="form-control"
                    placeholder="Description"
                  ></textarea>
                </div>
              </div>

              <div className="form-group">
                <label className="required">File</label>
                <button
                  className="btn btn btn-block"
                  type="button"
                  onClick={handleFileSelectClick}
                >
                  Select File
                </button>
                <input
                  name="file"
                  type="file"
                  id="file"
                  required={true}
                  ref={register({ required: true })}
                  className="input-file d-none"
                  accept=".fit"
                  onClick={(e) => (e.currentTarget.value = '')}
                  onChange={(e) => {
                    e.target.files && handleFileChosen(e.target.files[0])
                  }}
                />
                <p className="text-muted font-size-12 text-truncate">
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

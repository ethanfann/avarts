import React, { useState, useContext } from 'react'
import UserContext from '../userContext'
import { faEdit, faCamera } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  useUpdateUserNameMutation,
  useUpdateUserImgMutation,
  useUpdateMeasurementPreferenceMutation,
  useDeleteUserMutation,
} from '../generated/graphql'
import { useNavigate } from 'react-router-dom'

const UserSettings = () => {
  const { user } = useContext(UserContext)

  const [firstName, setFirstName] = useState(user.firstName)
  const [lastName, setLastName] = useState(user.lastName)
  const [measurementPreference, setMeasurementPreference] = useState(
    user.measurementPreference
  )
  const [edit, setEdit] = useState(false)

  const [updateUserName] = useUpdateUserNameMutation()
  const [updateUserImg] = useUpdateUserImgMutation()
  const [updateMeasurementPreference] = useUpdateMeasurementPreferenceMutation()
  const [deleteUser] = useDeleteUserMutation()
  const navigate = useNavigate()

  const handleUserDelete = async (e: MouseEvent) => {
    e.preventDefault()

    try {
      const result = await deleteUser()
      if (result && result.data && result.data.deleteUser?.id) {
        navigate(0)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const toggleEdit = () => {
    setEdit(!edit)
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    setEdit(false)

    try {
      await updateUserName({
        variables: {
          firstName: firstName,
          lastName: lastName,
        },
        refetchQueries: ['me'],
      })
    } catch (error) {
      console.log(error)
    }
  }

  const handleImgChosen = (img: File) => {
    uploadImg(img)
  }

  const uploadImg = async (img: File) => {
    try {
      await updateUserImg({
        variables: {
          img: img,
        },
        refetchQueries: ['me'],
      })
    } catch (error) {
      console.log(error)
    }
  }

  const handleMeasurementPreferenceChange = async (
    measurementPreference: string
  ) => {
    try {
      await updateMeasurementPreference({
        variables: {
          measurementPreference: measurementPreference,
        },
        refetchQueries: ['me'],
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="w-full">
      <div className="card border-0">
        <div className="px-card py-10 border-bottom">
          <p style={{ fontSize: 34 }} className="m-0 pl-10 font-weight-bold">
            My Profile
          </p>
        </div>
        <div className="content">
          <div className="d-flex justify-content-left mb-20">
            <img
              src={user.img ? user.img : 'default-user-avatar.png'}
              className="img-fluid rounded-circle w-100 h-100"
              alt="user avatar"
            />

            <label>
              <FontAwesomeIcon className="text-muted" icon={faCamera} />
              <input
                type="file"
                id="file"
                className="input-file d-none"
                accept="image/*"
                onChange={(e) =>
                  e.target.files && handleImgChosen(e.target.files[0])
                }
              />
            </label>
          </div>

          <hr></hr>
          <div className="container-fluid">
            <div className="w-full pb-10">
              {!edit ? (
                <>
                  <span className="text-muted font-size-12">Name</span>
                  <span className="font-size-16 font-weight-semi-bold ml-10">
                    {user.name}
                    <button
                      style={{
                        backgroundColor: 'transparent',
                        backgroundRepeat: 'no-repeat',
                        border: 'none',
                        overflow: 'hidden',
                        outline: 'none',
                      }}
                      className="float-right btn-sm text-muted"
                      onClick={() => toggleEdit()}
                    >
                      <FontAwesomeIcon size="1x" icon={faEdit} />
                    </button>
                  </span>
                </>
              ) : (
                <form className="form-inline">
                  <label className="text-muted font-size-12">Name</label>
                  <input
                    name="firstName"
                    type="text"
                    className="form-control"
                    value={firstName}
                    required={true}
                    onChange={(e) => setFirstName(e.target.value.trim())}
                  />

                  <input
                    name="lastName"
                    type="text"
                    className="form-control"
                    value={lastName}
                    required={true}
                    onChange={(e) => setLastName(e.target.value.trim())}
                  />

                  <input
                    className="btn btn-sm"
                    type="submit"
                    value="Save"
                    onClick={(e) => handleSubmit(e)}
                  />
                  <input
                    className="btn btn-sm"
                    type="button"
                    value="Cancel"
                    onClick={(e) => setEdit(false)}
                  />
                </form>
              )}
            </div>

            <p className="font-weight-bold">Measurement Preference</p>
            <div className="custom-radio d-inline-block mr-10">
              <input
                type="radio"
                name="radio-set-1"
                id="radio-1"
                value="feet"
                checked={measurementPreference === 'feet'}
                onChange={(e) => {
                  setMeasurementPreference(e.target.value)
                  handleMeasurementPreferenceChange(e.target.value)
                }}
              />
              <label htmlFor="radio-1">Imperial (feet)</label>
            </div>
            <div className="custom-radio d-inline-block pb-20">
              <input
                type="radio"
                name="radio-set-1"
                id="radio-2"
                value="meters"
                checked={measurementPreference === 'meters'}
                onChange={(e) => {
                  setMeasurementPreference(e.target.value)
                  handleMeasurementPreferenceChange(e.target.value)
                }}
              />
              <label htmlFor="radio-2">Metric (meters)</label>
            </div>
            <div>
              <button
                className="btn btn-danger"
                type="button"
                aria-label="Delete User and Data"
                onClick={(e) => handleUserDelete(e)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserSettings

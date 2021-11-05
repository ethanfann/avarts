import React, { useState } from 'react'
import UserContext, { ContextType } from '../userContext'
import { faEdit, faCamera } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  useUpdateUserNameMutation,
  useUpdateUserImgMutation,
} from '../generated/graphql'

const UserSettings = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [edit, setEdit] = useState(false)

  const [updateUserName] = useUpdateUserNameMutation()
  const [updateUserImg] = useUpdateUserImgMutation()

  const toggleEdit = (e: any) => {
    setEdit(!edit)
  }

  const handleSubmit = async (e: any, ctx: ContextType) => {
    e.preventDefault()

    setEdit(false)

    try {
      const result = await updateUserName({
        variables: {
          firstName: firstName,
          lastName: lastName,
        },
        refetchQueries: ['currentUserQuery'],
      })
      if (result && result.data && result.data.updateName) {
        window.location.reload()
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleImgChosen = (img: File) => {
    uploadImg(img)
  }

  const uploadImg = async (img: File) => {
    try {
      const result = await updateUserImg({
        variables: {
          img: img,
        },
        refetchQueries: ['currentUserQuery'],
      })
      if (result && result.data && result.data.updateImg) {
        window.location.reload()
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <UserContext.Consumer>
      {(ctx) => (
        <div className="w-three-quarter">
          <div className="card p-0 border-0">
            <div className="px-card py-10 border-bottom">
              <p
                style={{ fontSize: 34 }}
                className="m-0 pl-10 font-weight-bold"
              >
                My Profile
              </p>
            </div>
            <div className="content">
              <div className="d-flex justify-content-left mb-20">
                <img
                  src={ctx.user?.img ? ctx.user.img : 'default-user-avatar.png'}
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
                <div className="w-full">
                  {!edit ? (
                    <>
                      <span className="text-muted font-size-12">Name</span>
                      <span className="font-size-16 font-weight-semi-bold ml-10">
                        {ctx.user.name}
                        <button
                          style={{
                            backgroundColor: 'transparent',
                            backgroundRepeat: 'no-repeat',
                            border: 'none',
                            overflow: 'hidden',
                            outline: 'none',
                          }}
                          className="float-right btn-sm text-muted"
                          onClick={(e) => toggleEdit(e)}
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
                        defaultValue={ctx.user.firstName}
                        required={true}
                        onChange={(e) => setFirstName(e.target.value.trim())}
                      />

                      <input
                        name="lastName"
                        type="text"
                        className="form-control"
                        defaultValue={ctx.user.lastName}
                        required={true}
                        onChange={(e) => setLastName(e.target.value.trim())}
                      />

                      <input
                        className="btn btn-sm"
                        type="submit"
                        value="Save"
                        onClick={(e) => handleSubmit(e, ctx)}
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
              </div>
            </div>
          </div>
        </div>
      )}
    </UserContext.Consumer>
  )
}

export default UserSettings

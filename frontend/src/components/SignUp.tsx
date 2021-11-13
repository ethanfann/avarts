import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSignUpMutation } from '../generated/graphql'
import { emailValidation } from '../utils/validation'

type FormData = {
  firstName: string
  lastName: string
  email: string
  password: string
  passwordConfirm: string
}

const SignUp = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')

  const { register, handleSubmit } = useForm<FormData>()

  const onSubmit = () => {
    signup()
  }

  const [signupMutation] = useSignUpMutation()

  const passwordMatch = () => {
    // Match if both are blank
    if (password === '' && passwordConfirm === '') return true
    // Match if first password typed, but second is blank
    else if (password !== '' && passwordConfirm === '') return true
    else if (password !== '' && passwordConfirm !== '') {
      return password === passwordConfirm
    }
  }

  const signup = async () => {
    try {
      const result = await signupMutation({
        variables: {
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
          passwordConfirmation: passwordConfirm,
        },
      })
      if (result && result.data && result.data.signUp) {
        localStorage.setItem('token', result.data.signUp.token)
        window.location.reload()
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div
      className="content-wrapper"
      style={{
        background: 'url("background.JPG")',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }}
    >
      <div className="container-fluid">
        <div className="d-flex justify-content-center">
          <div style={{ marginTop: '10vh' }} className="card w-400">
            <h2 className="text-align-center">Sign up for Avarts today.</h2>
            <form
              style={{ height: '50%' }}
              onSubmit={handleSubmit(onSubmit)}
              className=""
            >
              <div className="form-row row-eq-spacing-sm">
                <label className="required">First Name</label>
                <input
                  name="firstName"
                  ref={register({ required: true })}
                  type="text"
                  className="form-control"
                  required={true}
                  onChange={(e) => setFirstName(e.target.value.trim())}
                />
              </div>

              <div className="form-row row-eq-spacing-sm">
                <label className="required">Last Name</label>
                <input
                  name="lastName"
                  ref={register({ required: true })}
                  type="text"
                  className="form-control"
                  required={true}
                  onChange={(e) => setLastName(e.target.value.trim())}
                />
              </div>

              <div className="form-row row-eq-spacing-sm">
                <label className="required">Email</label>
                <input
                  name="email"
                  ref={register({
                    required: true,
                    pattern: emailValidation,
                  })}
                  type="text"
                  className="form-control"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div
                className={`form-group ${!passwordMatch() ? 'is-invalid' : ''}`}
              >
                <div className="form-row row-eq-spacing-sm">
                  <div className="col-sm">
                    <label className="required">Password</label>
                    <input
                      name="password"
                      ref={register({ required: true })}
                      type="password"
                      className="form-control"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  <div className="col-sm">
                    <label className="required">Confirm Password</label>
                    <input
                      name="passwordConfirm"
                      ref={register({ required: true })}
                      type="password"
                      className="form-control"
                      onChange={(e) => setPasswordConfirm(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <input
                className="btn btn-primary"
                type="submit"
                value="Sign Up"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp

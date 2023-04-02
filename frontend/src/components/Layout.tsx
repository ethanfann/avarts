import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import UserCard from '../components/UserCard'
import { useMeQuery } from '../generated/graphql'
import UserContext from '../userContext'
import ThemeContext from '../themeContext'
import { toggleSidebar } from '../utils/sideBar'
import SignUp from '../components/SignUp'
import UploadForm from '../components/UploadForm'
import { Outlet } from 'react-router-dom'

const halfmoon = require('halfmoon')

require('halfmoon/css/halfmoon.min.css')

const darkModeEnabled = (): boolean => {
  const darkModePref: string | null = localStorage.getItem('prefer-dark-mode')
  const darkModeEnabled: boolean =
    darkModePref && darkModePref === 'true' ? true : false
  return darkModeEnabled
}

const Layout: React.FC = () => {
  const [darkMode, setDarkMode] = useState(darkModeEnabled())
  const { loading, error, data, refetch } = useMeQuery()

  useEffect(() => {
    const darkModePref = localStorage.getItem('prefer-dark-mode')

    if (darkModePref === 'true') {
      halfmoon.toggleDarkMode()
    }
  }, [])

  useEffect(() => {
    halfmoon.onDOMContentLoaded()
  }, [])

  const toggleDarkMode = () => {
    halfmoon.toggleDarkMode()

    const darkModePref = localStorage.getItem('prefer-dark-mode')

    if (darkModePref) {
      if (darkModePref === 'true') {
        setDarkMode(false)
        localStorage.setItem('prefer-dark-mode', 'false')
      } else if (darkModePref === 'false') {
        setDarkMode(true)
        localStorage.setItem('prefer-dark-mode', 'true')
      }
    } else {
      setDarkMode(false)
      localStorage.setItem('prefer-dark-mode', 'false')
    }
  }

  if (loading) return <div>Loading</div>
  if (error) return <div>Error</div>

  return (
    <ThemeContext.Provider
      value={{ darkMode: darkMode, toggleDarkMode: toggleDarkMode }}
    >
      {data && data.me ? (
        <UserContext.Provider
          value={{
            user: {
              id: data.me.id,
              name: data.me.name,
              img: data.me.img,
              latestActivity:
                data.me.latestActivity && data.me.latestActivity.title
                  ? data.me.latestActivity
                  : { id: '', title: '', createdAt: '', startTime: 0 },
              activityCount: data.me.activityCount ? data.me.activityCount : 0,
              firstName: data.me.firstName,
              lastName: data.me.lastName,
              strokeColor: data.me.strokeColor,
              measurementPreference: data.me.measurementPreference,
              mapboxToken: data.mapboxToken,
            },
            refetch: refetch,
          }}
        >
          <>
            <div
              id="pageWrapper"
              className="page-wrapper with-navbar with-sidebar" //with-sidebar
              data-sidebar-type="overlayed-sm-and-down"
            >
              <div className="sidebar-overlay" onClick={toggleSidebar}></div>
              <div className="sidebar border-0">
                <UserCard />
                {data.me.id !== '0' && <UploadForm userId={data.me.id} />}
              </div>

              <Header />

              <div className="content-wrapper">
                <div className="container">
                  <Outlet />
                </div>
              </div>
            </div>
          </>
        </UserContext.Provider>
      ) : (
        <div
          id="pageWrapper"
          className="page-wrapper with-navbar" //with-sidebar
        >
          <Header />

          <div className="content-wrapper">
            <div className="container-fluid">
              <div className="d-flex justify-content-center">
                <SignUp />
              </div>
            </div>
          </div>
        </div>
      )}
    </ThemeContext.Provider>
  )
}

export default Layout

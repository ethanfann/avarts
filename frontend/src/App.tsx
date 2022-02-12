import React, { useEffect, useState } from 'react'
import Header from './components/Header'
import Main from './components/Main'
import UserCard from './components/UserCard'
import { useMeQuery } from './generated/graphql'
import UserContext from './userContext'
import ThemeContext from './themeContext'
import { toggleSidebar } from './utils/sideBar'
import { Routes, Route } from 'react-router-dom'
import SignUp from './components/SignUp'
import UserSettings from './components/UserSettings'
import UploadForm from './components/UploadForm'
import DetailedActivity from './components/DetailedActivity/DetailedActivity'

const halfmoon = require('halfmoon')

require('halfmoon/css/halfmoon.min.css')

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false)
  const { loading, error, data, refetch } = useMeQuery()

  useEffect(() => {
    document.body.classList.add('with-custom-webkit-scrollbars')
    document.body.classList.add('with-custom-css-scrollbars')

    const darkModePref = localStorage.getItem('prefer-dark-mode')

    if (darkModePref === 'true') {
      halfmoon.toggleDarkMode()
    }
  }, [])

  useEffect(() => {
    setDarkMode(darkModeEnabled())
  }, [])

  useEffect(() => {
    halfmoon.onDOMContentLoaded()
  }, [])

  const toggleDarkMode = () => {
    halfmoon.toggleDarkMode()

    const darkModePref = localStorage.getItem('prefer-dark-mode')

    // TODO: Improve this
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

  const darkModeEnabled = (): boolean => {
    const darkModePref: string | null = localStorage.getItem('prefer-dark-mode')
    const darkModeEnabled: boolean =
      darkModePref && darkModePref === 'true' ? true : false
    return darkModeEnabled
  }

  if (loading) return <div>Loading</div>
  if (error) return <div>Error</div>

  return (
    <ThemeContext.Provider
      value={{ darkMode: darkMode, toggleDarkMode: toggleDarkMode }}
    >
      <div>
        {data && data.me ? (
          <UserContext.Provider
            value={{
              user: {
                id: data.me.id,
                name: data.me.name,
                img: data.me.img,
                // TODO: This is ugly. Find a better way to handle when a User has no activities
                latestActivity:
                  data.me.latestActivity && data.me.latestActivity.title
                    ? data.me.latestActivity
                    : { id: '', title: '', createdAt: '', startTime: 0 },
                activityCount: data.me.activityCount
                  ? data.me.activityCount
                  : 0,
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

                <>
                  <div className="content-wrapper">
                    <div className="container-fluid">
                      <div className="d-flex justify-content-center">
                        <Routes>
                          <Route path="/settings" element={<UserSettings />} />
                          <Route
                            path="/activity/:id"
                            element={<DetailedActivity />}
                          />
                          <Route path="/" element={<Main />} />
                        </Routes>
                      </div>
                    </div>
                  </div>
                </>
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
      </div>
    </ThemeContext.Provider>
  )
}

export default App

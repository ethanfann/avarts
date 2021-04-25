import React, { useEffect, useState } from 'react'
import Helmet from 'react-helmet'
import Header from './components/Header'
import Main from './components/Main'
import UserCard from './components/UserCard'
import { useMeQuery, MeComponent } from './generated/graphql'
import UserContext from './userContext'
import ThemeContext from './themeContext'
import { toggleSidebar } from './utils/sideBar'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  BrowserRouter,
} from 'react-router-dom'
import SignUp from './components/SignUp'
import UserSettings from './components/UserSettings'
import UploadForm from './components/UploadForm'

const halfmoon = require('halfmoon')

require('halfmoon/css/halfmoon.min.css')

const App: React.FC = () => {
  const [user, setUser] = useState<any>()
  const { data, error, loading } = useMeQuery()
  const [darkMode, setDarkMode] = useState(false)

  const logout = () => {
    localStorage.removeItem('token')
    window.location.reload()
  }

  // useEffect(() => {
  //   if (data) {
  //     if (data && data.me) {
  //       setUser(data.me)
  //     }
  //   }
  //   if (error) {
  //     console.log(error)
  //   }
  //   if (loading) {
  //     console.log(loading)
  //   }
  // }, [data, error, loading])

  useEffect(() => {
    document.body.classList.add('with-custom-webkit-scrollbars')
    document.body.classList.add('with-custom-css-scrollbars')

    const darkModePref = localStorage.getItem('prefer-dark-mode')

    if (darkModePref === 'true') {
      halfmoon.toggleDarkMode()
    }

    // halfmoon.onDOMContentLoaded()
  }, [])

  useEffect(() => {
    setDarkMode(darkModeEnabled())
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

  return (
    <MeComponent>
      {({ loading, error, data }) => {
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
                      id: data.me.id ? data.me.id : '0',
                      name: data.me.name ? data.me.name : '',
                      img: data.me.img ? data.me.img : '',
                      // TODO: This is ugly. Find a better way to handle when a User has no activities
                      latestActivity:
                        data.me.latestActivity && data.me.latestActivity.title
                          ? data.me.latestActivity
                          : { title: '', createdAt: '', startTime: 0 },
                      activityCount: data.me.activityCount
                        ? data.me.activityCount
                        : 0,
                      firstName: data.me.firstName ? data.me.firstName : '',
                      lastName: data.me.lastName ? data.me.lastName : '',
                      strokeColor: data.me.strokeColor
                        ? data.me.strokeColor
                        : '',
                    },
                    logout: logout,
                  }}
                >
                  <>
                    <div
                      id="pageWrapper"
                      className="page-wrapper with-navbar with-sidebar" //with-sidebar
                      data-sidebar-type="overlayed-sm-and-down"
                    >
                      <div
                        className="sidebar-overlay"
                        onClick={toggleSidebar}
                      ></div>
                      <div className="sidebar border-0">
                        <UserCard />
                        {data.me.id !== '0' && (
                          <UploadForm userId={data.me.id} />
                        )}
                      </div>

                      <Helmet>
                        <meta charSet="utf-8" />
                        <title>Avarts</title>
                        <meta
                          name="description"
                          content="Avarts is an open-source and self-hostable ride activity tracker."
                        />
                        <meta
                          name="viewport"
                          content="width=device-width, initial-scale=1"
                        />
                        <link
                          rel="apple-touch-icon"
                          sizes="180x180"
                          href="/apple-touch-icon.png"
                        />
                        <link
                          rel="icon"
                          type="image/png"
                          sizes="32x32"
                          href="/favicon-32x32.png"
                        />
                        <link
                          rel="icon"
                          type="image/png"
                          sizes="16x16"
                          href="/favicon-16x16.png"
                        />
                        <link
                          rel="canonical"
                          href="https://avarts.ethanfann.com"
                        />
                        <link rel="manifest" href="/site.webmanifest"></link>
                      </Helmet>

                      <BrowserRouter>
                        <Header />

                        <>
                          <div className="content-wrapper">
                            <div className="container-fluid">
                              <div className="d-flex justify-content-center">
                                <Switch>
                                  <Route
                                    path="/settings"
                                    component={UserSettings}
                                  />
                                  <Route path="/" component={Main} />
                                </Switch>
                              </div>
                            </div>
                          </div>
                        </>
                      </BrowserRouter>
                    </div>
                  </>
                </UserContext.Provider>
              ) : (
                <div
                  id="pageWrapper"
                  className="page-wrapper with-navbar" //with-sidebar
                >
                  <Helmet>
                    <meta charSet="utf-8" />
                    <title>Avarts</title>
                  </Helmet>

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
      }}
    </MeComponent>

    // <UserContext.Provider
    //   value={{
    //     user: {
    //       id: user ? user.id : '0',
    //       name: user ? user.name : '',
    //       img: user ? user.img : '',
    //       // TODO: This is ugly. Find a better way to handle when a User has no activities
    //       latestActivity:
    //         user && user.latestActivity && user.latestActivity.title
    //           ? user.latestActivity
    //           : { title: '', createdAt: '' },
    //       activityCount: user ? user.activityCount : 0,
    //       firstName: user ? user.firstName : '',
    //       lastName: user ? user.lastName : '',
    //     },
    //     logout: logout,
    //   }}
    // >
    //   <>
    //     <div
    //       id="pageWrapper"
    //       className="page-wrapper with-navbar with-sidebar" //with-sidebar
    //       data-sidebar-type="overlayed-sm-and-down"
    //     >
    //       <div className="sidebar-overlay" onClick={toggleSidebar}></div>
    //       <div className="sidebar border-0">
    //         <UserCard />
    //         {user && user.id !== 0 && <UploadForm userId={user.id} />}
    //       </div>

    //       <Helmet>
    //         <meta charSet="utf-8" />
    //         <title>Avarts</title>
    //       </Helmet>

    //       <BrowserRouter>
    //         <Header />

    //         <>
    //           <div className="content-wrapper">
    //             <div className="container-fluid">
    //               <div className="d-flex justify-content-center">
    //                 <Switch>
    //                   <Route path="/settings" component={UserSettings} />
    //                   <Route path="/" component={Main} />
    //                 </Switch>
    //               </div>
    //             </div>
    //           </div>
    //         </>
    //       </BrowserRouter>

    //       {/* <Main /> */}
    //       {/* Footer? */}
    //     </div>
    //   </>
    // </UserContext.Provider>
  )
}

export default App

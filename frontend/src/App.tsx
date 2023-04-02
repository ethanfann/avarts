import React from 'react'
import TimeLine from './components/TimeLine'
import UserSettings from './components/UserSettings'
import DetailedActivity from './components/DetailedActivity/DetailedActivity'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'
import Layout from './components/Layout'

const App: React.FC = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<TimeLine />} />
        <Route path="/settings" element={<UserSettings />} />
        <Route path="/activity/:id" element={<DetailedActivity />} />
      </Route>
    )
  )

  return <RouterProvider router={router} />
}

export default App

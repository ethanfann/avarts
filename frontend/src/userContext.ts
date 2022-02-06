import { createContext } from 'react'

export type UserType = {
  id: string
  name: string
  img: string
  latestActivity: {
    id: string
    title: string
    createdAt: string
    startTime: number
  }
  activityCount: number
  firstName: string
  lastName: string
  strokeColor: string
  measurementPreference: string
}

export type ContextType = {
  user: UserType
  refetch: () => void
}

const UserContext = createContext<ContextType>({
  user: {
    id: '0',
    name: '',
    img: '',
    latestActivity: {
      id: '',
      title: '',
      createdAt: '',
      startTime: 0,
    },
    activityCount: 0,
    firstName: '',
    lastName: '',
    strokeColor: '',
    measurementPreference: '',
  },
  refetch: () => {},
})

export default UserContext

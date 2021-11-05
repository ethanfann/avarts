import { createContext } from 'react'

export type UserType = {
  id: string
  name: string
  img: string
  latestActivity: {
    title: string
    createdAt: string
    startTime: number
  }
  activityCount: number
  firstName: string
  lastName: string
  strokeColor: string
}

export type ContextType = {
  user: UserType
  logout: () => void
}

const UserContext = createContext<ContextType>({
  user: {
    id: '0',
    name: '',
    img: '',
    latestActivity: {
      title: '',
      createdAt: '',
      startTime: 0,
    },
    activityCount: 0,
    firstName: '',
    lastName: '',
    strokeColor: '',
  },
  logout: () => {},
})

export default UserContext

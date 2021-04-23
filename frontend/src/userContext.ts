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
}

export type ContextType = {
  user: UserType
  logout: any
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
  },
  logout: null,
})

export default UserContext

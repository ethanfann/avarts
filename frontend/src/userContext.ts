import { createContext } from 'react'

export type UserType = {
  id: string
  name: string
  img: string
  latestActivity: {
    title: string
    createdAt: string
  }
  activityCount: number
}

type ContextType = {
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
    },
    activityCount: 0,
  },
  logout: null,
})

export default UserContext

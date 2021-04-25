import { createContext } from 'react'

export type ContextType = {
  darkMode: boolean
  toggleDarkMode: any
}

const ThemeContext = createContext<ContextType>({
  darkMode: false,
  toggleDarkMode: () => {},
})

export default ThemeContext

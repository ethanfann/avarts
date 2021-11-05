import React from 'react'
import { faMoon } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ThemeContext from '../themeContext'

const DarkModeToggleButton = () => {
  return (
    <ThemeContext.Consumer>
      {(ctx) => (
        <button
          className="btn btn-action float-right mt-5"
          type="button"
          onClick={ctx.toggleDarkMode}
          aria-label="Toggle dark mode"
        >
          <FontAwesomeIcon icon={faMoon} />
        </button>
      )}
    </ThemeContext.Consumer>
  )
}

export default DarkModeToggleButton

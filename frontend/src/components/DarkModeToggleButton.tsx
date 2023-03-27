import React from 'react'
import { faMoon } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ThemeContext from '../themeContext'

type PropTypes = {
  className?: string
}

const DarkModeToggleButton = (props: PropTypes) => {
  return (
    <ThemeContext.Consumer>
      {(ctx) => (
        <button
          className={`btn btn-action ${props?.className}`}
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

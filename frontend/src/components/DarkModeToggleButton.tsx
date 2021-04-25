import React from 'react'
import { faMoon } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const halfmoon = require('halfmoon')

const DarkModeToggleButton = () => {
  const toggleDarkMode = () => {
    halfmoon.toggleDarkMode()

    const darkModePref = localStorage.getItem('prefer-dark-mode')

    // TODO: Improve this
    if (darkModePref) {
      if (darkModePref === 'true') {
        localStorage.setItem('prefer-dark-mode', 'false')
      } else if (darkModePref === 'false') {
        localStorage.setItem('prefer-dark-mode', 'true')
      }
    } else {
      localStorage.setItem('prefer-dark-mode', 'false')
    }
  }

  return (
    <button
      className="btn btn-action float-right mt-5"
      type="button"
      onClick={toggleDarkMode}
      aria-label="Toggle dark mode"
    >
      <FontAwesomeIcon icon={faMoon} />
    </button>
  )
}

export default DarkModeToggleButton

import { createContext, useContext, useState } from 'react'
import clsx from 'clsx'
import { useEffect } from 'react/cjs/react.development'

const ThemeContext = createContext()

export const useTheme = () => useContext(ThemeContext)

export function ThemeProvider({ children }) {
  const [dark, setDark] = useState(false)

  const toggleDarkMode = e => setDark(!dark)

  useEffect(() => {
    const localPref = localStorage.getItem('darkMode')
    if (localPref) {
      setDark(localPref === 'true')
      return
    }
    if (!localPref && 
      window.matchMedia && 
      window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
      setDark(true)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('darkMode', dark)
  }, [dark])

  return (
    <ThemeContext.Provider value={{
      dark, toggleDarkMode, 
    }}>
      <div id="themed-app" data-theme={dark ? 'dark' : 'light'}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}
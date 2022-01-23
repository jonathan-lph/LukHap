import { createContext, useContext, useState } from 'react'
import clsx from 'clsx'

const ThemeContext = createContext()

export const useTheme = () => useContext(ThemeContext)

export function ThemeProvider({ children }) {
  const [dark, setDark] = useState(true)

  return (
    <ThemeContext.Provider value={{
      dark, setDark, 
    }}>
      <div id="themed-app" className={clsx({
        'theme--light': !dark,
        'theme--dark': dark
      })}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}
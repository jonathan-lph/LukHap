import { useEffect } from 'react';
import '@styles/global.sass'
import { ThemeProvider } from '@context/ThemeContext'

function MyApp({ Component, pageProps }) {
  
  useEffect(() => {
    // Configure height
    const appHeight = () => document.documentElement.style.setProperty('--app-height', `${window.innerHeight}px`)
    window.addEventListener('resize', appHeight)
    appHeight()
    return () => window.removeEventListener('resize', appHeight)
  }, []);

  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp

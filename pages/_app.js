import { useEffect } from 'react';
import '@styles/global.sass'
import { ThemeProvider } from '@context/ThemeContext'
import firebaseApp from '@firebaseApp'
import { getAnalytics, logEvent } from 'firebase/analytics'

function MyApp({ Component, pageProps }) {
  
  useEffect(() => {
    // Configure height
    const appHeight = () => document.documentElement.style.setProperty('--app-height', `${window.innerHeight}px`)
    window.addEventListener('resize', appHeight)
    appHeight()
    // Setup Firebase Analytics
    const analytics = getAnalytics(firebaseApp)
    logEvent(analytics, 'page_view')
    return () => window.removeEventListener('resize', appHeight)
  }, []);

  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp

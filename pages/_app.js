import '@styles/global.sass'
import { ThemeProvider } from '@context/ThemeContext'
import Header from '@components/common/Header'

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <Header/>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp

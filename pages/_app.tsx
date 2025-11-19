import { AppProps } from 'next/app'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { AnimatePresence } from 'framer-motion'
import { Provider } from 'react-redux'
import { store } from '../store/store'
import Layout from '../components/Layout'

const theme = createTheme({
  palette: {
    primary: {
      main: '#424242',
      light: '#616161',
      dark: '#212121',
    },
    secondary: {
      main: '#10b981',
      light: '#059669',
    },
    background: {
      default: 'linear-gradient(135deg, #424242 0%, #616161 100%)',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif',
    h1: {
      fontWeight: 600,
    },
    h2: {
      fontWeight: 600,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: '#f9f8f8',
          minHeight: '100vh',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '10px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          backgroundColor: '#ffffff',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '5px',
          textTransform: 'none',
          fontWeight: 500,
        },
      },
    },
  },
  transitions: {
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      standard: 300,
      complex: 375,
      enteringScreen: 225,
      leavingScreen: 195,
    },
  },
})

export default function App({ Component, pageProps, router }: AppProps) {
  const isLoginPage = router.pathname === '/login'
  
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {isLoginPage ? (
          <Component {...pageProps} />
        ) : (
          <Layout>
            <AnimatePresence mode="wait" initial={false}>
              <Component {...pageProps} key={router.route} />
            </AnimatePresence>
          </Layout>
        )}
      </ThemeProvider>
    </Provider>
  )
}
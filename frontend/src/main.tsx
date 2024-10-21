import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LayoutMain from './layout/layout-main.tsx'
import { createTheme, StyledEngineProvider, ThemeProvider } from '@mui/material'
import Register from './page/register.tsx'
import Login from './page/login.tsx'

const rootElement = document.getElementById('root')!;

const router = createBrowserRouter([
  {
    path: '/',
    element: <LayoutMain />,
    children: [
      {
        index: true,
        element: <h1>Home</h1>
      }
    ]
  },
  { path: '/register', 
    element: <Register /> }, 
  {
    path: '/login',
    element: <Login />
  }

]);

const theme = createTheme({
  colorSchemes: {
    dark: true
  },
  components: {
    MuiPopover: {
      defaultProps: {
        container: rootElement,
      },
    },
    MuiPopper: {
      defaultProps: {
        container: rootElement,
      },
    },
    MuiDialog: {
      defaultProps: {
        container: rootElement,
      },
    },
    MuiModal: {
      defaultProps: {
        container: rootElement,
      },
    },
  },
});


createRoot(rootElement).render(
  <StrictMode>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme} defaultMode='dark'>
        <RouterProvider router={router} />
      </ThemeProvider>
    </StyledEngineProvider>
  </StrictMode>,
)

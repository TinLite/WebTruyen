import { createTheme, CssBaseline, StyledEngineProvider, ThemeProvider } from '@mui/material'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { UserProvider } from './context/user-context.tsx'
import './index.css'
import LayoutMain from './layout/layout-main.tsx'
import PageMain from './page/home.tsx'
import PageLogin from './page/login.tsx'
import { PageReader } from './page/page-reader.tsx'
import PageRegister from './page/register.tsx'
import { PageStoryDetail } from './page/story/story-detail.tsx'

const rootElement = document.getElementById('root')!;

const router = createBrowserRouter([
  {
    path: '/',
    element: <LayoutMain />,
    children: [
      {
        index: true,
        element: <PageMain />
      },
      {
        path: '/truyen/:id',
        element: <PageStoryDetail />,
      },
      {
        path: '/read/:id',
        element: <PageReader />
      }
    ],
  },
  {
    path: '/login',
    element: <PageLogin />
  },
  {
    path: '/register',
    element: <PageRegister />,
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
        <CssBaseline />
        <UserProvider>
          <RouterProvider router={router} />
        </UserProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  </StrictMode>,
)

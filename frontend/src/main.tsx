import {
  createTheme,
  CssBaseline,
  StyledEngineProvider,
  ThemeProvider,
} from "@mui/material";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { UserProvider } from "./context/user-context.tsx";
import "./index.css";
import LayoutAdmin from "./layout/layout-admin.tsx";
import LayoutMain from "./layout/layout-main.tsx";
import StudioLayout from "./layout/layout-studio.tsx";
import ListComment from "./page/Admin/comment/list-comment.tsx";
import Statistical from "./page/Admin/component/statistical.tsx";
import ListStory from "./page/Admin/story/list-story.tsx";
import ListUser from "./page/Admin/user/list-user.tsx";
import { PageBookmarked } from "./page/bookmarks.tsx";
import { PageReadHistory } from "./page/history.tsx";
import PageMain from "./page/home.tsx";
import PageLogin from "./page/login.tsx";
import { PageReader } from "./page/page-reader.tsx";
import PageRegister from "./page/register.tsx";
import { PageStoryDetail } from "./page/story/story-detail.tsx";
import { PageStudioChapterEdit } from "./page/studio/story/chapter-editor.tsx";
import { PageStudioChapterSelector } from "./page/studio/story/chapter.tsx";
import { PageStudioStoryDetail } from "./page/studio/story/story-detail.tsx";
import { PageStudioStoryNew } from "./page/studio/story/story-new.tsx";
import { PageStudioStorySelector } from './page/studio/story/story-selector.tsx';

const rootElement = document.getElementById("root")!;

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutMain />,
    children: [
      {
        index: true,
        element: <PageMain />,
      },
      {
        path: "/truyen/:storyId",
        element: <PageStoryDetail />,
      },
      {
        path: "/read/:chapterId",
        element: <PageReader />,
      },
      {
        path: "/bookmark",
        element: <PageBookmarked />,
      },
      {
        path: "/history",
        element: <PageReadHistory />,
      }
    ],
  },
  {
    path: "/login",
    element: <PageLogin />,
  },
  {
    path: "/register",
    element: <PageRegister />,
  },
  {
    path: '/studio',
    children: [
      {
        index: true,
        element: <PageStudioStorySelector />,
      },
      {
        path: 'new',
        element: <PageStudioStoryNew />
      },
      {
        path: ":storyId",
        element: <StudioLayout />,
        children: [
          {
            index: true,
            element: <PageStudioStoryDetail />
          },
          {
            path: "chapter",
            element: <PageStudioChapterSelector />
          },
          {
            path: "chapter/:chapterId",
            element: <PageStudioChapterEdit />
          }
        ]
      }
    ]
  },
  {
    path: "/admin",
    element: <LayoutAdmin />,
    children: [
      {
        index: true,
        element: <ListUser />,
      },
      {
        path: "story",
        element: <ListStory />,
      },
      {
        path: "comment",
        element: <ListComment />,
      },
      {
        path: "statistical",
        element: <Statistical />,
      },
    ],
  },
]);

const theme = createTheme({
  colorSchemes: {
    dark: true,
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
      <ThemeProvider theme={theme} defaultMode="dark">
        <CssBaseline />
        <UserProvider>
          <RouterProvider router={router} />
        </UserProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  </StrictMode>
);

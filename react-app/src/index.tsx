import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import MainContent from "./components/Main";
import Post from "./components/Post";
import { AuthProvider, RequireAuth } from "./components/Auth";
import Login from "./components/Login";
import "./styles/index.css";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <MainContent />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/posts",
        element: (
          <RequireAuth>
            <Post />
          </RequireAuth>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
);

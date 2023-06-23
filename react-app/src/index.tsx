import * as ReactDOM from "react-dom/client";
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import MainContent from './components/MainContent'
import './styles/index.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainContent />,
  },
])

ReactDOM.createRoot(document.getElementById("root")!).render(<RouterProvider router={router}/>)


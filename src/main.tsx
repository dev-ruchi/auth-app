import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";
import App from './App.tsx'
import Signup from "./Signup.tsx";
import Login from "./Login.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <div className="container mx-auto">
    <RouterProvider router={router} />
  </div>
  // </React.StrictMode>
);

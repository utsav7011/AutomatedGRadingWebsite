import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Teacher from "./components/Teacher";
import AxiosSetter from "./components/AxiosSetter";
import { LoaderProvider } from "./context/loaderContext";
import Student from "./components/Student";
import { PopupProvider } from "./context/popupContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
  },
  {
    path: "/teacher",
    element: <Teacher />,
  },
  {
    path: "/student",
    element: <Student />,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <AxiosSetter>
    <PopupProvider>
      <LoaderProvider>
        <RouterProvider router={router} />
      </LoaderProvider>
    </PopupProvider>
  </AxiosSetter>
);

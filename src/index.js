import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.scss";
import App from "./pages/App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CreateProductPage from "./pages/product/createProductPage";
import Login from "./pages/login";
import Register from "./pages/register";
import PrivatePage from "./components/privatePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivatePage>
        <App />
      </PrivatePage>
    ),
  },
  {
    path: "novo-produto",
    element: (
      <PrivatePage>
        <CreateProductPage />{" "}
      </PrivatePage>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

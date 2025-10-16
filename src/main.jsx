import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router"; 
import MyRecipe from './Components/MyRecipe';
import './index.css';
import AddRecipe from './Components/AddRecipe';
import AllRecipe from './Components/AllRecipe';
import Home from './Components/Home';
import MainLayout from './Layouts/MainLayout';
import Blogs from './Pages/Blogs';
import Login from './Pages/Login';
import Register from './Pages/Register';
import PrivateRoute from './Components/PrivateRoutes';
import RecipeDetails from './Pages/RecipeDetails';
import AuthProvider from './contexts/AuthProvider';
import ErrorPage from './Components/ErrorPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        loader: () => fetch(`https://ranna-banna-server-7kse1solg-ahmedrahat9901-gmailcoms-projects.vercel.app/recipes`),
        
        Component:Home,
      },
      {
        path: "AllRecipe",
        Component:AllRecipe
      },
      {
        element: <PrivateRoute />, 
        children: [
          {
            path: "AddRecipe",
           Component:AddRecipe,
          },
          {
path: "RecipeDetails/:id",
            loader: () => fetch('https://ranna-banna-server-7kse1solg-ahmedrahat9901-gmailcoms-projects.vercel.app/recipes'),
           Component:RecipeDetails,
          },
          {
            path: "MyRecipe",
           Component:MyRecipe,
          },
        ],
      }
    ],
  },
  {
    path: "Login",
    element: <Login />,
  },
  {
    path: "Register",
    element: <Register />,
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
  {    path: "Blogs",
    element: <Blogs />,
  }

  
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
)

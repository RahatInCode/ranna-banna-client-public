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
import { Toaster } from 'react-hot-toast';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://ranna-banna-server-7kse1solg-ahmedrahat9901-gmailcoms-projects.vercel.app';

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        loader: async () => {
          try {
            const response = await fetch(`${API_BASE_URL}/recipes`);
            if (!response.ok) throw new Error('Failed to fetch recipes');
            return await response.json();
          } catch (error) {
            console.error('Loader error:', error);
            return [];
          }
        },
        element: <Home />,
      },
      {
        path: "AllRecipe",
        loader: async () => {
          try {
            const response = await fetch(`${API_BASE_URL}/recipes`);
            if (!response.ok) throw new Error('Failed to fetch recipes');
            return await response.json();
          } catch (error) {
            console.error('Loader error:', error);
            return [];
          }
        },
        element: <AllRecipe />
      },
      {
        path: "Blogs",
        element: <Blogs />,
      },
      {
        element: <PrivateRoute />, 
        children: [
          {
            path: "AddRecipe",
            element: <AddRecipe />,
          },
          {
            path: "RecipeDetails/:id",
            loader: async () => {
              try {
                const response = await fetch(`${API_BASE_URL}/recipes`);
                if (!response.ok) throw new Error('Failed to fetch recipes');
                return await response.json();
              } catch (error) {
                console.error('Loader error:', error);
                return [];
              }
            },
            element: <RecipeDetails />,
          },
          {
            path: "MyRecipe",
            element: <MyRecipe />,
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
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
            padding: '16px',
            borderRadius: '10px',
            fontSize: '14px',
            fontWeight: '500',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
            style: {
              background: '#dcfce7',
              color: '#166534',
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
            style: {
              background: '#fee2e2',
              color: '#991b1b',
            },
          },
        }}
      />
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
)
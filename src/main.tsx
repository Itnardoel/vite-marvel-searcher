import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Toaster } from 'sonner'
import HomePage from './pages/HomePage'
import ErrorPage from './pages/ErrorPage'
import Characters from './components/characters'
import { ComicDetail } from './components/comicDetail'
import './index.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Characters />
      },
      {
        path: 'comic/:comicId',
        element: <ComicDetail />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Toaster />
    <RouterProvider router={router} />
  </React.StrictMode>
)

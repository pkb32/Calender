import { useState } from 'react'
import './App.css'
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import Layout from './Layout.jsx';

import Home from './components/home/Home.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path='' element={<Home/>} />
    </Route>
  )
);

export default function App() {
  return <RouterProvider router={router} />
}

import './App.css'
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import Layout from './Layout.jsx';

import Home from './components/home/Home.jsx'
import EventsController from './components/features/Events.Controller.jsx';
import NotificationController from './components/features/Notification.Controller.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path='' element={<Home/>} />
      <Route path='/events' element={<EventsController />} />
      <Route path='/notifications' element={<NotificationController />} />
    </Route>
  ) 
);

export default function App() {
  return <RouterProvider router={router} />
}

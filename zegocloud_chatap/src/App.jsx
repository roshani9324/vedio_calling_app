
import './App.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom' ;
import Homepage from "./Components/Homepage";
import VideoPages from './Components/VideoPages';
 

function App() {
const router = createBrowserRouter([
  { path: "/", element: <Homepage /> }, 
  { path:"/room/:id", element:<VideoPages/>},
]);
  return (
    <>
     <RouterProvider router={router}/>
    </>
  )
}

export default App

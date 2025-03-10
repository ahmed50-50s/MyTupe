import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Home from './Pages/Home/Home'
import Layout from './Pages/Layout/Layout'
import SearchProvider from './context/SearchContext'
import ShowMovie from './Pages/ShowMovie/ShowMovie'
import ShowTube from './Pages/ShowTube/ShowTube'
import SearchMovies from './Pages/SearchMovies/SearchMovies'


let routes = createBrowserRouter([
  {path:'' , element:<Layout/> , children:[
    {index:true, element:<Home/>},
    {path:'ShowVideo', element:<ShowMovie/>},
    {path:'ShowTube', element:<ShowTube/>},
    {path:'SearchMovies', element:<SearchMovies/>}
  ]},
])

function App() {

  return (
    <>
      <SearchProvider>
      <RouterProvider router = {routes}></RouterProvider>
      </SearchProvider>
    </>
  )
}

export default App

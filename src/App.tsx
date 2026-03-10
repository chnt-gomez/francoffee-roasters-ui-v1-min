import { RouterProvider } from 'react-router'
import StorePage from './pages/store/StorePage'
import { appRouter } from './app.router'

const App = () => {
  return (
   <>
    <RouterProvider router={appRouter} />
   </>
  )
}

export default App

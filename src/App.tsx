import { RouterProvider } from 'react-router'
import { appRouter } from './app.router'
import { CartProvider } from './context/CartContext'

const App = () => {
  return (
    <CartProvider>
      <RouterProvider router={appRouter} />
    </CartProvider>
  )
}

export default App

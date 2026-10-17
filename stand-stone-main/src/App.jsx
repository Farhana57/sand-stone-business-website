import { Route, Routes } from 'react-router-dom'
import Layout from './components/layout/Layout.jsx'
import Home from './pages/Home.jsx'
import Products from './pages/Products.jsx'
import DeliveryServices from './pages/DeliveryServices.jsx'
import About from './pages/About.jsx'
import ContactOrder from './pages/ContactOrder.jsx'
import NotFound from './pages/NotFound.jsx'

/**
 * Route table. The five pages of the brief map to /, /products, /delivery,
 * /about and /contact; `/order` is an alias that lands on the order form.
 */
export function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="products" element={<Products />} />
        <Route path="delivery" element={<DeliveryServices />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<ContactOrder />} />
        <Route path="order" element={<ContactOrder />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App

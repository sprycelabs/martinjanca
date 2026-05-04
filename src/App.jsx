import { Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import ProductDetail from './pages/ProductDetail'
import ScrollToTop from './components/ScrollToTop'

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/kryt" element={<ProductDetail />} />
      </Routes>
    </>
  )
}

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Menu from './pages/Menu'
import Checkout from './pages/Checkout'
import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'

export default function App() {
  // Keep the order here so Menu and Checkout can both use it.
  const [order, setOrder] = useState([])

  return (
    <BrowserRouter>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        {/* Show the page that matches the address */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu order={order} setOrder={setOrder} />} />
          <Route path="/checkout" element={<Checkout order={order} setOrder={setOrder} />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}

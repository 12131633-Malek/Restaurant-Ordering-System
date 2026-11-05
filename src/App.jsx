import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Menu from './pages/Menu'
import Checkout from './pages/Checkout'
import Tracking from './pages/Tracking'
import About from './pages/About'
import Contact from './pages/Contact'
import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'

export default function App() {
  // Keep the order here so Menu and Checkout can both use it.
  const [order, setOrder] = useState([])
  // Keep all confirmed orders, including after a refresh in this tab.
  const [trackingOrders, setTrackingOrders] = useState(() => {
    try {
      const savedOrders = JSON.parse(sessionStorage.getItem('trackingOrder'))
      // Keep the previous single order when upgrading to an order list.
      if (Array.isArray(savedOrders)) return savedOrders
      return savedOrders ? [savedOrders] : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    try {
      sessionStorage.setItem('trackingOrder', JSON.stringify(trackingOrders))
    } catch {
      // Tracking still works if browser storage is unavailable.
    }
  }, [trackingOrders])

  return (
    <BrowserRouter>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        {/* Show the page that matches the address */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu order={order} setOrder={setOrder} />} />
          <Route path="/checkout" element={<Checkout order={order} setOrder={setOrder} setTrackingOrders={setTrackingOrders} />} />
          <Route path="/tracking" element={<Tracking trackingOrders={trackingOrders} />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}

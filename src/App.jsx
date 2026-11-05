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
  // Remember the latest confirmed order when the page is refreshed.
  const [trackingOrder, setTrackingOrder] = useState(() => {
    try {
      return JSON.parse(sessionStorage.getItem('trackingOrder'))
    } catch {
      return null
    }
  })

  useEffect(() => {
    try {
      sessionStorage.setItem('trackingOrder', JSON.stringify(trackingOrder))
    } catch {
      // Tracking still works if browser storage is unavailable.
    }
  }, [trackingOrder])

  return (
    <BrowserRouter>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        {/* Show the page that matches the address */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu order={order} setOrder={setOrder} />} />
          <Route path="/checkout" element={<Checkout order={order} setOrder={setOrder} setTrackingOrder={setTrackingOrder} />} />
          <Route path="/tracking" element={<Tracking trackingOrder={trackingOrder} />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}

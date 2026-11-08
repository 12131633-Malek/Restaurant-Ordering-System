import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import OrderTracking from '../components/OrderTracking'
import './Tracking.css'

export default function Tracking({ trackingOrders, onCancelOrder }) {
  const [now, setNow] = useState(() => Date.now())

  // One timer updates all orders. Each order has its own starting time.
  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="tracking-page">
      <h1>Track Your Orders</h1>
      {trackingOrders.length === 0 ? (
        <p>You have no orders to track.</p>
      ) : (
        trackingOrders.map((order) => (
          <OrderTracking key={order.id} trackingOrder={order} now={now} onCancelOrder={onCancelOrder} />
        ))
      )}
      <Link to="/menu">Back to menu</Link>
    </div>
  )
}

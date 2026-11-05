import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './Tracking.css'

export default function Tracking({ trackingOrder }) {
  const [now, setNow] = useState(() => Date.now())

  // Update the countdown every second. Stop the timer when leaving the page.
  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(timer)
  }, [])

  if (!trackingOrder) {
    return (
      <div className="tracking-page">
        <h1>Track Your Order</h1>
        <p>You do not have a confirmed order yet.</p>
        <Link to="/menu">Choose food from the menu</Link>
      </div>
    )
  }

  const delivery = trackingOrder.method === 'Delivery'
  const steps = delivery
    ? ['Confirmed', 'Preparing', 'Out for delivery', 'Delivered']
    : ['Confirmed', 'Preparing', 'Ready for pickup']
  const duration = delivery ? 30 * 60 : 20 * 60
  const elapsed = Math.max(0, (now - trackingOrder.placedAt) / 1000)
  // Pickup stops at Ready for pickup; a timer cannot confirm collection.
  const lastStep = steps.length - 1
  const stage = Math.min(lastStep, Math.floor(elapsed / (duration / lastStep)))
  const remaining = Math.max(0, Math.ceil(duration - elapsed))
  const minutes = Math.floor(remaining / 60)
  const seconds = String(remaining % 60).padStart(2, '0')

  return (
    <div className="tracking-page">
      <h1>Track Your Order</h1>

      <section className="tracking-box">
        <h2>Order {trackingOrder.id}</h2>
        <p>{trackingOrder.method} for {trackingOrder.name}</p>
        <p className="tracking-status" role="status">Status: {steps[stage]}</p>
        <p>{remaining > 0 ? `Estimated completion in ${minutes}:${seconds}` : delivery ? 'Simulation complete' : 'Estimated pickup time reached.'}</p>
        <ol className="tracking-steps">
          {steps.map((step, index) => (
            <li key={step} className={index <= stage ? 'step-reached' : ''} aria-current={index === stage ? 'step' : undefined}>
              <span className="step-number" aria-hidden="true">{index + 1}</span>
              {step}
            </li>
          ))}
        </ol>
      </section>

      <section className="tracking-box">
        <h2>Order Summary</h2>
        <ul>
          {trackingOrder.items.map((item, index) => <li key={index}>{item.name} - ${item.price.toFixed(2)}</li>)}
        </ul>
        <p className="tracking-total">Food total: ${trackingOrder.total.toFixed(2)}</p>
        <p>Phone: {trackingOrder.phone}</p>
        {delivery ? <p>Delivery address: {trackingOrder.address}</p> : <p>Pickup from Olive &amp; Thyme.</p>}
      </section>
      <Link to="/menu">Back to menu</Link>
    </div>
  )
}

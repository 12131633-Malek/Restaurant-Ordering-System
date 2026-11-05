// One card shows the progress and details of one confirmed order.
export default function OrderTracking({ trackingOrder, now }) {
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
    <div className="tracked-order">

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
        <p>Payment method: {trackingOrder.payment === 'Card' ? (trackingOrder.cardType || 'Card') : trackingOrder.payment === 'Cash' ? (delivery ? 'Cash on delivery' : 'Cash at pickup') : 'Not selected'}</p>
        <p>Phone: {trackingOrder.phone}</p>
        {delivery ? <p>Delivery address: {trackingOrder.address}</p> : <p>Pickup from Olive &amp; Thyme.</p>}
      </section>
    </div>
  )
}

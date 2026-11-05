import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Checkout.css'

export default function Checkout({ order, setOrder, setTrackingOrder }) {
  const navigate = useNavigate()
  const [method, setMethod] = useState('Pickup')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [phoneError, setPhoneError] = useState('')
  const [address, setAddress] = useState('')

  let total = 0
  for (const item of order) {
    total = total + item.price
  }

  function confirmOrder(event) {
    event.preventDefault()

    // Allow spaces, brackets, and dashes, but reject letters and short numbers.
    const phoneText = phone.trim()
    const digits = phoneText.replace(/\D/g, '')
    const allowedCharacters = /^\+?[0-9 ()-]+$/.test(phoneText)

    if (!allowedCharacters || digits.length < 7 || digits.length > 15 || /^(\d)\1+$/.test(digits)) {
      setPhoneError('Enter a valid phone number with 7 to 15 digits. Letters are not allowed.')
      event.currentTarget.elements.namedItem('customer-phone').focus()
      return
    }

    setPhoneError('')
    // Save a separate copy so later menu changes do not change this order.
    setTrackingOrder({
      id: 'OT-' + Date.now(),
      items: [...order],
      method: method,
      name: name.trim(),
      phone: phone.trim(),
      address: method === 'Delivery' ? address.trim() : '',
      total: total,
      placedAt: Date.now(),
    })
    setOrder([])
    navigate('/tracking')
  }

  // Show a message if someone visits Checkout without choosing food.
  if (order.length === 0) {
    return (
      <div className="checkout-page">
        <h1>Your order is empty</h1>
        <p>Add some food from the menu first.</p>
        <Link to="/menu">Go to menu</Link>
      </div>
    )
  }

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>

      <section className="checkout-box">
        <h2>Your Order</h2>
        <ul>
          {order.map((item, index) => (
            <li key={index}>{item.name} - ${item.price.toFixed(2)}</li>
          ))}
        </ul>
        <p className="checkout-total">Food total: ${total.toFixed(2)}</p>
      </section>

        <form className="checkout-box" onSubmit={confirmOrder} autoComplete="off">
          <h2>How would you like your food?</h2>

          {/* The radio buttons update the delivery method. */}
          <fieldset>
            <legend>Choose delivery or pickup</legend>
            <label className="method-option">
              <input type="radio" name="method" value="Pickup" checked={method === 'Pickup'} onChange={() => setMethod('Pickup')} />
              Pickup from restaurant
            </label>
            <label className="method-option">
              <input type="radio" name="method" value="Delivery" checked={method === 'Delivery'} onChange={() => setMethod('Delivery')} />
              Delivery to your address
            </label>
          </fieldset>

          <label htmlFor="customer-name">Your name</label>
          <input id="customer-name" type="text" autoComplete="off" value={name} onChange={(event) => setName(event.target.value)} pattern=".*\S.*" required />

          <label htmlFor="customer-phone">Phone number</label>
          <input
            id="customer-phone"
            type="tel"
            autoComplete="off"
            value={phone}
            onChange={(event) => {
              setPhone(event.target.value)
              setPhoneError('')
            }}
            aria-invalid={Boolean(phoneError)}
            aria-describedby={phoneError ? 'phone-error' : undefined}
          />
          {phoneError && <p id="phone-error" className="phone-error" role="alert">{phoneError}</p>}

          {/* Only delivery needs an address. */}
          {method === 'Delivery' && (
            <>
              <label htmlFor="delivery-address">Delivery address</label>
              <input id="delivery-address" type="text" autoComplete="off" placeholder="Street, building, apartment, and city" value={address} onChange={(event) => setAddress(event.target.value)} pattern=".*\S.*" required />
            </>
          )}

          <button type="submit">Confirm order and track</button>
          <Link to="/menu">Back to menu</Link>
        </form>
    </div>
  )
}

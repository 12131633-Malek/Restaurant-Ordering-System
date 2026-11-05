import { useState } from 'react'
import contactImage from '../assets/contact-restaurant.png'
import './Contact.css'

export default function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [showPreview, setShowPreview] = useState(false)
  const [error, setError] = useState('')

  function handleSubmit(event) {
    event.preventDefault()

    // Reject entries that contain only spaces.
    if (name.trim() === '' || message.trim() === '') {
      setError('Please enter your name and a message.')
      return
    }

    setError('')
    setShowPreview(true)
  }

  return (
    <div className="contact-page">
      {/* Restaurant entrance photo behind the heading. */}
      <section className="contact-banner">
        <img className="contact-background" src={contactImage} alt="" />
        <div className="contact-banner-text">
          <h1>Contact Us</h1>
          <p>Have a question about the menu? Write your message below.</p>
        </div>
      </section>

      <div className="contact-layout">
        {/* Restaurant contact details */}
        <section className="contact-box">
          <h2>Restaurant Details</h2>
          <p><strong>Restaurant:</strong> Olive &amp; Thyme</p>
          <p><strong>Location:</strong> Hamra, Beirut</p>
          <p><strong>Phone:</strong> <a href="tel:+96171024786">71024786</a></p>
          <h3>Opening Hours</h3>
          <p>Monday - Saturday: 11:00 AM - 10:00 PM</p>
          <p>Sunday: 12:00 PM - 9:00 PM</p>
        </section>

        {showPreview ? (
          <section className="contact-box" aria-labelledby="message-preview-title">
            <h2 id="message-preview-title">Message Preview</h2>
            <p><strong>Name:</strong> {name}</p>
            <p><strong>Email:</strong> {email}</p>
            <p className="contact-message">{message}</p>
            <button onClick={() => setShowPreview(false)}>Edit message</button>
          </section>
        ) : (
          <form className="contact-box" onSubmit={handleSubmit} autoComplete="off">
            <h2>Your Message</h2>
            <label htmlFor="contact-name">Name</label>
            <input id="contact-name" type="text" value={name} onChange={(event) => setName(event.target.value)} required />

            <label htmlFor="contact-email">Email</label>
            <input id="contact-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />

            <label htmlFor="contact-message">Message</label>
            <textarea id="contact-message" rows="5" value={message} onChange={(event) => setMessage(event.target.value)} required />

            {error && <p className="contact-error" role="alert">{error}</p>}
            <button type="submit">Preview message</button>
          </form>
        )}
      </div>
    </div>
  )
}

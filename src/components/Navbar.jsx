import './Navbar.css'
import { NavLink, Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <header id="home" className="navbar">
      <Link className="restaurant-name" to="/">Olive &amp; Thyme</Link>
      <nav aria-label="Main navigation">
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/menu">Menu</NavLink>
        <NavLink to="/checkout">Checkout</NavLink>
        <NavLink to="/tracking">Tracking</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/contact">Contact</NavLink>
      </nav>
    </header>
  )
}

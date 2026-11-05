import './Navbar.css'

export default function Navbar() {
  return (
    <header id="home" className="navbar">
      <a className="restaurant-name" href="#home">Olive &amp; Thyme</a>
      <nav aria-label="Main navigation">
        <a href="#home">Home</a>
      </nav>
    </header>
  )
}

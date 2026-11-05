import { Link } from 'react-router-dom'
import restaurantImage from '../assets/about-restaurant.png'
import './About.css'

export default function About() {
  return (
    <div className="about-page">
      {/* The image sits behind the banner text. */}
      <section className="about-banner">
        <img className="about-background" src={restaurantImage} alt="" />
        <div className="about-banner-text">
          <h1>About Olive &amp; Thyme</h1>
          <p>Good food and a place for everyone at the table.</p>
        </div>
      </section>

      {/* Restaurant introduction */}
      <section className="about-box">
        <h2>Our Story</h2>
        <p>Olive &amp; Thyme is a fictional restaurant inspired by Mediterranean food and the joy of sharing a meal. Our menu brings together favorites like hummus, grilled chicken, and shawarma, alongside burgers, pizzas, and sandwiches.</p>
        <p>The idea is simple: something for a quick lunch, a family dinner, or a meal with friends.</p>
      </section>

      {/* Simple information boxes */}
      <h2>What Matters to Us</h2>
      <div className="about-values">
        <section className="about-box">
          <h3>Simple Ingredients</h3>
          <p>Vegetables, herbs, and Mediterranean flavors are the inspiration behind our dishes.</p>
        </section>
        <section className="about-box">
          <h3>A Choice for Everyone</h3>
          <p>From light salads to filling main dishes, explore a menu with plenty of variety.</p>
        </section>
        <section className="about-box">
          <h3>Food Your Way</h3>
          <p>Choose your favorite dishes and select delivery or pickup at checkout.</p>
        </section>
      </div>

      <Link className="about-menu-link" to="/menu">Explore Our Menu</Link>
    </div>
  )
}

import heroImage from '../assets/mediterranean-hero.png'
import './Home.css'

export default function Home() {
  return (
    <div className="home-page">
      {/* Welcome section */}
      <section className="hero">
        <div>
          <h1>Welcome to Olive &amp; Thyme</h1>
          <p>Enjoy tasty Mediterranean food made with fresh ingredients.</p>
          <p>Good food tastes even better when shared with family and friends.</p>
        </div>
        <img src={heroImage} alt="Chicken skewers with hummus, salad, and pita bread" />
      </section>

      {/* Restaurant features */}
      <section className="features">
        <h2>Why choose us?</h2>
        <div className="feature-boxes">
          <div className="feature-box">
            <h3>Fresh ingredients</h3>
            <p>Vegetables, herbs, and simple ingredients in every meal.</p>
          </div>
          <div className="feature-box">
            <h3>Tasty food</h3>
            <p>Enjoy Mediterranean favorites like grilled chicken, hummus, and warm pita.</p>
          </div>
          <div className="feature-box">
            <h3>Meals to share</h3>
            <p>Choose a few dishes and enjoy a meal together.</p>
          </div>
        </div>
      </section>
    </div>
  )
}

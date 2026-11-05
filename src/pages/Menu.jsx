import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import './Menu.css'

export default function Menu({ order, setOrder }) {
  // This ref points to the order section at the bottom of the menu.
  const orderSection = useRef(null)
  // This state remembers which category the visitor selected.
  const [category, setCategory] = useState('All')

  function addToOrder(name, price) {
    setOrder([...order, { name: name, price: price }])
    orderSection.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  function removeFromOrder(itemIndex) {
    setOrder(order.filter((item, index) => index !== itemIndex))
  }

  // Calculate the total from the current order.
  let total = 0
  for (const item of order) {
    total = total + item.price
  }

  return (
    <div className="menu-page">
      <h1>Our Menu</h1>
      <p className="menu-intro">Enjoy our Mediterranean dishes, burgers, pizzas, and sandwiches. All prices are in USD.</p>

      {/* Changing the dropdown updates the category state. */}
      <div className="menu-filter">
        <label htmlFor="category">Filter by category: </label>
        <select id="category" value={category} onChange={(event) => setCategory(event.target.value)}>
          <option>All</option>
          <option>Starters</option>
          <option>Main Dishes</option>
          <option>Burgers</option>
          <option>Pizza</option>
          <option>Sandwiches</option>
          <option>Drinks</option>
          <option>Desserts</option>
        </select>
      </div>

      {/* Show a section when All or its category is selected. */}
      {/* Starters */}
      {(category === 'All' || category === 'Starters') && (
        <section className="menu-section">
          <h2>Starters</h2>
          <div className="menu-items">
            <article className="menu-item">
              <img src="/images/menu/hummus.jpg" alt="Hummus" loading="lazy" />
              <h3>Hummus</h3>
              <p>Creamy chickpea dip with olive oil, served with pita bread.</p>
              <p className="menu-price">$5.00</p>
              <button onClick={() => addToOrder('Hummus', 5.0)} aria-label="Add Hummus to order">Add to order</button>
            </article>
            <article className="menu-item">
              <img src="/images/menu/fattoush-salad.jpg" alt="Fattoush Salad" loading="lazy" />
              <h3>Fattoush Salad</h3>
              <p>Fresh lettuce, tomatoes, cucumber, and crispy pita with lemon dressing.</p>
              <p className="menu-price">$6.00</p>
              <button onClick={() => addToOrder('Fattoush Salad', 6.0)} aria-label="Add Fattoush Salad to order">Add to order</button>
            </article>
            <article className="menu-item">
              <img src="/images/menu/tabbouleh.jpg" alt="Tabbouleh" loading="lazy" />
              <h3>Tabbouleh</h3>
              <p>Parsley, tomatoes, bulgur, and lemon dressing.</p>
              <p className="menu-price">$6.00</p>
              <button onClick={() => addToOrder('Tabbouleh', 6)} aria-label="Add Tabbouleh to order">Add to order</button>
            </article>
            <article className="menu-item">
              <img src="/images/menu/french-fries.jpg" alt="French Fries" loading="lazy" />
              <h3>French Fries</h3>
              <p>Golden crispy fries served with ketchup.</p>
              <p className="menu-price">$4.00</p>
              <button onClick={() => addToOrder('French Fries', 4)} aria-label="Add French Fries to order">Add to order</button>
            </article>
            <article className="menu-item">
              <img src="/images/menu/baba-ghanoush.jpg" alt="Baba Ghanoush" loading="lazy" />
              <h3>Baba Ghanoush</h3>
              <p>Smoky eggplant dip with tahini and olive oil.</p>
              <p className="menu-price">$5.00</p>
              <button onClick={() => addToOrder('Baba Ghanoush', 5)} aria-label="Add Baba Ghanoush to order">Add to order</button>
            </article>
            <article className="menu-item">
              <img src="/images/menu/lentil-soup.jpg" alt="Lentil Soup" loading="lazy" />
              <h3>Lentil Soup</h3>
              <p>A warm bowl of lentils with cumin and lemon.</p>
              <p className="menu-price">$4.00</p>
              <button onClick={() => addToOrder('Lentil Soup', 4)} aria-label="Add Lentil Soup to order">Add to order</button>
            </article>
          </div>
        </section>
      )}

      {/* Main dishes */}
      {(category === 'All' || category === 'Main Dishes') && (
        <section className="menu-section">
          <h2>Main Dishes</h2>
          <div className="menu-items">
            <article className="menu-item">
              <img src="/images/menu/grilled-chicken-plate.jpg" alt="Grilled Chicken Plate" loading="lazy" />
              <h3>Grilled Chicken Plate</h3>
              <p>Chicken skewers served with rice, salad, and garlic sauce.</p>
              <p className="menu-price">$12.00</p>
              <button onClick={() => addToOrder('Grilled Chicken Plate', 12.0)} aria-label="Add Grilled Chicken Plate to order">Add to order</button>
            </article>
            <article className="menu-item">
              <img src="/images/menu/kafta-plate.jpg" alt="Kafta Plate" loading="lazy" />
              <h3>Kafta Plate</h3>
              <p>Grilled beef kafta served with rice and salad.</p>
              <p className="menu-price">$13.00</p>
              <button onClick={() => addToOrder('Kafta Plate', 13)} aria-label="Add Kafta Plate to order">Add to order</button>
            </article>
            <article className="menu-item">
              <img src="/images/menu/mixed-grill.jpg" alt="Mixed Grill" loading="lazy" />
              <h3>Mixed Grill</h3>
              <p>Chicken skewers and kafta served with rice and grilled vegetables.</p>
              <p className="menu-price">$18.00</p>
              <button onClick={() => addToOrder('Mixed Grill', 18)} aria-label="Add Mixed Grill to order">Add to order</button>
            </article>
            <article className="menu-item">
              <img src="/images/menu/grilled-fish.jpg" alt="Grilled Fish" loading="lazy" />
              <h3>Grilled Fish</h3>
              <p>Fish fillet with lemon, rice, and a side salad.</p>
              <p className="menu-price">$15.00</p>
              <button onClick={() => addToOrder('Grilled Fish', 15)} aria-label="Add Grilled Fish to order">Add to order</button>
            </article>
          </div>
        </section>
      )}

      {/* Burgers */}
      {(category === 'All' || category === 'Burgers') && (
        <section className="menu-section">
          <h2>Burgers</h2>
          <div className="menu-items">
            <article className="menu-item">
              <img src="/images/menu/cheeseburger.jpg" alt="Cheeseburger" loading="lazy" />
              <h3>Cheeseburger</h3>
              <p>Beef patty with cheese, lettuce, and tomato.</p>
              <p className="menu-price">$9.00</p>
              <button onClick={() => addToOrder('Cheeseburger', 9)} aria-label="Add Cheeseburger to order">Add to order</button>
            </article>
            <article className="menu-item">
              <img src="/images/menu/classic-beef-burger.jpg" alt="Classic Beef Burger" loading="lazy" />
              <h3>Classic Beef Burger</h3>
              <p>Grilled beef patty with lettuce, tomato, pickles, and burger sauce.</p>
              <p className="menu-price">$8.00</p>
              <button onClick={() => addToOrder('Classic Beef Burger', 8)} aria-label="Add Classic Beef Burger to order">Add to order</button>
            </article>
            <article className="menu-item">
              <img src="/images/menu/crispy-chicken-burger.jpg" alt="Crispy Chicken Burger" loading="lazy" />
              <h3>Crispy Chicken Burger</h3>
              <p>Crispy chicken with lettuce, pickles, and mayonnaise.</p>
              <p className="menu-price">$9.00</p>
              <button onClick={() => addToOrder('Crispy Chicken Burger', 9)} aria-label="Add Crispy Chicken Burger to order">Add to order</button>
            </article>
            <article className="menu-item">
              <img src="/images/menu/mushroom-burger.jpg" alt="Mushroom Burger" loading="lazy" />
              <h3>Mushroom Burger</h3>
              <p>Beef patty topped with mushrooms, cheese, and creamy sauce.</p>
              <p className="menu-price">$10.00</p>
              <button onClick={() => addToOrder('Mushroom Burger', 10)} aria-label="Add Mushroom Burger to order">Add to order</button>
            </article>
          </div>
        </section>
      )}

      {/* Pizza */}
      {(category === 'All' || category === 'Pizza') && (
        <section className="menu-section">
          <h2>Pizza</h2>
          <div className="menu-items">
            <article className="menu-item">
              <img src="/images/menu/vegetable-pizza.jpg" alt="Vegetable Pizza" loading="lazy" />
              <h3>Vegetable Pizza</h3>
              <p>Tomatoes, peppers, olives, and melted cheese.</p>
              <p className="menu-price">$10.00</p>
              <button onClick={() => addToOrder('Vegetable Pizza', 10)} aria-label="Add Vegetable Pizza to order">Add to order</button>
            </article>
            <article className="menu-item">
              <img src="/images/menu/margherita-pizza.jpg" alt="Margherita Pizza" loading="lazy" />
              <h3>Margherita Pizza</h3>
              <p>Tomato sauce, mozzarella cheese, and basil.</p>
              <p className="menu-price">$9.00</p>
              <button onClick={() => addToOrder('Margherita Pizza', 9)} aria-label="Add Margherita Pizza to order">Add to order</button>
            </article>
            <article className="menu-item">
              <img src="/images/menu/pepperoni-pizza.jpg" alt="Pepperoni Pizza" loading="lazy" />
              <h3>Pepperoni Pizza</h3>
              <p>Tomato sauce, mozzarella cheese, and pepperoni.</p>
              <p className="menu-price">$12.00</p>
              <button onClick={() => addToOrder('Pepperoni Pizza', 12)} aria-label="Add Pepperoni Pizza to order">Add to order</button>
            </article>
            <article className="menu-item">
              <img src="/images/menu/bbq-chicken-pizza.jpg" alt="BBQ Chicken Pizza" loading="lazy" />
              <h3>BBQ Chicken Pizza</h3>
              <p>Grilled chicken, barbecue sauce, red onions, and mozzarella.</p>
              <p className="menu-price">$12.00</p>
              <button onClick={() => addToOrder('BBQ Chicken Pizza', 12)} aria-label="Add BBQ Chicken Pizza to order">Add to order</button>
            </article>
          </div>
        </section>
      )}

      {/* Sandwiches */}
      {(category === 'All' || category === 'Sandwiches') && (
        <section className="menu-section">
          <h2>Sandwiches</h2>
          <div className="menu-items">
            <article className="menu-item">
              <img src="/images/menu/falafel-wrap.jpg" alt="Falafel Wrap" loading="lazy" />
              <h3>Falafel Wrap</h3>
              <p>Crispy falafel with vegetables, pickles, and tahini in pita bread.</p>
              <p className="menu-price">$7.00</p>
              <button onClick={() => addToOrder('Falafel Wrap', 7.0)} aria-label="Add Falafel Wrap to order">Add to order</button>
            </article>
            <article className="menu-item">
              <img src="/images/menu/chicken-shawarma-wrap.jpg" alt="Chicken Shawarma Wrap" loading="lazy" />
              <h3>Chicken Shawarma Wrap</h3>
              <p>Seasoned chicken with garlic sauce and pickles.</p>
              <p className="menu-price">$8.00</p>
              <button onClick={() => addToOrder('Chicken Shawarma Wrap', 8)} aria-label="Add Chicken Shawarma Wrap to order">Add to order</button>
            </article>
            <article className="menu-item">
              <img src="/images/menu/tawouk-sandwich.jpg" alt="Tawouk Sandwich" loading="lazy" />
              <h3>Tawouk Sandwich</h3>
              <p>Grilled chicken with garlic sauce, pickles, and fries in flatbread.</p>
              <p className="menu-price">$8.00</p>
              <button onClick={() => addToOrder('Tawouk Sandwich', 8)} aria-label="Add Tawouk Sandwich to order">Add to order</button>
            </article>
            <article className="menu-item">
              <img src="/images/menu/steak-sandwich.jpg" alt="Steak Sandwich" loading="lazy" />
              <h3>Steak Sandwich</h3>
              <p>Beef strips with peppers, onions, and melted cheese.</p>
              <p className="menu-price">$10.00</p>
              <button onClick={() => addToOrder('Steak Sandwich', 10)} aria-label="Add Steak Sandwich to order">Add to order</button>
            </article>
            <article className="menu-item">
              <img src="/images/menu/halloumi-sandwich.jpg" alt="Halloumi Sandwich" loading="lazy" />
              <h3>Halloumi Sandwich</h3>
              <p>Grilled halloumi with tomato, cucumber, and mint.</p>
              <p className="menu-price">$7.00</p>
              <button onClick={() => addToOrder('Halloumi Sandwich', 7)} aria-label="Add Halloumi Sandwich to order">Add to order</button>
            </article>
          </div>
        </section>
      )}

      {/* Drinks */}
      {(category === 'All' || category === 'Drinks') && (
        <section className="menu-section">
          <h2>Drinks</h2>
          <div className="menu-items">
            <article className="menu-item">
              <img src="/images/menu/mint-lemonade.jpg" alt="Mint Lemonade" loading="lazy" />
              <h3>Mint Lemonade</h3>
              <p>A refreshing mix of lemon juice and fresh mint.</p>
              <p className="menu-price">$3.00</p>
              <button onClick={() => addToOrder('Mint Lemonade', 3.0)} aria-label="Add Mint Lemonade to order">Add to order</button>
            </article>
            <article className="menu-item">
              <img src="/images/menu/bottled-water.jpg" alt="Bottled Water" loading="lazy" />
              <h3>Bottled Water</h3>
              <p>Chilled drinking water.</p>
              <p className="menu-price">$1.00</p>
              <button onClick={() => addToOrder('Bottled Water', 1.0)} aria-label="Add Bottled Water to order">Add to order</button>
            </article>
            <article className="menu-item">
              <img src="/images/menu/orange-juice.jpg" alt="Orange Juice" loading="lazy" />
              <h3>Orange Juice</h3>
              <p>A chilled glass of orange juice.</p>
              <p className="menu-price">$3.00</p>
              <button onClick={() => addToOrder('Orange Juice', 3)} aria-label="Add Orange Juice to order">Add to order</button>
            </article>
            <article className="menu-item">
              <img src="/images/menu/iced-tea.jpg" alt="Iced Tea" loading="lazy" />
              <h3>Iced Tea</h3>
              <p>Cold tea served over ice with a slice of lemon.</p>
              <p className="menu-price">$2.00</p>
              <button onClick={() => addToOrder('Iced Tea', 2)} aria-label="Add Iced Tea to order">Add to order</button>
            </article>
            <article className="menu-item">
              <img src="/images/menu/turkish-coffee.jpg" alt="Turkish Coffee" loading="lazy" />
              <h3>Turkish Coffee</h3>
              <p>A small cup of rich, traditional coffee.</p>
              <p className="menu-price">$2.00</p>
              <button onClick={() => addToOrder('Turkish Coffee', 2)} aria-label="Add Turkish Coffee to order">Add to order</button>
            </article>
            <article className="menu-item">
              <img src="/images/menu/ayran.jpg" alt="Ayran" loading="lazy" />
              <h3>Ayran</h3>
              <p>A chilled yogurt drink with a light touch of salt.</p>
              <p className="menu-price">$2.00</p>
              <button onClick={() => addToOrder('Ayran', 2)} aria-label="Add Ayran to order">Add to order</button>
            </article>
            <article className="menu-item">
              <img src="/images/menu/pepsi.jpg" alt="Pepsi" loading="lazy" />
              <h3>Pepsi</h3>
              <p>Chilled 330 ml can of Pepsi.</p>
              <p className="menu-price">$2.00</p>
              <button onClick={() => addToOrder('Pepsi', 2)} aria-label="Add Pepsi to order">Add to order</button>
            </article>
            <article className="menu-item">
              <img src="/images/menu/pepsi-max.jpg" alt="Pepsi Max" loading="lazy" />
              <h3>Pepsi Max</h3>
              <p>Chilled 330 ml can of sugar-free Pepsi Max.</p>
              <p className="menu-price">$2.00</p>
              <button onClick={() => addToOrder('Pepsi Max', 2)} aria-label="Add Pepsi Max to order">Add to order</button>
            </article>
            <article className="menu-item">
              <img src="/images/menu/7up.jpg" alt="7UP" loading="lazy" />
              <h3>7UP</h3>
              <p>Chilled 330 ml can of lemon-lime soda.</p>
              <p className="menu-price">$2.00</p>
              <button onClick={() => addToOrder('7UP', 2)} aria-label="Add 7UP to order">Add to order</button>
            </article>
            <article className="menu-item">
              <img src="/images/menu/mirinda-orange.jpg" alt="Mirinda Orange" loading="lazy" />
              <h3>Mirinda Orange</h3>
              <p>Chilled 330 ml can of orange soda.</p>
              <p className="menu-price">$2.00</p>
              <button onClick={() => addToOrder('Mirinda Orange', 2)} aria-label="Add Mirinda Orange to order">Add to order</button>
            </article>
          </div>
        </section>
      )}
      {/* Desserts */}
      {(category === 'All' || category === 'Desserts') && (
        <section className="menu-section">
          <h2>Desserts</h2>
          <div className="menu-items">
            <article className="menu-item">
              <img src="/images/menu/baklava.jpg" alt="Baklava" loading="lazy" />
              <h3>Baklava</h3>
              <p>Layers of pastry filled with nuts and sweet syrup.</p>
              <p className="menu-price">$4.00</p>
              <button onClick={() => addToOrder('Baklava', 4)} aria-label="Add Baklava to order">Add to order</button>
            </article>
            <article className="menu-item">
              <img src="/images/menu/rice-pudding.jpg" alt="Rice Pudding" loading="lazy" />
              <h3>Rice Pudding</h3>
              <p>Creamy rice pudding with a sprinkle of cinnamon.</p>
              <p className="menu-price">$3.00</p>
              <button onClick={() => addToOrder('Rice Pudding', 3)} aria-label="Add Rice Pudding to order">Add to order</button>
            </article>
            <article className="menu-item">
              <img src="/images/menu/kunafa.png" alt="Kunafa" loading="lazy" />
              <h3>Kunafa</h3>
              <p>Warm cheese pastry topped with syrup and pistachios.</p>
              <p className="menu-price">$5.00</p>
              <button onClick={() => addToOrder('Kunafa', 5)} aria-label="Add Kunafa to order">Add to order</button>
            </article>
            <article className="menu-item">
              <img src="/images/menu/chocolate-cake.jpg" alt="Chocolate Cake" loading="lazy" />
              <h3>Chocolate Cake</h3>
              <p>A slice of chocolate cake with chocolate frosting.</p>
              <p className="menu-price">$4.00</p>
              <button onClick={() => addToOrder('Chocolate Cake', 4)} aria-label="Add Chocolate Cake to order">Add to order</button>
            </article>
          </div>
        </section>
      )}

      {/* The order list uses map because it changes when buttons are clicked. */}
      <section ref={orderSection} className="order-summary" aria-labelledby="order-title">
        <h2 id="order-title">Your Order</h2>
        {order.length === 0 && <p>Your order is empty. Choose something from the menu!</p>}
        <ul>
          {order.map((item, index) => (
            <li key={index}>
              <span>{item.name} - ${item.price.toFixed(2)}</span>
              <button onClick={() => removeFromOrder(index)} aria-label={'Remove ' + item.name}>Remove</button>
            </li>
          ))}
        </ul>
        <p className="order-total" aria-live="polite">Total: ${total.toFixed(2)} ({order.length} items)</p>
        {order.length > 0 && <button onClick={() => setOrder([])}>Clear order</button>}
        {order.length > 0 && <Link className="checkout-link" to="/checkout">Continue to checkout</Link>}
      </section>
    </div>
  )
}

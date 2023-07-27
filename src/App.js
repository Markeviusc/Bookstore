import React, { useState, useEffect } from 'react';
import './App.css';
const axios = require('axios');

const books = [
  {
    id: 1,
    title: 'Book 1',
    author: 'Author 1',
    price: 10.99,
  },
  {
    id: 2,
    title: 'Book 2',
    author: 'Author 2',
    price: 12.99,
  },
  // Add more books here...
];

const BookList = ({ addToCart }) => {
  return (
    <div>
      <h2>Book List</h2>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            {book.title} - {book.author} - ${book.price}
            <button onClick={() => addToCart(book)}>Add to Cart</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const ShoppingCart = ({ cartItems, removeFromCart }) => {
  return (
    <div>
      <h2>Shopping Cart</h2>
      <ul>
        {cartItems.map((item) => (
          <li key={item.id}>
            {item.title} - ${item.price}
            <button onClick={() => removeFromCart(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

function App() {

    const [ books , setBooks ] = useState([]);

    useEffect(() => {
    // Fetch book data from the backend API
    axios.get('http://localhost:5000/api/books')
      .then((response) => {
        setBooks(response.data);
      })
      .catch((error) => {
        console.error('Error fetching books:', error);
      });
  }, []);

  const [cartItems, setCartItems] = useState([]);

  const addToCart = (book) => {
    setCartItems([...cartItems, book]);
  };

  const removeFromCart = (id) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCartItems);
  };

  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const filteredBooks = books.filter(
      (book) =>
        book.title.toLowerCase().includes(searchTerm) ||
        book.author.toLowerCase().includes(searchTerm)
    );
    // You can set the filtered books to the state and display them in the BookList component
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to the Bookstore</h1>
      </header>
      <main>
        <input
          type="text"
          placeholder="Search by title or author..."
          onChange={handleSearch}
        />
        <BookList addToCart={addToCart} />
        <ShoppingCart cartItems={cartItems} removeFromCart={removeFromCart} />
      </main>
    </div>
  );
}

export default App;
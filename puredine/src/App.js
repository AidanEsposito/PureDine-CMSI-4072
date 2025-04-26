import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Restaurants from './Restaurants.js';
import Menus from './Menus.js';
import About from './About.js';
import puredinelogo from './Images/puredinelogo.png';
import './App.css';
import { signIn, logOut, useAuthentication } from './firebaseConfig.js';



function Home() {
  const [searchInput, setSearchInput] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchInput.trim()) {
      navigate(`/restaurants?query=${encodeURIComponent(searchInput)}`);
    }
  };

  return (
    <main>
      <input
        type="text"
        className="search-bar"
        placeholder="Enter Restaurant Name, City, or Zip Code"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
      />
      <svg className="search-icon" viewBox="0 0 24 24" width="20" height="20" onClick={handleSearch}>
        <path fill="gray" d="M10,18a8,8 0 1,0 0,-16a8,8 0 1,0 0,16Zm6,-2l4,4" stroke="gray" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </main>
  );
}

function Layout() {
  const user = useAuthentication();
  return (
    <div className="App">
      <header className="header">
        <div className="logo-container">
          <img 
            src={puredinelogo} 
            alt="PureDine Logo" 
            className="logo" 
            style={{ cursor: 'pointer' }} 
            onClick={() => window.location.href = '/'} 
          />
        </div>
        <nav className="nav-links">
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li>
            {user ? (
              <div className="user-info">
                {/* <img 
                  src={user.photoURL || 'https://ui-avatars.com/api/?name=User&background=random'} 
                  alt="Profile" 
                  className="profile-pic" 
                /> */}
                <button className="login-button" onClick={logOut}>Sign Out</button>
              </div>
            ) : (
              <button className="login-button" onClick={signIn}>Login</button>
            )}
            </li>
          </ul>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/restaurants" element={<Restaurants />} />
        <Route path="/menus" element={<Menus />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;


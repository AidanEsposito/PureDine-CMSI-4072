import React from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation, useNavigate, } from 'react-router-dom';
import { getRestaurants } from './Api.js';
import About from './About.js';
import puredinelogo from './Images/puredinelogo.png';
import './App.css';


// const handleSearch = async (event) => {
//   navigate("/restaurant");
// }

function Home() {
  return (
    <main>
      <input 
        type="text" 
        className="search-bar" 
        placeholder="Enter Restaurant Name, Area, or Zip Code"
        // onChange={(e) => setSearchInput(e.target.value)}
        // onKeyDown={(e) => e.key === "Enter" && handleSearch()}
      />
      <svg className="search-icon" viewBox="0 0 24 24" width="20" height="20">
        <path fill="gray" d="M10,18a8,8 0 1,0 0,-16a8,8 0 1,0 0,16Zm6,-2l4,4" stroke="gray" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </main>
  );
}

function Layout() {
  const location = useLocation(); 

  return (
    <div className="App">
      {location.pathname === "/" && (
        <>
          <header className="header">
            <div className="logo-container">
              <img src={puredinelogo} alt="PureDine Logo" className="logo" onClick={() => window.location.reload()} style={{ cursor: 'pointer' }} />
            </div>
            <nav className="nav-links">
              <ul>
                <li><Link to="/about">About</Link></li>
                <li><button className="login-button">Login</button></li>
              </ul>
            </nav>
          </header>
          <Home /> 
        </>
      )}
      
      <Routes>
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

function App() {

  // const navigate = useNavigate();

  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;

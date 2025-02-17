import puredinelogo from './Images/puredinelogo.png';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import About from './Webpages/About.js';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="header">
          <div className="logo-container">
            <img src={puredinelogo} alt="PureDine Logo" className="logo" onClick ={() => window.location.reload()} style={{ cursor: 'pointer' }}   />
          </div>
          <nav className="nav-links">
            <ul>
              <li><Link to="/about">About</Link></li>
              <li><button className="login-button">Login</button></li>
            </ul>
          </nav>
        </header>
        <main>
          <input 
            type="text" 
            className="search-bar" 
            placeholder="Enter Restaurant Name, Area, or Zip Code"
          />
          <svg className="search-icon" viewBox="0 0 24 24" width="20" height="20">
            <path fill="gray" d="M10,18a8,8 0 1,0 0,-16a8,8 0 1,0 0,16Zm6,-2l4,4" stroke="gray" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </main>
      </div>
      <Routes>
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

//Add onto page: Allergins possible, resturant box examples, etc

export default App;

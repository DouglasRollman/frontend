import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ImgSearch from "./pages/ImgSearch";
import ManSearch from './pages/ManSearch'; 
import PillResults from './pages/PillResults'; // Import the PillResults component
import './Navbar.css'; // Import the navbar styles

function App() {
  return (
    <Router>
      <div style={styles.container}>
        {/* Fixed Left Navbar */}
        <nav className="navbar">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/search">Image Search</Link></li>
            <li><Link to="/mansearch">Manual Search</Link></li>
          </ul>
        </nav>

        {/* Content Area */}
        <div style={styles.content}>
          <Routes>
            <Route path="/" element={<h1>Home Page</h1>} />
            <Route path="/search" element={<ImgSearch />} />
            <Route path="/mansearch" element={<ManSearch />} />
            <Route path="/pill-results" element={<PillResults />} /> {/* New route for PillResults */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

const styles = {
  container: {
    display: "flex",
    height: "100vh", // Full height of the viewport
  },
  content: {
    marginLeft: "120px", // Adjust this based on your sidebar width
    padding: "50px",
    flex: 1, // Content should take up the remaining space
  },
};

export default App;
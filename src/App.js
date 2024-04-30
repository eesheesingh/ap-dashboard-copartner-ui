import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import styles from "./style";
// import Navbar from "./Navbar";
import Sidebar from "./sidebar.jsx";
import Dashboard from "./components/Dashboard";
import Leader from './components/Leader.jsx'
function App() {
  return (
    <Router>
      <div className={`bg-gradient overflow-hidden ${styles.boxWidth} ${styles.paddingX}`}>
        <Sidebar />
        <div className="flex">
          <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/leaderBoard" element={<Leader />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}
export default App;

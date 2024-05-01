import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import styles from "./style";
// import Navbar from "./Navbar";
import Sidebar from "./sidebar.jsx";
import Dashboard from "./components/Dashboard";
import Leader from './components/Leader.jsx'
import Customers from './components/Customers.jsx'
import SingleCustomer from "./components/SingleCustomer.jsx";
import Wallet from "./components/wallet.jsx";
import Setting from "./components/Setting.jsx";
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
            <Route path="/customers" element={<Customers />} />
            <Route path="/wallet" element={<Wallet />} />
            <Route path="/setting" element={<Setting />} />

            <Route path="/customers/singleCustomer" element={<SingleCustomer />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}
export default App;

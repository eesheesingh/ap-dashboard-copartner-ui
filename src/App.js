import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import styles from "./style";
import Navbar from "./navbar.jsx";
import Dashboard from "./components/Dashboard/Dashboard.jsx";
import Leader from './components/LeaderBoard/Leader.jsx'
import Customers from './components/Customers/Customers.jsx'
import SingleCustomer from "./components/Customers/SingleCustomer.jsx";
import Wallet from "./components/SettingPage/wallet.jsx";
import Setting from "./components/SettingPage/Setting.jsx";
import Marketing from "./components/Marketing/Marketing.jsx";
import DashboardPage from "./components/Dashboard/DashboardPage.jsx";
import CustomersPage from "./components/Customers/CustomersPage.jsx";
import WalletPage from "./components/SettingPage/WalletPage.jsx";

function App() {
  return (
    <Router>
      <div className={`bg-gradient ${styles.boxWidth} ${styles.paddingX}`}>
        <Navbar />
        
          <div className="flex-grow">
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/leaderBoard" element={<Leader />} />
            <Route path="/customers" element={<CustomersPage />} />
            <Route path="/wallet" element={<WalletPage />} />
            <Route path="/setting" element={<Setting />} />
            <Route path="/marketing-planning" element={<Marketing />} />

            <Route path="/customers/singleCustomer" element={<SingleCustomer />} />
            </Routes>
          </div>
        </div>
      
    </Router>
  );
}
export default App;

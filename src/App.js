import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import styles from "./style";
import Navbar from "./navbar.jsx";
import DashboardPage from "./components/Dashboard/DashboardPage.jsx";
import Leader from './components/LeaderBoard/Leader.jsx';
import CustomersPage from './components/Customers/CustomersPage.jsx';
import SingleCustomer from "./components/Customers/SingleCustomer.jsx";
import WalletPage from "./components/SettingPage/WalletPage.jsx";
import Setting from "./components/SettingPage/Setting.jsx";
import Marketing from "./components/Marketing/Marketing.jsx";
import LoginPage from "./components/Login/LoginPage.jsx";
import ResetPassword from "./components/Login/ResetPassword.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import ForgotPassword from "./components/Login/ForgotPAssword.jsx";
import SetNewPassword from "./components/Login/SetNewPassword.jsx";
import Link from "./components/Link/Link.jsx";
import TelegramMessage from "./components/TelegamMessage/TelegramMessage.jsx";
import BotList from "./components/BotListing/BotList.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/set-new-password" element={<SetNewPassword />} />
        <Route
          path="*"
          element={
            <PrivateRoute>
              <MainLayout />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <div className={`bg-gradient ${styles.boxWidth} ${styles.paddingX}`}>
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/leaderBoard" element={<Leader />} />
            <Route path="/customers" element={<CustomersPage />} />
            <Route path="/wallet" element={<WalletPage />} />
            <Route path="/setting" element={<Setting />} />
            <Route path="/marketing-planning" element={<Marketing />} />
            <Route path="/customers/:id" element={<SingleCustomer />} />
            <Route path="/generate-your-links" element={<Link />} />
            <Route path="/send-prompt-messages" element={<TelegramMessage />} />
            <Route path="/bot-listing" element={<BotList />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default App;

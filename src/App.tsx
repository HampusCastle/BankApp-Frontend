import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AccountDashboard from './pages/AccountDashboard';
import DashboardPage from './pages/Dashboard';

const App = () => {
  return (
    <Routes>
      <Route path="/home" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/accountdashboard" element={<AccountDashboard />} />
      <Route path="/" element={<HomePage />} />
    </Routes>
  );
};

export default App;
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import ProfilePage from './pages/ProfilePage';
import AccountPage from './pages/AccountPage';
import PrivateRoute from './components/PrivateRoute';
import MarketNewsPage from './pages/MarketNewsPage';
import SavingsGoalPage from './pages/SavingsGoalPage';
import SubscriptionPage from './pages/SubscriptionPage';
import ScheduledPaymentPage from './pages/ScheduledPaymentPage';
import Layout from './components/Layout';
import NotificationPage from './pages/NotificationPage';
import RecurringPaymentPage from './pages/RecurringPaymentPage';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
        <Route path="/accounts" element={<PrivateRoute element={<AccountPage />} />} />
        <Route path="/recurring-payments" element={<PrivateRoute element={<RecurringPaymentPage />} />} />
        <Route path="/subscriptions" element={<PrivateRoute element={<SubscriptionPage />} />} />
        <Route path="/savings-goals" element={<PrivateRoute element={<SavingsGoalPage />} />} />
        <Route path="/scheduled-payments" element={<PrivateRoute element={<ScheduledPaymentPage />} />} />
        <Route path="/market-news" element={<PrivateRoute element={<MarketNewsPage />} />} />
        <Route path="/profile" element={<PrivateRoute element={<ProfilePage />} />} />
        <Route path="/notifications" element={<PrivateRoute element={<NotificationPage />} />} />
      </Route>
    </Routes>
  );
};

export default App;
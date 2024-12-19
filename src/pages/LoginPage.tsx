/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../services/authApi'

const LoginPage = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { token } = await loginUser(formData);
      localStorage.setItem('token', token);
      navigate('/home');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Invalid username or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800 overflow-hidden">
      {/* Background Shapes */}
      <div className="absolute top-10 left-0 w-80 h-80 bg-purple-500 rounded-full opacity-30 blur-3xl"></div>
      <div className="absolute bottom-20 right-0 w-72 h-72 bg-purple-700 rounded-full opacity-40 blur-2xl"></div>

      {/* Form Card */}
      <div className="relative z-10 bg-gray-900 p-6 md:p-8 rounded-lg shadow-2xl w-full max-w-xs sm:max-w-sm md:max-w-md">
        <h2 className="text-2xl md:text-3xl font-bold text-purple-400 text-center mb-6">Sign In</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-400 mb-1">Username</label>
            <input
              type="text"
              name="username"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-purple-500 text-white"
              required
            />
          </div>
          <div>
            <label className="block text-gray-400 mb-1">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-purple-500 text-white"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 rounded bg-purple-500 text-white font-semibold hover:bg-purple-400 transition"
            disabled={loading}
          >
            {loading ? 'Signing In...' : 'Continue'}
          </button>
        </form>
        <div className="text-center mt-4">
          <p className="text-gray-500 text-sm">Don't have an account?</p>
          <Link to="/register" className="text-purple-400 hover:underline text-sm">
            Register Here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
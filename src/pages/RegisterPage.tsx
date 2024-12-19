/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../services/authApi'

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  });

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
      await registerUser(formData); 
      navigate('/login'); 
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 overflow-hidden">
      {/* Background Shapes */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-purple-600 rounded-full opacity-30 blur-3xl"></div>
      <div className="absolute bottom-20 left-0 w-72 h-72 bg-blue-500 rounded-full opacity-40 blur-2xl"></div>

      {/* Form Card */}
      <div className="relative z-10 bg-gray-900 p-8 rounded-lg shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-purple-400 text-center mb-6">Register</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Username */}
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

          {/* Email */}
          <div>
            <label className="block text-gray-400 mb-1">Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-purple-500 text-white"
              required
            />
          </div>

          {/* First Name */}
          <div>
            <label className="block text-gray-400 mb-1">First Name</label>
            <input
              type="text"
              name="firstName"
              placeholder="Enter your first name"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-purple-500 text-white"
              required
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-gray-400 mb-1">Last Name</label>
            <input
              type="text"
              name="lastName"
              placeholder="Enter your last name"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-purple-500 text-white"
              required
            />
          </div>

          {/* Password */}
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

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-2 rounded bg-purple-500 text-white font-semibold hover:bg-purple-400 transition"
            disabled={loading}
          >
            {loading ? 'Signing Up...' : 'Sign Up'}
          </button>
        </form>

        {/* Link to Login */}
        <div className="text-center mt-4">
          <p className="text-gray-500">Already have an account?</p>
          <Link to="/login" className="text-purple-400 hover:underline">
            Login Here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;